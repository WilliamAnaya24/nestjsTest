import { Test, TestingModule } from '@nestjs/testing';
import { MockService } from './mock.service';

describe('MockService', () => {
  let service: MockService;

  beforeEach(async () => {
    service = new MockService();
  });

  describe('Testing the findAll method from a mockService', () => {
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
    it('Should return all the repositories indentificators with its verification code', () => {
      expect(service.findAll()).toEqual(result);
    });
  });
});
