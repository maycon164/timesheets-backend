import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProjectModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
