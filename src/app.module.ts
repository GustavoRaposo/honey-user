import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserApplicationModule } from './modules/user-application/user-application.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApplicationModule } from './modules/application/application.module';

@Module({
  imports: [UserApplicationModule, UserModule, AuthModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
