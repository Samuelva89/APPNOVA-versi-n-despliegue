import { Injectable } from '@nestjs/common';
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
    const respuesta = new this.semilleroModel(CrearSemilleroDTO);
    return await respuesta.save();
  }

  async ConsultarTodos(): Promise<ISemillero[]> {
    return await this.semilleroModel.find().exec();
  }

  async consultarID(id: string): Promise<ISemillero | null> {
    return await this.semilleroModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarSemilleroDto: Partial<SemilleroDTO>,
  ): Promise<ISemillero | null> {
    return await this.semilleroModel
      .findByIdAndUpdate(id, actualizarSemilleroDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<ISemillero | null> {
    return await this.semilleroModel.findByIdAndDelete(id).exec();
  }
}
