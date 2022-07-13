import { Inject, Injectable, NotFoundException } from "@nestjs/common";
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
    return 'This action adds a new organization';
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationRepository.find();
    if (!organizations.length) {
      throw new NotFoundException("There aren't organizations");
    }
    return organizations;
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationRepository.findOneBy({ id: id });
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
