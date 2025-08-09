import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AprendizModule } from './aprendiz/aprendiz.module';
import { AuthModule } from './auth/auth.module';
import { ProjectoModule } from './projecto/projecto.module';
import { InstructoresService } from './instructores/instructores.service';
import { InstructoresController } from './instructores/instructores.controller';
import { InstructoresModule } from './instructores/instructores.module';
import { SemilleroModule } from './semillero/semillero.module';
import { EvidenciasModule } from './evidencias/evidencias.module';
import { CronogramaModule } from './cronograma/cronograma.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/appnova'),
    UserModule,
    AprendizModule,
    AuthModule,
    ProjectoModule,
    InstructoresModule,
    SemilleroModule,
    EvidenciasModule,
    CronogramaModule,
    SeguimientoModule,
  ],
  controllers: [AppController, InstructoresController],
  providers: [AppService, InstructoresService],
})
export class AppModule {}
