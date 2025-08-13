import { Module } from '@nestjs/common';
import { CronogramaController } from './cronograma.controller';
import { CronogramaService } from './cronograma.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CronogramaSchema } from './dto/cronograma.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'cronograma', schema: CronogramaSchema },
    ]),
  ],
  controllers: [CronogramaController],
  providers: [CronogramaService],
})
export class CronogramaModule {}
