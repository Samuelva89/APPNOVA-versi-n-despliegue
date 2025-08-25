import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservacionSegSchema } from './dto/seguimiento.model';
import { seguimientoController } from './seguimiento.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Seguimiento', schema: ObservacionSegSchema },
    ]),
  ],
  controllers: [seguimientoController],
  providers: [SeguimientoService],
  exports: [SeguimientoService],
})
export class SeguimientoModule {}
