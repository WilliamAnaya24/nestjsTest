import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { MoreThan, Repository } from 'typeorm';
import { Metrics } from './entities/metrics.entity';
import { Repository as RepositoryEntity } from './entities/repository.entity';

@Injectable()
export class TribeService {
  constructor(
    @InjectRepository(Tribe) private tribeRepository: Repository<Tribe>,
    @InjectRepository(Metrics) private metricsRepository: Repository<Metrics>,
    @InjectRepository(RepositoryEntity)
    private repoRepository: Repository<RepositoryEntity>,
  ) {}

  async find(idTribe?: number) {
    const metrics = await this.metricsRepository
      .createQueryBuilder('metrics')
      .leftJoinAndSelect('metrics.repository', 'repository')
      .leftJoinAndSelect('repository.tribeId', 'tribe')
      .leftJoinAndSelect('tribe.organization', 'organization')
      .select([
        'repository.id_repository as id',
        'repository.name as name',
        'tribe.name as tribe',
        'metrics.coverage as coverage',
        'metrics.code_smells as codeSmells',
        'metrics.bugs as bugs',
        'metrics.vulnerabilities as vulnerabilities',
        'metrics.hotspot as hotspot',
        'repository.state as state',
        'organization.name as organization',
      ])
      .where('tribe.id_tribe = :id_tribe', { id_tribe: 21 })
      .andWhere('repository.state = :state', { state: 'E' })
      .getRawMany();

    if (!metrics.length) {
      throw new NotFoundException('La Tribu no se encuentra registrada');
    } else {
      console.log('metrics', metrics);
      const metricsWithCoverage = metrics.filter(
        (metric) => metric.coverage > 75,
      );
      if (!metricsWithCoverage.length) {
        throw new NotFoundException(
          'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
        );
      } else {
        const arrayResult = metricsWithCoverage.map((metric) => {
          metric.verificationState = 'Verificado';
          if (metric.state === 'E') metric.state = 'Habilitado';
          metric.coverage = metric.coverage + '%';
          return metric;
        });
        return {
          repositories: arrayResult,
        };
      }
    }
  }
}
