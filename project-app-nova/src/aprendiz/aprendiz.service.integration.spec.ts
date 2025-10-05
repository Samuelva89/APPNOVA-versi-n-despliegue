import { Test, TestingModule } from '@nestjs/testing';
import { AprendizService } from './aprendiz.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { AprendizSchema } from './dto/aprendiz.model';
import { AprendizDto } from './dto/aprendiz.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { ProjectoSchema } from '../projecto/dto/projecto.model';
import { ProjectoEstado } from '../projecto/dto/projecto.dto';

describe('AprendizService (Integration)', () => {
  let service: AprendizService;
  let mongoUri: string;
  let connection: Connection;
  let projectoId: Types.ObjectId;

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
          { name: 'Aprendiz', schema: AprendizSchema },
          { name: 'Projecto', schema: ProjectoSchema },
        ]),
      ],
      providers: [AprendizService],
    }).compile();

    service = module.get<AprendizService>(AprendizService);
    connection = module.get(getConnectionToken());

    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    // Create a dummy project to get a valid ID
    const projectoModel = connection.model('Projecto');
    const projecto = await projectoModel.create({
      tituloDeProyecto: 'Proyecto para Aprendiz',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      regional: 'Test',
      municipio: 'Test',
      centroDeFormacion: 'Test',
      programaDeFormacion: 'Test',
      nombreDelSemilleroDeInvestigacion: 'Test',
      lineaDeInvestigacionAsociada: 'Test',
      resumen: 'Test',
      palabrasClave: 'Test',
      justificacion: 'Test',
      planteamientoDelProblema: 'Test',
      objetivoGeneral: 'Test',
      objetivoEspecifico: ['Test'],
      beneficiarios: 'Test',
      metodologia: 'Test',
      impactosEconomicoSocialAmbientalEsperados: 'Test',
      resultadosEsperados: 'Test',
      estado: ProjectoEstado.EN_DESARROLLO,
    });
    projectoId = projecto._id;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crear', () => {
    it('should create a new aprendiz successfully', async () => {
      const aprendizDto: AprendizDto = {
        nombreCompleto: 'Juan Perez',
        documentoIdentidad: 123456789,
        numeroDeFicha: 12345,
        numeroDeContacto: 3001234567,
        correoElectronico: 'juan.perez@example.com',
        fechaDeInicio: new Date('2023-01-01'),
        fechaEnQueFinaliza: new Date('2024-01-01'),
        proyectoAsignado: projectoId,
      };

      const createdAprendiz = await service.crear(aprendizDto);

      expect(createdAprendiz).toBeDefined();
      expect(createdAprendiz.nombreCompleto).toEqual(
        aprendizDto.nombreCompleto,
      );
      expect(createdAprendiz.proyectoAsignado.toString()).toEqual(
        projectoId.toString(),
      );
    });

    it('should throw ConflictException if documentoIdentidad already exists', async () => {
      await service.crear({
        nombreCompleto: 'Aprendiz 1',
        documentoIdentidad: 111111111,
        numeroDeFicha: 10001,
        numeroDeContacto: 3101111111,
        correoElectronico: 'aprendiz1@example.com',
        fechaDeInicio: new Date(),
        fechaEnQueFinaliza: new Date(),
        proyectoAsignado: projectoId,
      });

      const aprendizDto2: AprendizDto = {
        nombreCompleto: 'Aprendiz 2',
        documentoIdentidad: 111111111, // Duplicate ID
        numeroDeFicha: 10002,
        numeroDeContacto: 3102222222,
        correoElectronico: 'aprendiz2@example.com',
        fechaDeInicio: new Date(),
        fechaEnQueFinaliza: new Date(),
        proyectoAsignado: projectoId,
      };

      await expect(service.crear(aprendizDto2)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  // ... (Keep other tests like consultarTodos, consultarPorId, etc., but ensure they use valid data)

  describe('consultarTodos', () => {
    it('should return all apprentices', async () => {
      await service.crear({
        nombreCompleto: 'Aprendiz 5',
        documentoIdentidad: 555555555,
        numeroDeFicha: 10005,
        numeroDeContacto: 3105555555,
        correoElectronico: 'aprendiz5@example.com',
        fechaDeInicio: new Date(),
        fechaEnQueFinaliza: new Date(),
        proyectoAsignado: projectoId,
      });
      const apprentices = await service.consultarTodos();
      expect(apprentices).toBeDefined();
      expect(apprentices.length).toBe(1);
    });
  });
});
