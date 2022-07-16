import { Controller, Get, Param, Res } from "@nestjs/common";
import { TribeService } from './tribe.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Constants } from '../../constants/constants';
import { Response } from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Parser } = require('json2csv');
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

  @Get(':id_tribe')
  @ApiResponse({
    status: 200,
    description: SUCCESS.success.description,
    type: SUCCESS.exerciseThreeResponse,
  })
  @ApiOperation({ summary: 'Get repositories metrics' })
  find(@Param('id_tribe') id_tribe: number) {
    return this.tribeService.find(+id_tribe);
  }

  @ApiOperation({ summary: 'Download repositories metrics CSV from id_tribe' })
  @Get('export/:id_tribe')
  export(@Param('id_tribe') id_tribe: number, @Res() res: Response) {
    this.tribeService.find(+id_tribe).then((results) => {
      const parser = new Parser();
      const csv = parser.parse(results.repositories);
      res.header('Content-Type', 'text/csv');
      res.attachment('orders.csv');
      return res.send(csv);
    });
  }
}
