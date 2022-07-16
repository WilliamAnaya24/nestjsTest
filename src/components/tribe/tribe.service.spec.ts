import { Test, TestingModule } from '@nestjs/testing';
import { TribeService } from './tribe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { Metrics } from './entities/metrics.entity';
import { Repository as RepositoryEntity } from './entities/repository.entity';
import { Repository } from 'typeorm';

describe('TribeService', () => {
  let service: TribeService;

  let tribeRepository: Repository<Tribe>;
  let metricsRepository: Repository<Metrics>;
  const TRIBE_REPOSITORY_TOKEN = getRepositoryToken(Tribe);
  const METRICS_REPOSITORY_TOKEN = getRepositoryToken(Metrics);
  const RESULTS = {
    repositories: [
      {
        id: '73',
        name: 'Quo Lux',
        tribe: 'Tribe 20',
        coverage: '100%',
        codesmells: '5',
        bugs: '4',
        vulnerabilities: '2',
        hotspot: '5',
        state: 'Habilitado',
        organization: 'Organization 7',
        verificationState: 'Verificado',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TribeService,
        {
          provide: TRIBE_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: METRICS_REPOSITORY_TOKEN,
          useValue: {
            createQueryBuilder: jest.fn(),
            leftJoinAndSelect: jest.fn(),
            select: jest.fn(),
            where: jest.fn(),
            andWhere: jest.fn(),
            getRawMany: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(RepositoryEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TribeService>(TribeService);
    tribeRepository = module.get<Repository<Tribe>>(TRIBE_REPOSITORY_TOKEN);
    metricsRepository = module.get<Repository<Metrics>>(
      METRICS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('tribeRepository should be defined', () => {
    expect(tribeRepository).toBeDefined();
  });

  describe('Should get repositorie metrics by tribe', () => {
    it('should validate state enable', async () => {
      const createQueryBuilder: any = {
        select: () => createQueryBuilder,
        leftJoinAndSelect: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        where: () => createQueryBuilder,
        getRawMany: () => RESULTS,
      };

      jest
        .spyOn(metricsRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      await service.find(22);
    });
  });
});
