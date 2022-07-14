import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject } from 'class-validator';

export class RepositoriesDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  state: number;
}

export class MockDto {
  @ApiProperty({
    isArray: true,
    type: RepositoriesDto,
  })
  repositories;
}
