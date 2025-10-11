import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async crear(crearInstructoresDto: instructoresDto) {
    const { documentoIdentidad, email } = crearInstructoresDto;

    const instructorExistente = await this.instructoresModel
      .findOne({
        $or: [{ documentoIdentidad }, { email }],
      })
      .exec();

    if (instructorExistente) {
      throw new ConflictException(
        'El documento de identidad o el correo electrónico ya existen.',
      );
    }

    const nuevoInstructor = new this.instructoresModel(crearInstructoresDto);
    const instructorGuardado = await nuevoInstructor.save();
    const resultadoLimpio = instructorGuardado.toObject();

    return {
      message: 'Instructor creado con éxito.',
      data: resultadoLimpio,
    };
  }

  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IInstructores> {
    const instructor = await this.instructoresModel.findById(id).lean().exec();
    if (!instructor) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }
    return instructor;
  }

  async actualizar(id: string, actualizarInstructoresDto: Partial<instructoresDto>) {
    const instructorActualizado = await this.instructoresModel
      .findByIdAndUpdate(id, actualizarInstructoresDto, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();

    if (!instructorActualizado) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }

    return {
      message: 'Instructor actualizado con éxito.',
      data: instructorActualizado,
    };
  }

  async eliminar(id: string) {
    const instructorEliminado = await this.instructoresModel
      .findByIdAndDelete(id)
      .exec();
    if (!instructorEliminado) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }
    return {
      message: `Instructor con ID "${id}" eliminado con éxito.`,
    };
  }
}