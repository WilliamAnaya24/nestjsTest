import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { constants } from 'http2';
import { Constants } from '../../constants/constants';
const ERRORS = Constants.messages.errors;
const SUCCESS = Constants.messages.success;

@Controller('organization')
@ApiTags('Exercise 2')
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
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Organization' })
  @ApiResponse({
    status: 201,
    description: SUCCESS.created.description,
    type: CreateOrganizationDto,
  })
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: SUCCESS.success.description,
    type: [CreateOrganizationDto],
  })
  findAll() {
    return this.organizationService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update partially an organization by id' })
  @ApiResponse({
    status: 200,
    description: SUCCESS.success.description,
    type: [CreateOrganizationDto],
  })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization by id' })
  @ApiResponse({
    status: 200,
    description: SUCCESS.success.description,
    type: [CreateOrganizationDto],
  })
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
