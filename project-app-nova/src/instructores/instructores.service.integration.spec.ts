
import { Test, TestingModule } from '@nestjs/testing';
import { InstructoresService } from './instructores.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { InstructoresSchema } from './dto/instructores.model';
import { instructoresDto } from './dto/instructores.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { ConflictException } from '@nestjs/common';
import { Connection } from 'mongoose';

describe('InstructoresService (Integration)', () => {
  let service: InstructoresService;
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
        MongooseModule.forFeature([{ name: 'Instructores', schema: InstructoresSchema }]),
      ],
      providers: [InstructoresService],
    }).compile();

    service = module.get<InstructoresService>(InstructoresService);
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
    it('should create a new instructor successfully', async () => {
      const instructorDto: instructoresDto = {
        Nombre_Instructor: 'John Doe',
        Email: 'john.doe@example.com',
        Documento_Identidad: 123456789,
        Numero_de_contacto: 1234567890,
      };

      const createdInstructor = await service.crear(instructorDto);

      expect(createdInstructor).toBeDefined();
      expect(createdInstructor.Nombre_Instructor).toEqual(instructorDto.Nombre_Instructor);
      expect(createdInstructor.Email).toEqual(instructorDto.Email);
    });

    it('should throw ConflictException if Documento_Identidad already exists', async () => {
      const instructorDto1: instructoresDto = {
        Nombre_Instructor: 'Jane Doe',
        Email: 'jane.doe@example.com',
        Documento_Identidad: 987654321,
        Numero_de_contacto: 9876543210,
      };
      await service.crear(instructorDto1);

      const instructorDto2: instructoresDto = {
        Nombre_Instructor: 'Jim Doe',
        Email: 'jim.doe@example.com',
        Documento_Identidad: 987654321, // Duplicate Documento_Identidad
        Numero_de_contacto: 1122334455,
      };

      await expect(service.crear(instructorDto2)).rejects.toThrow(ConflictException);
    });

     it('should throw ConflictException if Email already exists', async () => {
      const instructorDto1: instructoresDto = {
        Nombre_Instructor: 'Jane Doe',
        Email: 'duplicate.email@example.com',
        Documento_Identidad: 111222333,
        Numero_de_contacto: 9876543210,
      };
      await service.crear(instructorDto1);

      const instructorDto2: instructoresDto = {
        Nombre_Instructor: 'Jim Doe',
        Email: 'duplicate.email@example.com', // Duplicate Email
        Documento_Identidad: 444555666,
        Numero_de_contacto: 1122334455,
      };

      await expect(service.crear(instructorDto2)).rejects.toThrow(ConflictException);
    });
  });

  describe('consultarTodos', () => {
    it('should return all instructors', async () => {
      await service.crear({
        Nombre_Instructor: 'Instructor A',
        Email: 'a@a.com',
        Documento_Identidad: 1,
        Numero_de_contacto: 123,
      });
      await service.crear({
        Nombre_Instructor: 'Instructor B',
        Email: 'b@b.com',
        Documento_Identidad: 2,
        Numero_de_contacto: 456,
      });

      const instructors = await service.consultarTodos();
      expect(instructors).toBeDefined();
      expect(instructors.length).toBe(2);
    });

    it('should return an empty array if no instructors exist', async () => {
      const instructors = await service.consultarTodos();
      expect(instructors).toBeDefined();
      expect(instructors.length).toBe(0);
    });
  });
});
