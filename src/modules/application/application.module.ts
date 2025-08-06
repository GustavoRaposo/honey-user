import { Module, forwardRef } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './repositories/application.repository';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => AuthModule), UserModule],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,
    ApplicationRepository,
    PrismaService,
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}
