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

  async crear(CrearSemilleroDTO: SemilleroDTO) {
    const { nombreSemillero } = CrearSemilleroDTO;

    const semilleroExistente = await this.semilleroModel.findOne({ Nombre_Semillero }).exec();

    if (semilleroExistente) {
      throw new ConflictException(`El semillero "${Nombre_Semillero}" ya existe.`);
    }

    const nuevoSemillero = new this.semilleroModel(CrearSemilleroDTO);
    const semilleroGuardado = await nuevoSemillero.save();

    return {
      message: 'Semillero creado con éxito.',
      data: semilleroGuardado,
    };
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

  async actualizar(id: string, actualizarSemilleroDto: Partial<SemilleroDTO>) {
    const semilleroActualizado = await this.semilleroModel
      .findByIdAndUpdate(id, actualizarSemilleroDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!semilleroActualizado) {
      throw new NotFoundException(`Semillero con ID "${id}" no encontrado.`);
    }

    return {
      message: 'Semillero actualizado con éxito.',
      data: semilleroActualizado,
    };
  }

  async eliminar(id: string) {
    const semilleroEliminado = await this.semilleroModel.findByIdAndDelete(id).exec();
    if (!semilleroEliminado) {
      throw new NotFoundException(`Semillero con ID "${id}" no encontrado.`);
    }
    return {
      message: `Semillero con ID "${id}" eliminado con éxito.`,
    };
  }
}