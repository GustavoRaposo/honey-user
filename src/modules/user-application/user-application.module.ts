import { Module, forwardRef } from '@nestjs/common';
import { UserApplicationService } from './user-application.service';
import { UserApplicationController } from './user-application.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserApplicationController],
  providers: [UserApplicationService, PrismaService],
})
export class UserApplicationModule {}
