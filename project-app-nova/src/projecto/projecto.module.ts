import { Module } from '@nestjs/common';
import { ProjectoController } from './projecto.controller';
import { ProjectoService } from './projecto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectoSchema } from './dto/projecto.model';

import { SemilleroModule } from '../semillero/semillero.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Projecto', schema: ProjectoSchema }]),
    SemilleroModule,
  ],
  controllers: [ProjectoController],
  providers: [ProjectoService],
})
export class ProjectoModule {}
