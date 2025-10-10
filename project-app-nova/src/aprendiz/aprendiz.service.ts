import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IAprendiz } from './dto/aprendiz.model';
import { Model } from 'mongoose';
import { AprendizDto } from './dto/aprendiz.dto';

@Injectable()
export class AprendizService {
  constructor(
    @InjectModel('Aprendiz') private readonly aprendizModel: Model<IAprendiz>,
  ) {}

  async crear(crearAprendizDto: AprendizDto) {
    const { documentoIdentidad, correoElectronico } = crearAprendizDto;

    const aprendizExistente = await this.aprendizModel.findOne({
      $or: [{ documentoIdentidad }, { correoElectronico }],
    }).exec();

    if (aprendizExistente) {
      throw new ConflictException('El documento de identidad o el correo electrónico ya existen.');
    }

    const nuevoAprendiz = new this.aprendizModel(crearAprendizDto);
    const aprendizGuardado = await nuevoAprendiz.save();

    return {
      message: 'Aprendiz creado con éxito.',
      data: aprendizGuardado,
    };
  }

  async consultarTodos(): Promise<IAprendiz[]> {
    return await this.aprendizModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IAprendiz> {
    const aprendiz = await this.aprendizModel.findById(id).exec();
    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz con ID "${id}" no encontrado.`);
    }
    return aprendiz;
  }

  async actualizar(id: string, actualizarAprendizDto: Partial<AprendizDto>) {
    const aprendizActualizado = await this.aprendizModel
      .findByIdAndUpdate(id, actualizarAprendizDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!aprendizActualizado) {
      throw new NotFoundException(`Aprendiz con ID "${id}" no encontrado.`);
    }

    return {
      message: 'Aprendiz actualizado con éxito.',
      data: aprendizActualizado,
    };
  }

  async eliminar(id: string) {
    const aprendizEliminado = await this.aprendizModel.findByIdAndDelete(id).exec();
    if (!aprendizEliminado) {
      throw new NotFoundException(`Aprendiz con ID "${id}" no encontrado.`);
    }
    return {
      message: `Aprendiz con ID "${id}" eliminado con éxito.`,
    };
  }
}