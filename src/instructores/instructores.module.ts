import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstructoresController } from './instructores.controller';
import { InstructoresService } from './instructores.service';
import { InstructoresSchema } from './dto/instructores.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Instructores', schema: InstructoresSchema },
    ]),
  ],
  controllers: [InstructoresController],
  providers: [InstructoresService],
  exports: [InstructoresService],
})
export class InstructoresModule {}
