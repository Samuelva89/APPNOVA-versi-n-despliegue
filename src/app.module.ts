import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AprendizModule } from './aprendiz/aprendiz.module';
import { AuthModule } from './auth/auth.module';
import { ProjectoModule } from './projecto/projecto.module';

@Module({
  imports: [UserModule, AprendizModule, AuthModule, ProjectoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
