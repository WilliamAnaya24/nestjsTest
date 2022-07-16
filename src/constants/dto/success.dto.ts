import { ApiProperty } from '@nestjs/swagger';

export class ResponseExerciseThreeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  tribe: string;
  @ApiProperty()
  organization: string;
  @ApiProperty()
  coverage: string;
  @ApiProperty()
  codeSmells: string;
  @ApiProperty()
  bugs: string;
  @ApiProperty()
  vulnerabilities: string;
  @ApiProperty()
  hotspots: string;
  @ApiProperty()
  verificationState: string;
  @ApiProperty()
  state: string;
}

export class SuccessExerciseTwoDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: number;
}

export class SuccessExercise3Dto {
  @ApiProperty({
    isArray: true,
    type: ResponseExerciseThreeDto,
  })
  repositories;
}
