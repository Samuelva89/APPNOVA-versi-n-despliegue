import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AprendizModule } from './aprendiz/aprendiz.module';
import { AuthModule } from './auth/auth.module';
import { ProjectoModule } from './projecto/projecto.module';
import { InstructoresModule } from './instructores/instructores.module';
import { SemilleroModule } from './semillero/semillero.module';
import { EvidenciasModule } from './evidencias/evidencias.module';
import { CronogramaModule } from './cronograma/cronograma.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
