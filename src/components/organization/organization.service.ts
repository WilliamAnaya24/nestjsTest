import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
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
    return this.organizationRepository.save(createOrganizationDto);
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await this.organizationRepository.find();
    if (!organizations.length) {
      throw new NotFoundException("There aren't organizations");
    }
    return organizations;
  }

  findOne(id: number): Promise<Organization> {
    const organization = this.organizationRepository.findOneBy({ id: id });
    if (!organization) {
      throw new NotFoundException();
    }
    return organization;
  }

  async updatePartially(
    id: number,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
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

  async updateTotally(
    id: number,
    updateOrganizationDto: CreateOrganizationDto,
  ) {
    const organization = await this.organizationRepository.findOneBy({
      id: id,
    });
    if (
      updateOrganizationDto.name !== null &&
      updateOrganizationDto.status !== null
    ) {
      organization.name = updateOrganizationDto.name;
      organization.status = updateOrganizationDto.status;
      return this.organizationRepository.save(organization);
    } else {
      throw new BadGatewayException();
    }
  }

  remove(id: number) {
    return this.organizationRepository.delete({ id: id });
  }
}
