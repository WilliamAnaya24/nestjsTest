import { Controller, Get } from '@nestjs/common';
import { MockService } from './mock.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MockDto } from './dto/mock.dto';

@Controller('mock')
@ApiTags('Exercise 1')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  @ApiOperation({ summary: 'Get Repositories' })
  @ApiResponse({
    status: 200,
    description: 'Records listed.',
    type: MockDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  findAll() {
    return this.mockService.findAll();
  }
}
