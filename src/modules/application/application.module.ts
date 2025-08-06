import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './repositories/application.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    ApplicationRepository,
    PrismaService,
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
