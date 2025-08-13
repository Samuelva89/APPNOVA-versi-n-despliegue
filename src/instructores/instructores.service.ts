import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IInstructores } from './dto/instructores.model';
import { Model } from 'mongoose';
import { instructoresDto } from './dto/instructores.dto';

@Injectable()
export class InstructoresService {
  constructor(
    @InjectModel('Instructores')
    private readonly instructoresModel: Model<IInstructores>,
  ) {}

  async crear(crearInstructoresDto: instructoresDto): Promise<IInstructores> {
    const respuesta = new this.instructoresModel(crearInstructoresDto);
    return await respuesta.save();
  }

  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IInstructores | null> {
    return await this.instructoresModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarInstructoresDto: Partial<instructoresDto>,
  ): Promise<IInstructores | null> {
    return await this.instructoresModel
      .findByIdAndUpdate(id, actualizarInstructoresDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<IInstructores | null> {
    return await this.instructoresModel.findByIdAndDelete(id).exec();
  }
}
