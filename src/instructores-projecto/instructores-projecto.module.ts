import { Module } from '@nestjs/common';
import { InstructoresProjectoController } from './instructores-projecto.controller';
import { InstructoresProjectoService } from './instructores-projecto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { instructoresProjectoSchema } from './dto/instructoresProjecto.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'instrructoresProjecto', schema: instructoresProjectoSchema },
    ]),
  ],
  controllers: [InstructoresProjectoController],
  providers: [InstructoresProjectoService],
})
export class InstructoresProjectoModule {}
