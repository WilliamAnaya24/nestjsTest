import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { MockService } from "../mock/mock.service";

describe('OrganizationController', () => {
  let controller: OrganizationController;
  const mockOrganizationService = {
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
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

  it('should create a organization', () => {
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
});
