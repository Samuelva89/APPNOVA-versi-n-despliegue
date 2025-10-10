import { Injectable, NotFoundException } from '@nestjs/common';
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

  async crear(crearCronogramaDto: CronogramaDto) {
    const nuevoCronograma = new this.cronogramaModel(crearCronogramaDto);
    const cronogramaGuardado = await nuevoCronograma.save();
    return {
      message: 'Cronograma creado con éxito.',
      data: cronogramaGuardado,
    };
  }

  async consultarTodos(): Promise<ICronograma[]> {
    return await this.cronogramaModel.find().exec();
  }

  async consultarPorId(id: string): Promise<ICronograma> {
    const cronograma = await this.cronogramaModel.findById(id).exec();
    if (!cronograma) {
      throw new NotFoundException(`Cronograma con ID "${id}" no encontrado.`);
    }
    return cronograma;
  }

  async actualizar(id: string, actualizarCronogramaDto: Partial<CronogramaDto>) {
    const cronogramaActualizado = await this.cronogramaModel
      .findByIdAndUpdate(id, actualizarCronogramaDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!cronogramaActualizado) {
      throw new NotFoundException(`Cronograma con ID "${id}" no encontrado.`);
    }

    return {
      message: 'Cronograma actualizado con éxito.',
      data: cronogramaActualizado,
    };
  }

  async eliminar(id: string) {
    const cronogramaEliminado = await this.cronogramaModel.findByIdAndDelete(id).exec();
    if (!cronogramaEliminado) {
      throw new NotFoundException(`Cronograma con ID "${id}" no encontrado.`);
    }
    return {
      message: `Cronograma con ID "${id}" eliminado con éxito.`,
    };
  }
}