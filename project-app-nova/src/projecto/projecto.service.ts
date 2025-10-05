
import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProjecto } from './dto/projecto.model';
import { ProjectoDto } from './dto/projecto.dto';
import { UserRole } from 'src/common/constants/roles.enum';

@Injectable()
export class ProjectoService {
  constructor(
    @InjectModel('Projecto') private readonly ProjectoModel: Model<IProjecto>,
  ) {}

  async crear(crearProjectoDto: ProjectoDto, user: any): Promise<IProjecto> {
    const { tituloDeProyecto } = crearProjectoDto;
    const projectoExistente = await this.ProjectoModel.findOne({
      tituloDeProyecto,
    })
      .lean()
      .exec();

    if (projectoExistente) {
      throw new ConflictException(
        `Ya existe un proyecto con el título "${tituloDeProyecto}".`,
      );
    }

    const nuevoProjecto = new this.ProjectoModel(crearProjectoDto);
    return await nuevoProjecto.save();
  }

  async consultarTodos(user: any): Promise<IProjecto[]> {
    const populateOptions = [
      { path: 'aprendices', select: 'nombreCompleto correoElectronico' },
      { path: 'instructores', select: 'Nombre_Instructor Email' },
      { path: 'semillero', select: 'Nombre_Semillero' },
    ];

    let query = this.ProjectoModel.find();

    if (
      user.roles.includes(UserRole.LIDER_DE_PROYECTO) ||
      user.roles.includes(UserRole.DINAMIZADOR)
    ) {
      // No filter needed
    } else if (
      user.roles.includes(UserRole.LIDER_DE_SEMILLERO) &&
      user.semilleroId
    ) {
      query = query.where({ semillero: user.semilleroId });
    } else if (
      user.roles.includes(UserRole.COINVESTIGADOR) &&
      user.instructorId
    ) {
      query = query.where({ instructores: user.instructorId });
    } else if (user.roles.includes(UserRole.INVESTIGADOR) && user.aprendizId) {
      query = query.where({ aprendices: user.aprendizId });
    } else {
      return [];
    }

    return await query.populate(populateOptions).lean().exec();
  }

  async consultarPorId(id: string, user: any): Promise<IProjecto> {
    const projecto = await this.ProjectoModel.findById(id)
      .populate([
        { path: 'aprendices', select: 'nombreCompleto correoElectronico' },
        { path: 'instructores', select: 'Nombre_Instructor Email' },
        {
          path: 'cronograma',
          select: 'actividad_general fecha_inicio fecha_fin',
        },
        { path: 'evidencias', select: 'titulo tipoevidencia' },
        { path: 'seguimiento', select: 'observacion fecha_observacion' },
        { path: 'semillero', select: 'Nombre_Semillero' },
      ])
      .lean() // Using lean for performance
      .exec();

    if (!projecto) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }

    const esLider = user.roles.includes(UserRole.LIDER_DE_PROYECTO);
    const esDinamizador = user.roles.includes(UserRole.DINAMIZADOR);

    // Note: With .lean(), populated documents are plain objects.
    // We must compare IDs directly instead of using the .equals() method.
    const esLiderDeSuSemillero =
      user.semilleroId &&
      projecto.semillero.some(
        (sem: any) => sem._id.toString() === user.semilleroId.toString(),
      );
    const esSuProyectoInstructor =
      user.instructorId &&
      projecto.instructores.some(
        (inst: any) => inst._id.toString() === user.instructorId.toString(),
      );
    const esSuProyectoAprendiz =
      user.aprendizId &&
      projecto.aprendices.some(
        (apr: any) => apr._id.toString() === user.aprendizId.toString(),
      );

    if (
      esLider ||
      esDinamizador ||
      esLiderDeSuSemillero ||
      esSuProyectoInstructor ||
      esSuProyectoAprendiz
    ) {
      return projecto;
    }

    throw new ForbiddenException('No tienes permiso para acceder a este proyecto.');
  }

  async actualizar(
    id: string,
    actualizarProjectoDto: Partial<ProjectoDto>,
    user: any,
  ): Promise<IProjecto> {
    // consultarPorId already performs the auth check
    await this.consultarPorId(id, user);

    const projectoActualizado = await this.ProjectoModel.findByIdAndUpdate(
      id,
      actualizarProjectoDto,
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!projectoActualizado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoActualizado;
  }

  async eliminar(id: string, user: any): Promise<IProjecto> {
    const esLider = user.roles.includes(UserRole.LIDER_DE_PROYECTO);
    if (!esLider) {
      throw new ForbiddenException(
        'Solo el LIDER DE PROYECTO puede realizar esta accion',
      );
    }
    const projectoEliminado =
      await this.ProjectoModel.findByIdAndDelete(id).exec();
    if (!projectoEliminado) {
      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);
    }
    return projectoEliminado;
  }
}
