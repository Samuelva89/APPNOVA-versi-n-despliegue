import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISeguimiento } from './dto/seguimiento.model';
import { Model } from 'mongoose';
import { ObservacionSegDto } from './dto/seguimiento.dto';

@Injectable()
export class SeguimientoService {
  constructor(
    @InjectModel('Seguimiento')
    private readonly seguimientoModel: Model<ISeguimiento>,
  ) {}

  async crear(
    CrearObservacionSegDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    const respuesta = new this.seguimientoModel(CrearObservacionSegDto);
    return await respuesta.save();
  }

  async consultarTodos(): Promise<ISeguimiento[]> {
    return await this.seguimientoModel.find().exec();
  }

  async consultarID(id: string): Promise<ISeguimiento | null> {
    return await this.seguimientoModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarSeguimientoDto: Partial<ObservacionSegDto>,
  ): Promise<ISeguimiento | null> {
    return await this.seguimientoModel
      .findByIdAndUpdate(id, actualizarSeguimientoDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<ISeguimiento | null> {
    return await this.seguimientoModel.findByIdAndDelete(id).exec();
  }
}
