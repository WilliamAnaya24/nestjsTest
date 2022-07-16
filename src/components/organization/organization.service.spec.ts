import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';

class ApiServiceMock {
  create(dto: any) {
    return [];
  }
  findAll() {
    return [
      {
        id: 1,
        name: 'test1',
        status: 1,
      },
      {
        id: 2,
        name: 'test2',
        status: 1,
      },
    ];
  }
  remove(id: string) {
    return null;
  }
  update(id: string, dto: any) {
    return [];
  }
}

describe('OrganizationService', () => {
  let service: OrganizationService;
  const dtoAll = [
    {
      id: 1,
      name: 'test1',
      status: 1,
    },
    {
      id: 2,
      name: 'test2',
      status: 1,
    },
  ];

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: OrganizationService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationService, ApiServiceProvider],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organization', async () => {
    const createOrganizationSpy = jest.spyOn(service, 'create');
    const dto = {
      name: 'test',
      status: 1,
    };
    await service.create(dto);
    expect(createOrganizationSpy).toHaveBeenCalledWith(dto);
  });

  it('should find organizations', async () => {
    const dto = [
      {
        id: 1,
        name: 'test1',
        status: 1,
      },
      {
        id: 2,
        name: 'test2',
        status: 1,
      },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(async () => dto);
    expect(await service.findAll()).toEqual(dto);
  });

  it('should update organizations', async () => {
    const dto = {
      id: 1,
      name: 'test1',
      status: 1,
    };
    const updateOrganizationSpy = jest.spyOn(service, 'update');
    await service.update(1, dto);
    expect(updateOrganizationSpy).toHaveBeenCalledWith(1, dto);
  });

  it('should delete organization', async () => {
    const removeOrganizationSpy = jest.spyOn(service, 'remove');
    await service.remove(1);
    expect(removeOrganizationSpy).toHaveBeenCalledWith(1);
  });
});
