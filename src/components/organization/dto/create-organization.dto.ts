import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOrganizationDto {
  @IsOptional()
  @IsEmpty()
  id?: number;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  status: number;
}
