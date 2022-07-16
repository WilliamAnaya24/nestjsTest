import { Controller, Get, Param } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Constants } from '../../constants/constants';
const ERRORS = Constants.messages.errors;
const SUCCESS = Constants.messages.success;

@Controller('tribe')
@ApiTags('Exercise 3')
@ApiResponse({
  status: 400,
  description: ERRORS.badRequest.description,
  type: ERRORS.type,
})
@ApiResponse({
  status: 404,
  description: ERRORS.notFound.description,
  type: ERRORS.type,
})
@ApiResponse({
  status: 500,
  description: ERRORS.internalServerError.description,
  type: ERRORS.type,
})
@ApiResponse({
  status: 502,
  description: ERRORS.badGateway.description,
  type: ERRORS.type,
})

export class TribeController {
  constructor(private readonly tribeService: TribeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: SUCCESS.success.description,
    type: SUCCESS.exerciseThreeResponse,
  })
  @ApiOperation({ summary: 'Get repositories metrics' })
  find() {
    return this.tribeService.find();
  }
}
