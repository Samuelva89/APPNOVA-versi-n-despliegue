import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IEvidencia } from './dto/evidencias.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEvidenciaDto } from './dto/evidencias.dto';
import { unlink } from 'fs/promises';

@Injectable()
export class EvidenciasService {
  private readonly logger = new Logger(EvidenciasService.name);

  constructor(
    @InjectModel('Evidencia')
    private readonly evidenciaModel: Model<IEvidencia>,
  ) {}

  async crear(
    dto: CreateEvidenciaDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    if (!file) {
      throw new BadRequestException('El archivo es obligatorio.');
    }

    const nuevaEvidencia = new this.evidenciaModel({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      proyecto: dto.proyectoId,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      user: userId,
    });

    const evidenciaGuardada = await nuevaEvidencia.save();

    return {
      message: 'Evidencia creada con éxito.',
      data: evidenciaGuardada,
    };
  }

  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaModel
      .find()
      .populate('user', 'nombreCompleto')
      .populate('proyecto', 'tituloDeProyecto')
      .exec();
  }

  async consultarPorId(id: string): Promise<IEvidencia> {
    const evidencia = await this.evidenciaModel.findById(id).exec();
    if (!evidencia) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    return evidencia;
  }

  async actualizar(
    id: string,
    actualizarEvidenciaDto: Partial<CreateEvidenciaDto>,
  ) {
    const evidenciaActualizada = await this.evidenciaModel
      .findByIdAndUpdate(id, actualizarEvidenciaDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!evidenciaActualizada) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    
    return {
      message: 'Evidencia actualizada con éxito.',
      data: evidenciaActualizada,
    };
  }

  async eliminar(id: string) {
    const evidencia = await this.evidenciaModel.findById(id).exec();
    if (!evidencia) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }

    // Intentar eliminar el archivo físico
    try {
      await unlink(evidencia.path);
    } catch (error) {
      this.logger.warn(
        `No se pudo eliminar el archivo físico: ${evidencia.path}. Error: ${error.message}`,
      );
    }

    // Eliminar el registro de la base de datos
    await this.evidenciaModel.findByIdAndDelete(id).exec();

    return {
      message: `Evidencia con ID "${id}" eliminada con éxito.`,
    };
  }
}
