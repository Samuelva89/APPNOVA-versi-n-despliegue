import { Injectable } from '@nestjs/common';
import { IEvidencia } from './dto/evidencias.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EvidenciaDto } from './dto/evidencias.dto';

@Injectable()
export class EvidenciasService {
  constructor(
    @InjectModel('evidencia')
    private readonly evidenciaModel: Model<IEvidencia>,
  ) {}

  async crear(CrearevidenciaDto: EvidenciaDto): Promise<IEvidencia> {
    const respuesta = new this.evidenciaModel(CrearevidenciaDto);
    return await respuesta.save();
  }

  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IEvidencia | null> {
    return await this.evidenciaModel.findById(id).exec();
  }

  async actualizar(id: string, actualizarevidenciaDto: Partial<EvidenciaDto>) {
    return await this.evidenciaModel
      .findByIdAndUpdate(id, actualizarevidenciaDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<IEvidencia | null> {
    return await this.evidenciaModel.findByIdAndDelete(id).exec();
  }
}
