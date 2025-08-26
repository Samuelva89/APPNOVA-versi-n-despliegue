import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISemillero } from './dto/semillero.model';
import { Model } from 'mongoose';
import { SemilleroDTO } from './dto/semilleros.dto';

@Injectable()
export class SemilleroService {
  constructor(
    @InjectModel('Semillero')
    private readonly semilleroModel: Model<ISemillero>,
  ) {}

  async crear(CrearSemilleroDTO: SemilleroDTO): Promise<ISemillero> {
    const { Nombre_Semillero } = CrearSemilleroDTO;

    const semilleroExistente = await this.semilleroModel.findOne({ Nombre_Semillero }).exec();

    if (semilleroExistente) {
      throw new ConflictException(`El semillero "${Nombre_Semillero}" ya existe.`);
    }

    const nuevoSemillero = new this.semilleroModel(CrearSemilleroDTO);
    return await nuevoSemillero.save();
  }

  async ConsultarTodos(): Promise<ISemillero[]> {
    return await this.semilleroModel.find().exec();
  }

  async consultarID(id: string): Promise<ISemillero> {
    const semillero = await this.semilleroModel.findById(id).exec();
    if (!semillero) {
      throw new NotFoundException(`Semillero con ID "${id}" no encontrado.`);
    }
    return semillero;
  }

  async actualizar(
    id: string,
    actualizarSemilleroDto: Partial<SemilleroDTO>,
  ): Promise<ISemillero> {
    const semilleroActualizado = await this.semilleroModel
      .findByIdAndUpdate(id, actualizarSemilleroDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!semilleroActualizado) {
      throw new NotFoundException(`Semillero con ID "${id}" no encontrado.`);
    }
    return semilleroActualizado;
  }

  async eliminar(id: string): Promise<ISemillero> {
    const semilleroEliminado = await this.semilleroModel.findByIdAndDelete(id).exec();
    if (!semilleroEliminado) {
      throw new NotFoundException(`Semillero con ID "${id}" no encontrado.`);
    }
    return semilleroEliminado;
  }
}