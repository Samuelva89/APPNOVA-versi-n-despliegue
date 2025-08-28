import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISeguimiento } from './dto/seguimiento.model';
import { ObservacionSegDto } from './dto/seguimiento.dto';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectModel('Seguimiento')
    private readonly seguimientoModel: Model<ISeguimiento>,
  ) {}

  async crear(
    crearObservacionSegDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    const nuevaObservacion = new this.seguimientoModel(
      crearObservacionSegDto,
    );
    return await nuevaObservacion.save();
  }

  async consultarTodos(): Promise<ISeguimiento[]> {
    return await this.seguimientoModel.find().exec();
  }

  async consultarID(id: string): Promise<ISeguimiento> {
    const seguimiento = await this.seguimientoModel.findById(id).exec();
    if (!seguimiento) {
      throw new NotFoundException(
        `Observación de seguimiento con ID "${id}" no encontrada.`,
      );
    }
    return seguimiento;
  }

  async actualizar(
    id: string,
    actualizarDto: Partial<ObservacionSegDto>,
  ): Promise<ISeguimiento> {
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
    return seguimientoActualizado;
  }

  async eliminar(id: string): Promise<ISeguimiento> {
    const seguimientoEliminado = await this.seguimientoModel
      .findByIdAndDelete(id)
      .exec();
    if (!seguimientoEliminado) {
      throw new NotFoundException(
        `Observación de seguimiento con ID "${id}" no encontrada.`,
      );
    }
    return seguimientoEliminado;
  }
}