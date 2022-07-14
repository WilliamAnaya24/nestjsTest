import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationService } from './organization.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';

describe('OrganizationService', () => {
  let service: OrganizationService;

  const organizationsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((organization) =>
      Promise.resolve({
        id: 1,
        ...organization,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: getRepositoryToken(Organization),
          useValue: organizationsRepository,
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an organization and return that', async () => {
    const dto = {
      name: 'test',
      status: 1,
    };
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      name: 'test',
      status: 1,
    });
    expect(organizationsRepository.create).toHaveBeenCalledWith(dto);
  });
});
