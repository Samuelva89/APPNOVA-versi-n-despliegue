import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeguimientoSchema } from './dto/seguimiento.model';
import { seguimientoController } from './seguimiento.controller';
import { ProjectoSchema } from 'src/projecto/dto/projecto.model'; // Importar el esquema necesario

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Seguimiento', schema: SeguimientoSchema },
      { name: 'Projecto', schema: ProjectoSchema }, // Añadir el modelo de Projecto
    ]),
  ],
  controllers: [seguimientoController],
  providers: [SeguimientoService],
})
export class SeguimientoModule {}