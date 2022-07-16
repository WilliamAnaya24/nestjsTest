import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';
import { Repository } from './entities/repository.entity';
import { Metrics } from './entities/metrics.entity';

@Module({
  controllers: [TribeController],
  providers: [TribeService],
  imports: [TypeOrmModule.forFeature([Tribe, Repository, Metrics])],
})
export class TribeModule {}
