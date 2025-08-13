import { Injectable } from '@nestjs/common';
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
    const respuesta = new this.aprendizModel(crearAprendizDto);
    return await respuesta.save();
  }

  async consultarTodos(): Promise<IAprendiz[]> {
    return await this.aprendizModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IAprendiz | null> {
    return await this.aprendizModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarAprendizDto: Partial<IAprendiz>,
  ): Promise<IAprendiz | null> {
    return await this.aprendizModel
      .findByIdAndUpdate(id, actualizarAprendizDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<IAprendiz | null> {
    return await this.aprendizModel.findByIdAndDelete(id).exec();
  }
}
