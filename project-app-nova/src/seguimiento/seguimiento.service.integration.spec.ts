import { Test, TestingModule } from '@nestjs/testing';
import { SeguimientoService } from './seguimiento.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { SeguimientoSchema } from './dto/seguimiento.model';
import { ObservacionSegDto } from './dto/seguimiento.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { Connection } from 'mongoose';

describe('SeguimientoService (Integration)', () => {
  let service: SeguimientoService;
  let mongoUri: string;
  let connection: Connection;

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
        MongooseModule.forFeature([{ name: 'Seguimiento', schema: SeguimientoSchema }]),
      ],
      providers: [SeguimientoService],
    }).compile();

    service = module.get<SeguimientoService>(SeguimientoService);
    connection = module.get(getConnectionToken());

    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Helper function to create a valid DTO
  const createValidDto = (overrides: Partial<ObservacionSegDto> = {}): ObservacionSegDto => {
    return {
      numeroActa: '001',
      nombreDelComiteDeLaReunion: 'Comité de Prueba',
      ciudad: 'Ciudad de Prueba',
      fechaObservacion: new Date(),
      horaInicio: '10:00',
      horaFin: '11:00',
      lugarYEnlace: 'Sala 1 / meet.google.com',
      agendaOpuestosParaDesarrollar: 'Agenda de prueba',
      objetivoDeLaReunion: 'Objetivo de prueba',
      desarrolloDeLaReunion: 'Desarrollo de prueba',
      contextualizacionYAvanceDelProyecto: 'Avance de prueba',
      limitantesDelProyecto: 'Limitantes de prueba',
      evaluacionDelImpactoYParticipacionDeAprendices: 'Evaluación de prueba',
      presentacionDeResultadosEnEventosAcademicos: 'Presentación de prueba',
      definicionDeDecisionesYAccionesASeguir: 'Decisiones de prueba',
      conclusiones: 'Conclusiones de prueba',
      actividadDecision: 'Actividad de prueba',
      fecha: new Date(),
      responsables: 'Responsable de prueba',
      firmasOParticipacionVirtual: [],
      asistentesYAprobacionDeDecisiones: 'Asistentes de prueba',
      nombres: 'Nombres de prueba',
      dependenciaEmpresa: 'Dependencia de prueba',
      apruebaSiNo: 'Si',
      observacion: 'Observación de prueba',
      ...overrides,
    };
  };

  describe('crear', () => {
    it('should create a new observacion successfully', async () => {
      const observacionDto = createValidDto();
      const createdObservacion = await service.crear(observacionDto);

      expect(createdObservacion).toBeDefined();
      expect(createdObservacion.numeroActa).toEqual(observacionDto.numeroActa);
    });
  });

  describe('consultarTodos', () => {
    it('should return all observaciones', async () => {
        await service.crear(createValidDto({ numeroActa: '001' }));
        await service.crear(createValidDto({ numeroActa: '002' }));

      const observaciones = await service.consultarTodos();
      expect(observaciones).toBeDefined();
      expect(observaciones.length).toBe(2);
    });

    it('should return an empty array if no observaciones exist', async () => {
      const observaciones = await service.consultarTodos();
      expect(observaciones).toBeDefined();
      expect(observaciones.length).toBe(0);
    });
  });
});