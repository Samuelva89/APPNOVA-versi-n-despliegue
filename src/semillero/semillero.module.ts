import { Module } from '@nestjs/common';
import { SemilleroController } from './semillero.controller';
import { SemilleroService } from './semillero.service';

@Module({
  controllers: [SemilleroController],
  providers: [SemilleroService]
})
export class SemilleroModule {}
