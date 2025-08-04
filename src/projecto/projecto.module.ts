import { Module } from '@nestjs/common';
import { ProjectoController } from './projecto.controller';
import { ProjectoService } from './projecto.service';

@Module({
  controllers: [ProjectoController],
  providers: [ProjectoService]
})
export class ProjectoModule {}
