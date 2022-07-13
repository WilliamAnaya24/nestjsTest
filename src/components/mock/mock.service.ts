import { Injectable } from '@nestjs/common';
import { Constants } from '../../constants/constants';

@Injectable()
export class MockService {
  findAll() {
    return Constants.repositories;
  }
}
