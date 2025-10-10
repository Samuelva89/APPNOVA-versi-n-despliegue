import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISeguimiento } from './dto/seguimiento.model';
import { ObservacionSegDto } from './dto/seguimiento.dto';
import { IProjecto } from 'src/projecto/dto/projecto.model'; // Importar el modelo de proyecto

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectModel('Seguimiento')
    private readonly seguimientoModel: Model<ISeguimiento>,
    @InjectModel('Projecto') // Inyectar el modelo de Projecto
    private readonly projectoModel: Model<IProjecto>,
  ) {}

  async crear(crearObservacionSegDto: ObservacionSegDto) {
    const { projecto, ...rest } = crearObservacionSegDto;

    // Validar que el proyecto existe
    const proyectoExistente = await this.projectoModel.findById(projecto).exec();
    if (!proyectoExistente) {
      throw new NotFoundException(
        `El proyecto con ID "${projecto}" no fue encontrado.`,
      );
    }

    const nuevaObservacion = new this.seguimientoModel(crearObservacionSegDto);
    const observacionGuardada = await nuevaObservacion.save();

    return {
      message: 'Observación de seguimiento creada con éxito.',
      data: observacionGuardada,
    };
  }

  async consultarTodos(): Promise<ISeguimiento[]> {
    return await this.seguimientoModel.find().exec();
  }

  async consultarID(id: string): Promise<ISeguimiento> {
    const seguimiento = await this.seguimientoModel
      .findById(id)
      .populate({
        path: 'projecto',
        select: 'tituloDeProyecto',
      })
      .populate({
        path: 'user',
        select: 'nombreCompleto email',
      })
      .lean()
      .exec();
    if (!seguimiento) {
      throw new NotFoundException(
        `Observación de seguimiento con ID "${id}" no encontrada.`,
      );
    }
    return seguimiento;
  }

  async actualizar(id: string, actualizarDto: Partial<ObservacionSegDto>) {
    const seguimientoActualizado = await this.seguimientoModel
      .findByIdAndUpdate(id, actualizarDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!seguimientoActualizado) {
      throw new NotFoundException(
        `Observación de seguimiento con ID "${id}" no encontrada.`,
      );
    }

    return {
      message: 'Observación de seguimiento actualizada con éxito.',
      data: seguimientoActualizado,
    };
  }

  async eliminar(id: string) {
    const seguimientoEliminado = await this.seguimientoModel
      .findByIdAndDelete(id)
      .exec();

    if (!seguimientoEliminado) {
      throw new NotFoundException(
        `Observación de seguimiento con ID "${id}" no encontrada.`,
      );
    }

    return {
      message: `Observación de seguimiento con ID "${id}" eliminada con éxito.`,
    };
  }
}