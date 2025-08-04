import { Module } from '@nestjs/common';
import { AprendizController } from './aprendiz.controller';
import { AprendizService } from './aprendiz.service';

@Module({
  controllers: [AprendizController],
  providers: [AprendizService]
})
export class AprendizModule {}
