import { Module } from '@nestjs/common';
import { EvidenciasController } from './evidencias.controller';
import { EvidenciasService } from './evidencias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EvidenciaSchema } from './dto/evidencias.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'evidencia', schema: EvidenciaSchema }]),
  ],
  controllers: [EvidenciasController],
  providers: [EvidenciasService],
})
export class EvidenciasModule {}
