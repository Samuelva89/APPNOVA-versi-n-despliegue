import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iprojecto } from './dto/projecto.model';
import { projectoDto } from './dto/projecto.dto';

@Injectable()
export class ProjectoService {
  constructor(
    @InjectModel('Projecto') private readonly ProjectoModel: Model<Iprojecto>,
  ) {}

  async crear(crearProjectoDto: projectoDto): Promise<Iprojecto> {
    const { titulo } = crearProjectoDto;

    const projectoExistente = await this.ProjectoModel.findOne({ titulo }).exec();

    if (projectoExistente) {
      throw new ConflictException(
        `Ya existe un proyecto con el título "${titulo}".`,
      );
    }

    const nuevoProjecto = new this.ProjectoModel(crearProjectoDto);
    return await nuevoProjecto.save();
  }

  async consultarTodos(): Promise<Iprojecto[]> {
    return await this.ProjectoModel.find().exec();
  }

  async consultarPorId(id: string): Promise<Iprojecto> {
    const projecto = await this.ProjectoModel.findById(id).exec();
    if (!projecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projecto;
  }

  async actualizar(
    id: string,
    actualizarProjectoDto: Partial<projectoDto>,
  ): Promise<Iprojecto> {
    const projectoActualizado = await this.ProjectoModel
      .findByIdAndUpdate(id, actualizarProjectoDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!projectoActualizado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoActualizado;
  }

  async eliminar(id: string): Promise<Iprojecto> {
    const projectoEliminado = await this.ProjectoModel
      .findByIdAndDelete(id)
      .exec();
    if (!projectoEliminado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoEliminado;
  }
}