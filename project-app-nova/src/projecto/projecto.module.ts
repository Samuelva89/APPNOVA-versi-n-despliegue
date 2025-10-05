import { Module } from '@nestjs/common';
import { ProjectoController } from './projecto.controller';
import { ProjectoService } from './projecto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectoSchema } from './dto/projecto.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Projecto', schema: ProjectoSchema }]),
  ],
  controllers: [ProjectoController],
  providers: [ProjectoService],
})
export class ProjectoModule {}
