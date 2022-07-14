import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

describe('OrganizationController', () => {
  let controller: OrganizationController;
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
  const mockOrganizationService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id: number, dto) => ({
      id,
      ...dto,
    })),
    findAll: jest.fn().mockImplementation(() => dtoAll),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'test1',
      status: 1,
    }),
    remove: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationController],
      providers: [OrganizationService],
    })
      .overrideProvider(OrganizationService)
      .useValue(mockOrganizationService)
      .compile();

    controller = module.get<OrganizationController>(OrganizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an organization', () => {
    const dto = {
      name: 'test',
      status: 1,
      id: 0,
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: 'test',
      status: 1,
    });
    expect(mockOrganizationService.create).toHaveBeenCalledWith(dto);
  });

  it('should update an organization', () => {
    const dto = {
      name: 'new test',
      status: 1,
    };
    expect(controller.update('0', dto)).toEqual({
      id: 0,
      name: 'new test',
      status: 1,
    });
    expect(mockOrganizationService.update).toHaveBeenCalled();
  });

  it('should find organizations', () => {
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
    expect(controller.findAll()).toEqual(dto);
    expect(mockOrganizationService.findAll).toHaveBeenCalled();
  });

  it('should delete an organization', async () => {
    jest.spyOn(mockOrganizationService, 'remove').mockImplementation(() => 1);
    expect(controller.remove('1')).toEqual(1);
  });
});
