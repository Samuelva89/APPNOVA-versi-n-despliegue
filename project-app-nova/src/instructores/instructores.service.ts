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

  async crear(crearInstructoresDto: instructoresDto): Promise<IInstructores> {
    const { Documento_Identidad, Email } = crearInstructoresDto;

    // Lógica para verificar duplicados antes de guardar
    const instructorExistente = await this.instructoresModel
      .findOne({
        $or: [{ Documento_Identidad }, { Email }],
      })
      .exec();

    if (instructorExistente) {
      throw new ConflictException(
        'El documento de identidad o el correo electrónico ya existen.',
      );
    }

    const nuevoInstructor = new this.instructoresModel(crearInstructoresDto);
    return await nuevoInstructor.save();
  }

  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IInstructores> {
    const instructor = await this.instructoresModel.findById(id).exec();
    if (!instructor) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }
    return instructor;
  }

  async actualizar(
    id: string,
    actualizarInstructoresDto: Partial<instructoresDto>,
  ): Promise<IInstructores> {
    const instructorActualizado = await this.instructoresModel
      .findByIdAndUpdate(id, actualizarInstructoresDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!instructorActualizado) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }

    return instructorActualizado;
  }

  async eliminar(id: string): Promise<IInstructores> {
    const instructorEliminado = await this.instructoresModel
      .findByIdAndDelete(id)
      .exec();
    if (!instructorEliminado) {
      throw new NotFoundException(`Instructor con ID "${id}" no encontrado.`);
    }
    return instructorEliminado;
  }
}