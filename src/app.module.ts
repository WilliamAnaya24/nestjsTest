import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MockModule } from './components/mock/mock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { OrganizationModule } from './components/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MockModule,
    TypeOrmModule.forRoot(ormConfig()),
    OrganizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
