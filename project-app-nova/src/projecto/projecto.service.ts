


import {

  ConflictException,

  Injectable,

  NotFoundException,

  ForbiddenException,

  BadRequestException,

  InternalServerErrorException,

} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { IProjecto } from './dto/projecto.model';

import { ProjectoDto } from './dto/projecto.dto';

import { UserRole } from 'src/common/constants/roles.enum';

import { SemilleroService } from 'src/semillero/semillero.service';



@Injectable()

export class ProjectoService {

  constructor(

    @InjectModel('Projecto') private readonly ProjectoModel: Model<IProjecto>,

    private readonly semilleroService: SemilleroService, // Inyectamos el servicio

  ) {}



  async crear(crearProjectoDto: ProjectoDto, user: any): Promise<any> {

    const { tituloDeProyecto, ...restOfDto } = crearProjectoDto;



    // 1. Verificar si el título del proyecto ya existe

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



    const projectData: Partial<IProjecto> = { ...restOfDto, tituloDeProyecto };



    // 2. Lógica de asignación automática de Semillero

    if (user.roles.includes(UserRole.LIDER_DE_SEMILLERO)) {

      if (!user.semilleroId) {

        throw new ForbiddenException(

          'Como Líder de Semillero, tu usuario debe tener un semillero asociado.',

        );

      }

      // Verificamos que el semillero del token realmente exista

      const semillero = await this.semilleroService.consultarID(user.semilleroId);

      if (!semillero) {

        throw new NotFoundException(

          `El semillero con ID "${user.semilleroId}" (asociado a tu usuario) no fue encontrado.`,

        );

      }

      // Asignamos el semillero al proyecto

      projectData.semillero = [semillero._id];

    }



    const nuevoProjecto = new this.ProjectoModel(projectData);



    // 3. Manejo de errores al guardar (try-catch)

    try {

      const proyectoGuardado = await nuevoProjecto.save();

      return {

        message: 'Proyecto creado con éxito.',

        data: proyectoGuardado.toObject(),

      };

    } catch (error) {

      // Si el error es de Mongoose por un ID mal formado (ej. en aprendices o instructores)

      if (error.name === 'CastError') {

        throw new BadRequestException(

          `Error de formato en uno de los IDs proporcionados. Revisa los IDs de aprendices o instructores. Detalle: ${error.message}`,

        );

      }

      // Para cualquier otro error, lanzamos un error interno.

      throw new InternalServerErrorException(

        `Ocurrió un error inesperado al guardar el proyecto: ${error.message}`,

      );

    }

  }



  async consultarTodos(user: any): Promise<IProjecto[]> {

    const populateOptions = [

      { path: 'aprendices', select: 'nombreCompleto correoElectronico' },

      { path: 'instructores', select: 'nombreInstructor email' },

      { path: 'semillero', select: 'nombreSemillero' },

    ];



    let query = this.ProjectoModel.find();



    if (

      user.roles.includes(UserRole.LIDER_DE_PROYECTO) ||

      user.roles.includes(UserRole.DINAMIZADOR)

    ) {

      // Sin filtro, pueden ver todo

    } else if (

      user.roles.includes(UserRole.LIDER_DE_SEMILLERO) &&

      user.semilleroId

    ) {

      query = query.where('semillero').equals(user.semilleroId);

    } else if (

      user.roles.includes(UserRole.COINVESTIGADOR) &&

      user.instructorId

    ) {

      query = query.where('instructores').equals(user.instructorId);

    } else if (user.roles.includes(UserRole.INVESTIGADOR) && user.aprendizId) {

      query = query.where('aprendices').equals(user.aprendizId);

    } else {

      // Si no es ninguno de los anteriores y no es admin, no ve nada.

      return [];

    }



    return await query.populate(populateOptions).lean().exec();

  }



  async consultarPorId(id: string, user: any): Promise<IProjecto> {

    const projecto = await this.ProjectoModel.findById(id)

      .populate([

        { path: 'aprendices', select: 'nombreCompleto correoElectronico' },

        { path: 'instructores', select: 'nombreInstructor email' },

        {

          path: 'cronograma',

          select: 'actividad_general fecha_inicio fecha_fin',

        },

        { path: 'evidencias', select: 'titulo tipoevidencia' },

        { path: 'seguimiento', select: 'observacion fecha_observacion' },

        { path: 'semillero', select: 'nombreSemillero' },

      ])

      .lean() 

      .exec();



    if (!projecto) {

      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);

    }



    const esLiderProyecto = user.roles.includes(UserRole.LIDER_DE_PROYECTO);

    const esDinamizador = user.roles.includes(UserRole.DINAMIZADOR);



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

      esLiderProyecto ||

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

  ) {

    // Primero, verifica si el usuario tiene permiso para ver (y por ende, editar) el proyecto.

    await this.consultarPorId(id, user);



    const projectoActualizado = await this.ProjectoModel.findByIdAndUpdate(

      id,

      actualizarProjectoDto,

      {

        new: true,

        runValidators: true,

      },

    ).lean().exec();



    if (!projectoActualizado) {

      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);

    }

    

    return {

      message: 'Proyecto actualizado con éxito.',

      data: projectoActualizado,

    };

  }



  async eliminar(id: string, user: any) {

    const esLiderProyecto = user.roles.includes(UserRole.LIDER_DE_PROYECTO);

    // Asumimos que LIDER_DE_SEMILLERO también puede eliminar proyectos de su semillero.

    // Para eso, primero necesitamos verificar que el proyecto le pertenece.

    if (user.roles.includes(UserRole.LIDER_DE_SEMILLERO)) {

        await this.consultarPorId(id, user); // Esto ya valida el permiso

    } else if (!esLiderProyecto) {

        throw new ForbiddenException(

            'Solo un LIDER_DE_PROYECTO o el LÍDER_DE_SEMILLERO dueño del proyecto puede realizar esta acción.',

        );

    }



    const projectoEliminado =

      await this.ProjectoModel.findByIdAndDelete(id).exec();

      

    if (!projectoEliminado) {

      throw new NotFoundException(`Proyecto con ID "${id}" no encontrado.`);

    }



    return {

      message: `Proyecto con ID "${id}" eliminado con éxito.`,

    };

  }

}


