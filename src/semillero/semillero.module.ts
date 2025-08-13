import { Module } from '@nestjs/common';
import { SemilleroController } from './semillero.controller';
import { SemilleroService } from './semillero.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SemilleroSchema } from './dto/semillero.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Semillero', schema: SemilleroSchema }]),
  ],
  controllers: [SemilleroController],
  providers: [SemilleroService],
})
export class SemilleroModule {}
