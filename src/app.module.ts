import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MockModule } from './components/mock/mock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
