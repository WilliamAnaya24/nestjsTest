import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { Constants } from '../../constants/constants';

describe('MockController', () => {
  let controller: MockController;
  let mockService: MockService;

  beforeEach(async () => {
    mockService = new MockService();
    controller = new MockController(mockService);
  });

  describe('Get Simulated service', () => {
    const result = {
      repositories: [
        {
          id: 1,
          state: 604,
        },
        {
          id: 2,
          state: 605,
        },
        {
          id: 3,
          state: 606,
        },
      ],
    };

    it('should return all the repositories indentificators with its verification code, this test is without use the main service implementation', () => {
      jest
        .spyOn(mockService, 'findAll')
        .mockImplementation(() => Constants.repositories);
      expect(controller.findAll()).toEqual(result);
    });
    it('should return al de repositories indentificators with its verification code, this test is with the main service implementation', () => {
      expect(mockService.findAll()).toEqual(result);
    });
  });
});
