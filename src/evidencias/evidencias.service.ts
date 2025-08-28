import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IEvidencia } from './dto/evidencias.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EvidenciaDto } from './dto/evidencias.dto';

@Injectable()
export class EvidenciasService {
  constructor(
    @InjectModel('Evidencia')
    private readonly evidenciaModel: Model<IEvidencia>,
  ) {}

  async crear(crearEvidenciaDto: EvidenciaDto): Promise<IEvidencia> {
    const { archivoURL } = crearEvidenciaDto;

    const evidenciaExistente = await this.evidenciaModel.findOne({ archivoURL }).exec();

    if (evidenciaExistente) {
      throw new ConflictException(`La evidencia con la URL "${archivoURL}" ya existe.`);
    }

    const nuevaEvidencia = new this.evidenciaModel(crearEvidenciaDto);
    return await nuevaEvidencia.save();
  }

  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IEvidencia> {
    const evidencia = await this.evidenciaModel.findById(id).exec();
    if (!evidencia) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    return evidencia;
  }

  async actualizar(id: string, actualizarEvidenciaDto: Partial<EvidenciaDto>): Promise<IEvidencia> {
    const evidenciaActualizada = await this.evidenciaModel
      .findByIdAndUpdate(id, actualizarEvidenciaDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!evidenciaActualizada) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    return evidenciaActualizada;
  }

  async eliminar(id: string): Promise<IEvidencia> {
    const evidenciaEliminada = await this.evidenciaModel.findByIdAndDelete(id).exec();
    if (!evidenciaEliminada) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    return evidenciaEliminada;
  }
}