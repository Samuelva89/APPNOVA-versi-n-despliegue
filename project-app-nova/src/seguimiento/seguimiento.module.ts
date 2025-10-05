import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeguimientoSchema } from './dto/seguimiento.model';
import { seguimientoController } from './seguimiento.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Seguimiento', schema: SeguimientoSchema },
    
    ]),
  ],
  controllers: [seguimientoController],
  providers: [SeguimientoService],
})
export class SeguimientoModule {}