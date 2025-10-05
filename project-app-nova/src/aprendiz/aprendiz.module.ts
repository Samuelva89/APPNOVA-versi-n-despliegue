import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AprendizController } from './aprendiz.controller';
import { AprendizService } from './aprendiz.service';
import { AprendizSchema } from './dto/aprendiz.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Aprendiz', schema: AprendizSchema }]),
  ],
  controllers: [AprendizController],
  providers: [AprendizService],
})
export class AprendizModule {}
