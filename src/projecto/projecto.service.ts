import { Injectable } from '@nestjs/common';
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
    const respuesta = new this.ProjectoModel(crearProjectoDto);
    return await respuesta.save();
  }
  async consultarTodos(): Promise<Iprojecto[]> {
    return await this.ProjectoModel.find().exec();
  }

  async consultarPorId(id: string): Promise<Iprojecto | null> {
    return await this.ProjectoModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarProjectoDto: Partial<Iprojecto>,
  ): Promise<Iprojecto | null> {
    return await this.ProjectoModel.findByIdAndUpdate(
      id,
      actualizarProjectoDto,
      {
        new: true,
        runValidators: true,
      },
    ).exec();
  }

  async eliminar(id: string): Promise<Iprojecto | null> {
    return await this.ProjectoModel.findByIdAndDelete(id).exec();
  }
}
