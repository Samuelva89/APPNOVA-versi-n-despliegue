import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IEvidencia } from './dto/evidencias.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEvidenciaDto } from './dto/evidencias.dto';

@Injectable()
export class EvidenciasService {
  constructor(
    @InjectModel('Evidencia')
    private readonly evidenciaModel: Model<IEvidencia>,
  ) {}

  /**
   * Crea un nuevo registro de evidencia en la base de datos.
   * @param dto Los datos de texto que acompañan al archivo (nombre, descripción, proyectoId).
   * @param file El objeto del archivo procesado por Multer (contiene path, mimetype, etc.).
   * @param userId El ID del usuario que realiza la carga.
   * @returns El documento de la evidencia creada.
   */
  async crear(
    dto: CreateEvidenciaDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<IEvidencia> {
    // 1. Validar que el archivo fue subido
    if (!file) {
      throw new BadRequestException('El archivo es obligatorio.');
    }

    // 2. Crear una nueva instancia del modelo con todos los datos
    const nuevaEvidencia = new this.evidenciaModel({
      // Datos del DTO
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      proyecto: dto.proyectoId,
      // Metadatos del archivo
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      // Dato del usuario autenticado
      user: userId,
    });

    // 3. Guardar en la base de datos y retornar
    return await nuevaEvidencia.save();
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
  ): Promise<IEvidencia> {
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
    // NOTA: Una mejora futura sería eliminar también el archivo físico del disco
    // usando el 'path' guardado en la base de datos y el módulo 'fs' de Node.js.
    const evidenciaEliminada = await this.evidenciaModel
      .findByIdAndDelete(id)
      .exec();
    if (!evidenciaEliminada) {
      throw new NotFoundException(`Evidencia con ID "${id}" no encontrada.`);
    }
    return evidenciaEliminada;
  }
}
