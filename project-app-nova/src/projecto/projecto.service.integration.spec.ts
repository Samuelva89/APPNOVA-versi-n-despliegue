import { Test, TestingModule } from '@nestjs/testing';
import { ProjectoService } from './projecto.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ProjectoSchema, IProjecto } from './dto/projecto.model';
import { ProjectoDto, ProjectoEstado } from './dto/projecto.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Connection, Model, Types } from 'mongoose';
import { UserRole } from '../common/constants/roles.enum';
import { AprendizSchema } from '../aprendiz/dto/aprendiz.model';
import { InstructoresSchema } from '../instructores/dto/instructores.model';
import { SemilleroSchema } from '../semillero/dto/semillero.model';
import { CronogramaSchema } from '../cronograma/dto/cronograma.model';
import { EvidenciaSchema } from '../evidencias/dto/evidencias.model';
import { SeguimientoSchema } from '../seguimiento/dto/seguimiento.model';
import { SemilleroService } from '../semillero/semillero.service';

// Mock de SemilleroService
const mockSemilleroService = {
  consultarID: jest.fn().mockResolvedValue({ _id: new Types.ObjectId(), nombreSemillero: 'Mock Semillero' }),
};

describe('ProjectoService (Integration)', () => {
  let service: ProjectoService;
  let projectoModel: Model<IProjecto>;
  let mongoUri: string;
  let connection: Connection;

  // Mock users with different roles
  const liderDeProyectoUser = { roles: [UserRole.LIDER_DE_PROYECTO] };
  const dinamizadorUser = { roles: [UserRole.DINAMIZADOR] };
  const otroUser = { roles: [UserRole.INVESTIGADOR], aprendizId: new Types.ObjectId() };

  let createdProjectoId: string;

  beforeAll(async () => {
    mongoUri = await startMongo();
  });

  afterAll(async () => {
    if (connection) {
      await connection.dropDatabase();
      await connection.close();
    }
    await stopMongo();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([
          { name: 'Projecto', schema: ProjectoSchema },
          { name: 'Aprendiz', schema: AprendizSchema },
          { name: 'Instructores', schema: InstructoresSchema },
          { name: 'Semillero', schema: SemilleroSchema },
          { name: 'Cronograma', schema: CronogramaSchema },
          { name: 'Evidencia', schema: EvidenciaSchema },
          { name: 'Seguimiento', schema: SeguimientoSchema },
        ]),
      ],
      providers: [
        ProjectoService,
        { provide: SemilleroService, useValue: mockSemilleroService },
      ],
    }).compile();

    service = module.get<ProjectoService>(ProjectoService);
    connection = module.get(getConnectionToken());
    projectoModel = connection.model('Projecto');

    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    // Create a project for testing read/update/delete operations
    const projecto = await service.crear({
        fechaInicio: new Date(),
        fechaFin: new Date(),
        regional: 'Regional Test',
        municipio: 'Municipio Test',
        centroDeFormacion: 'Centro Test',
        programaDeFormacion: 'Programa Test',
        nombreDelSemilleroDeInvestigacion: 'Semillero Test',
        lineaDeInvestigacionAsociada: 'Linea Test',
        tituloDeProyecto: 'Proyecto Base para Pruebas',
        resumen: 'Resumen',
        palabrasClave: 'test',
        justificacion: 'Justificacion',
        planteamientoDelProblema: 'Problema',
        objetivoGeneral: 'Objetivo General',
        objetivoEspecifico: ['OE1'],
        beneficiarios: 'Beneficiarios',
        metodologia: 'Metodologia',
        impactosEconomicoSocialAmbientalEsperados: 'Impacto',
        resultadosEsperados: 'Resultados',
        estado: ProjectoEstado.EN_DESARROLLO,
        aprendices: [otroUser.aprendizId],
        semillero: [new Types.ObjectId().toHexString()],
    }, liderDeProyectoUser);
    createdProjectoId = projecto.data._id.toString();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crear', () => {
    it('should create a new project successfully', async () => {
      const projectoDto: ProjectoDto = {
        fechaInicio: new Date(),
        fechaFin: new Date(),
        regional: 'Regional de Prueba',
        municipio: 'Municipio de Prueba',
        centroDeFormacion: 'Centro de Prueba',
        programaDeFormacion: 'Programa de Prueba',
        nombreDelSemilleroDeInvestigacion: 'Semillero de Prueba',
        lineaDeInvestigacionAsociada: 'Linea de Prueba',
        tituloDeProyecto: 'Proyecto de Prueba Unico',
        resumen: 'Resumen de prueba',
        palabrasClave: 'prueba, proyecto',
        justificacion: 'Justificacion de prueba',
        planteamientoDelProblema: 'Planteamiento de prueba',
        objetivoGeneral: 'Objetivo de prueba',
        objetivoEspecifico: ['OE1'],
        beneficiarios: 'Beneficiarios de prueba',
        metodologia: 'Metodologia de prueba',
        impactosEconomicoSocialAmbientalEsperados: 'Impactos de prueba',
        resultadosEsperados: 'Resultados de prueba',
        estado: ProjectoEstado.EN_DESARROLLO,
        semillero: [new Types.ObjectId().toHexString()],
      };

      const createdProjecto = await service.crear(projectoDto, liderDeProyectoUser);

      expect(createdProjecto).toBeDefined();
      expect(createdProjecto.data.tituloDeProyecto).toEqual(projectoDto.tituloDeProyecto);
    });

    it('should throw ConflictException if project title already exists', async () => {
      const projectoDto: any = { tituloDeProyecto: 'Proyecto Base para Pruebas' };
      await expect(service.crear(projectoDto, liderDeProyectoUser)).rejects.toThrow(ConflictException);
    });
  });

  describe('consultarTodos', () => {
    it('should return all projects for LIDER_DE_PROYECTO', async () => {
        const projects = await service.consultarTodos(liderDeProyectoUser);
        expect(projects.length).toBe(1);
    });

    it('should return all projects for DINAMIZADOR', async () => {
        const projects = await service.consultarTodos(dinamizadorUser);
        expect(projects.length).toBe(1);
    });

    it('should return only associated projects for other roles (e.g., INVESTIGADOR)', async () => {
        const projects = await service.consultarTodos(otroUser);
        expect(projects.length).toBe(1); // This user is an apprentice on the project
    });

    it('should return an empty array for a user with no associated projects', async () => {
        const userSinProyectos = { roles: [UserRole.INVESTIGADOR], aprendizId: new Types.ObjectId() };
        const projects = await service.consultarTodos(userSinProyectos);
        expect(projects.length).toBe(0);
    });
  });

  describe('consultarPorId', () => {
    it('should return a project if user has permission', async () => {
        const project = await service.consultarPorId(createdProjectoId, liderDeProyectoUser);
        expect(project).toBeDefined();
        expect(project.tituloDeProyecto).toBe('Proyecto Base para Pruebas');
    });

    it('should throw ForbiddenException if user does not have permission', async () => {
        const userSinPermiso = { roles: [UserRole.INVESTIGADOR], aprendizId: new Types.ObjectId() };
        await expect(service.consultarPorId(createdProjectoId, userSinPermiso)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for a non-existent project', async () => {
        const nonExistentId = new Types.ObjectId().toHexString();
        await expect(service.consultarPorId(nonExistentId, liderDeProyectoUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('should update a project successfully', async () => {
        const updateDto: Partial<ProjectoDto> = { resumen: 'Resumen actualizado' };
        const updatedProject = await service.actualizar(createdProjectoId, updateDto, liderDeProyectoUser);
        expect(updatedProject.data.resumen).toBe('Resumen actualizado');
    });

    it('should throw ForbiddenException when trying to update without permission', async () => {
        const updateDto: Partial<ProjectoDto> = { resumen: 'Intento de actualización no autorizado' };
        const userSinPermiso = { roles: [UserRole.INVESTIGADOR], aprendizId: new Types.ObjectId() };
        await expect(service.actualizar(createdProjectoId, updateDto, userSinPermiso)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('eliminar', () => {
    it('should be deleted by LIDER_DE_PROYECTO', async () => {
        const result = await service.eliminar(createdProjectoId, liderDeProyectoUser);
        expect(result).toBeDefined();

        // Verify it's actually gone
        await expect(service.consultarPorId(createdProjectoId, liderDeProyectoUser)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not LIDER_DE_PROYECTO', async () => {
        await expect(service.eliminar(createdProjectoId, dinamizadorUser)).rejects.toThrow(ForbiddenException);
        await expect(service.eliminar(createdProjectoId, otroUser)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if project does not exist', async () => {
        const nonExistentId = new Types.ObjectId().toHexString();
        await expect(service.eliminar(nonExistentId, liderDeProyectoUser)).rejects.toThrow(NotFoundException);
    });
  });
});
