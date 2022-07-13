import { MockController } from './mock.controller';
import { MockService } from './mock.service';
import { Constants } from '../../constants/constants';
import { CreateMockDto } from "./dto/create-mock.dto";

describe('MockController', () => {
  let controller: MockController;
  let mockService: MockService;

  beforeEach(async () => {
    mockService = new MockService();
    controller = new MockController(mockService);
  });

  describe('Get Simulated service', () => {
    //Use for TDD
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

    it('should return al de repositories indentificators with its verification code', () => {
      jest
        .spyOn(mockService, 'findAll')
        .mockImplementation(() => Constants.repositories);
      expect(controller.findAll()).toEqual(result);
    });
  });
});
