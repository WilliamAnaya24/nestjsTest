import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create(
      createOrganizationDto,
    );
    return this.organizationRepository.save(organization);
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationRepository.find();
    if (!organizations.length) {
      throw new NotFoundException("There aren't organizations");
    }
    return organizations;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.findOneBy({
      id: id,
    });
    if (updateOrganizationDto.name) {
      organization.name = updateOrganizationDto.name;
    }
    if (updateOrganizationDto.status) {
      organization.status = updateOrganizationDto.status;
    }
    return this.organizationRepository.save(organization);
  }

  remove(id: number) {
    return this.organizationRepository.delete({ id: id });
  }
}
