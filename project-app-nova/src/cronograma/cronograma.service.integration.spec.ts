
import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaService } from './cronograma.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { CronogramaSchema } from './dto/cronograma.model';
import { CronogramaDto } from './dto/cronograma.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { NotFoundException } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { ProjectoSchema } from '../projecto/dto/projecto.model';
import { ProjectoDto, ProjectoEstado } from '../projecto/dto/projecto.dto';

describe('CronogramaService (Integration)', () => {
  let service: CronogramaService;
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
          { name: 'cronograma', schema: CronogramaSchema },
          { name: 'Projecto', schema: ProjectoSchema },
        ]),
      ],
      providers: [CronogramaService],
    }).compile();

    service = module.get<CronogramaService>(CronogramaService);
    connection = module.get(getConnectionToken());

    // Clear collections before each test
    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    // Create a dummy project to link cronogramas to
    const projectoModel = connection.model('Projecto');
    const projecto = await projectoModel.create({
      tituloDeProyecto: 'Proyecto para Cronograma',
      fechaInicio: new Date(),
      fechaFin: new Date(),
      regional: 'Regional Test',
      municipio: 'Municipio Test',
      centroDeFormacion: 'Centro Test',
      programaDeFormacion: 'Programa Test',
      nombreDelSemilleroDeInvestigacion: 'Semillero Test',
      lineaDeInvestigacionAsociada: 'Linea Test',
      resumen: 'Resumen Test',
      palabrasClave: 'test',
      justificacion: 'Justificacion Test',
      planteamientoDelProblema: 'Problema Test',
      objetivoGeneral: 'Objetivo General Test',
      objetivoEspecifico: ['Objetivo Específico Test'],
      beneficiarios: 'Beneficiarios Test',
      metodologia: 'Metodologia Test',
      impactosEconomicoSocialAmbientalEsperados: 'Impacto Test',
      resultadosEsperados: 'Resultados Test',
      estado: ProjectoEstado.EN_DESARROLLO,
    });
    projectoId = projecto._id;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crear', () => {
    it('should create a new cronograma successfully', async () => {
      const cronogramaDto: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro de Formación Test',
        objetivosEspecificos: ['Objetivo 1', 'Objetivo 2'],
        actividades: ['Actividad 1', 'Actividad 2'],
        entregables: 'Entregable Test',
        observaciones: 'Observación Test',
        year: '2024',
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-12-31'),
      };

      const createdCronograma = await service.crear(cronogramaDto);

      expect(createdCronograma).toBeDefined();
      expect(createdCronograma.proyecto.toString()).toEqual(projectoId.toString());
      expect(createdCronograma.centroDeFormacion).toEqual(cronogramaDto.centroDeFormacion);
      expect(createdCronograma.actividades).toEqual(expect.arrayContaining(cronogramaDto.actividades));
    });
  });

  describe('consultarTodos', () => {
    it('should return all cronogramas', async () => {
      const cronogramaDto1: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro A',
        objetivosEspecificos: [],
        actividades: ['Actividad A'],
        entregables: 'Entregable A',
        observaciones: '',
        year: '2024',
        fechaInicio: new Date('2024-01-01'),
        fechaFin: new Date('2024-01-31'),
      };
       await service.crear(cronogramaDto1);

      const cronogramaDto2: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro B',
        objetivosEspecificos: [],
        actividades: ['Actividad B'],
        entregables: 'Entregable B',
        observaciones: '',
        year: '2024',
        fechaInicio: new Date('2024-02-01'),
        fechaFin: new Date('2024-02-28'),
      };
       await service.crear(cronogramaDto2);

      const cronogramas = await service.consultarTodos();
      expect(cronogramas).toBeDefined();
      expect(cronogramas.length).toBe(2);
      expect(cronogramas[0].centroDeFormacion).toEqual('Centro A');
      expect(cronogramas[1].centroDeFormacion).toEqual('Centro B');
    });
  });

  describe('consultarPorId', () => {
    it('should find a cronograma by ID', async () => {
      const cronogramaDto: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro para ID',
        objetivosEspecificos: [],
        actividades: ['Actividad por ID'],
        entregables: 'Entregable por ID',
        observaciones: '',
        year: '2024',
        fechaInicio: new Date('2024-03-01'),
        fechaFin: new Date('2024-03-31'),
      };
      const createdCronograma = await service.crear(cronogramaDto);

      const foundCronograma = await service.consultarPorId(createdCronograma._id);
      expect(foundCronograma).toBeDefined();
      expect(foundCronograma.centroDeFormacion).toEqual(cronogramaDto.centroDeFormacion);
    });

    it('should throw NotFoundException if cronograma not found by ID', async () => {
      const nonExistentId = new Types.ObjectId().toHexString();
      await expect(service.consultarPorId(nonExistentId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('should update a cronograma successfully', async () => {
      const cronogramaDto: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro Original',
        objetivosEspecificos: [],
        actividades: ['Actividad Original'],
        entregables: 'Entregable Original',
        observaciones: '',
        year: '2024',
        fechaInicio: new Date('2024-04-01'),
        fechaFin: new Date('2024-04-30'),
      };
      const createdCronograma = await service.crear(cronogramaDto);

      const updateDto: Partial<CronogramaDto> = {
        centroDeFormacion: 'Centro Actualizado',
        entregables: 'Entregable Actualizado',
      };

      const updatedCronograma = await service.actualizar(createdCronograma._id, updateDto);

      expect(updatedCronograma).toBeDefined();
      expect(updatedCronograma.centroDeFormacion).toEqual(updateDto.centroDeFormacion);
      expect(updatedCronograma.entregables).toEqual(updateDto.entregables);
    });

    it('should throw NotFoundException if cronograma to update not found', async () => {
      const nonExistentId = new Types.ObjectId().toHexString();
      const updateDto: Partial<CronogramaDto> = { centroDeFormacion: 'No Existe' };
      await expect(service.actualizar(nonExistentId, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminar', () => {
    it('should delete a cronograma successfully', async () => {
      const cronogramaDto: CronogramaDto = {
        proyecto: projectoId,
        centroDeFormacion: 'Centro a Eliminar',
        objetivosEspecificos: [],
        actividades: ['Actividad a Eliminar'],
        entregables: 'Entregable a Eliminar',
        observaciones: '',
        year: '2024',
        fechaInicio: new Date('2024-05-01'),
        fechaFin: new Date('2024-05-31'),
      };
      const createdCronograma = await service.crear(cronogramaDto);

      const deletedCronograma = await service.eliminar(createdCronograma._id);
      expect(deletedCronograma).toBeDefined();
      expect(deletedCronograma?.centroDeFormacion).toEqual(cronogramaDto.centroDeFormacion);

      await expect(service.consultarPorId(createdCronograma._id)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if cronograma to delete not found', async () => {
      const nonExistentId = new Types.ObjectId().toHexString();
      await expect(service.eliminar(nonExistentId)).rejects.toThrow(NotFoundException);
    });
  });
});
