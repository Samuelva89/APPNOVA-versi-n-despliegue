import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICronograma } from './dto/cronograma.model';
import { CronogramaDto } from './dto/cronograma.dto';
import { Model } from 'mongoose';
@Injectable()
export class CronogramaService {
  constructor(
    @InjectModel('cronograma')
    private readonly cronogramaModel: Model<ICronograma>,
  ) {}

  async crear(CrearCronogramaDto: CronogramaDto) {
    const respuesta = new this.cronogramaModel(CrearCronogramaDto);
    return await respuesta.save();
  }

  async consultarTodos(): Promise<ICronograma[]> {
    return await this.cronogramaModel.find().exec();
  }

  async consultarPorId(id: String): Promise<ICronograma | null> {
    return await this.cronogramaModel.findById(id).exec();
  }

  async actualizar(id: String, actualizarCrronogramaDto: Partial<ICronograma>) {
    return await this.cronogramaModel
      .findByIdAndUpdate(id, actualizarCrronogramaDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: String): Promise<ICronograma | null> {
    return await this.cronogramaModel.findByIdAndDelete(id).exec();
  }
}
