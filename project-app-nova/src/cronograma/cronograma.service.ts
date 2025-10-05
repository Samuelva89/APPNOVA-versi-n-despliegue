import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async crear(crearCronogramaDto: CronogramaDto): Promise<ICronograma> {
    // The original unique check for 'actividad_general' was removed because the field no longer exists.
    // A new validation logic might be needed depending on business rules (e.g., one cronograma per project).
    const nuevoCronograma = new this.cronogramaModel(crearCronogramaDto);
    return await nuevoCronograma.save();
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

  async actualizar(
    id: string,
    actualizarCrronogramaDto: Partial<CronogramaDto>,
  ): Promise<ICronograma> {
    const cronogramaActualizado = await this.cronogramaModel
      .findByIdAndUpdate(id, actualizarCrronogramaDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!cronogramaActualizado) {
      throw new NotFoundException(`Cronograma con ID "${id}" no encontrado.`);
    }
    return cronogramaActualizado;
  }

  async eliminar(id: string): Promise<ICronograma> {
    const cronogramaEliminado = await this.cronogramaModel.findByIdAndDelete(id).exec();
    if (!cronogramaEliminado) {
      throw new NotFoundException(`Cronograma con ID "${id}" no encontrado.`);
    }
    return cronogramaEliminado;
  }
}