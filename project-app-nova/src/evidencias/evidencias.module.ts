import { Module } from '@nestjs/common';
import { EvidenciasController } from './evidencias.controller';
import { EvidenciasService } from './evidencias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EvidenciaSchema } from './dto/evidencias.model';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Evidencia', schema: EvidenciaSchema }]),
    // Se registra MulterModule para habilitar la subida de archivos.
    // 'dest' especifica la carpeta donde se guardarán los archivos temporalmente.
    MulterModule.register({
      dest: './uploads/evidencias',
    }),
  ],
  controllers: [EvidenciasController],
  providers: [EvidenciasService],
})
export class EvidenciasModule {}