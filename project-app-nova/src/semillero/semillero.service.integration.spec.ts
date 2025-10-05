
import { Test, TestingModule } from '@nestjs/testing';
import { SemilleroService } from './semillero.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { SemilleroSchema } from './dto/semillero.model';
import { SemilleroDTO } from './dto/semilleros.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { ConflictException } from '@nestjs/common';
import { Connection } from 'mongoose';

describe('SemilleroService (Integration)', () => {
  let service: SemilleroService;
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
        MongooseModule.forFeature([{ name: 'Semillero', schema: SemilleroSchema }]),
      ],
      providers: [SemilleroService],
    }).compile();

    service = module.get<SemilleroService>(SemilleroService);
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

  describe('crear', () => {
    it('should create a new semillero successfully', async () => {
      const semilleroDto: SemilleroDTO = {
        Nombre_Semillero: 'Semillero de Prueba',
      };

      const createdSemillero = await service.crear(semilleroDto);

      expect(createdSemillero).toBeDefined();
      expect(createdSemillero.Nombre_Semillero).toEqual(semilleroDto.Nombre_Semillero);
    });

    it('should throw ConflictException if semillero name already exists', async () => {
      const semilleroDto1: SemilleroDTO = {
        Nombre_Semillero: 'Semillero Duplicado',
      };
      await service.crear(semilleroDto1);

      const semilleroDto2: SemilleroDTO = {
        Nombre_Semillero: 'Semillero Duplicado',
      };

      await expect(service.crear(semilleroDto2)).rejects.toThrow(ConflictException);
    });
  });

  describe('ConsultarTodos', () => {
    it('should return all semilleros', async () => {
        await service.crear({ Nombre_Semillero: 'Semillero A' });
        await service.crear({ Nombre_Semillero: 'Semillero B' });

      const semilleros = await service.ConsultarTodos();
      expect(semilleros).toBeDefined();
      expect(semilleros.length).toBe(2);
    });

    it('should return an empty array if no semilleros exist', async () => {
      const semilleros = await service.ConsultarTodos();
      expect(semilleros).toBeDefined();
      expect(semilleros.length).toBe(0);
    });
  });
});
