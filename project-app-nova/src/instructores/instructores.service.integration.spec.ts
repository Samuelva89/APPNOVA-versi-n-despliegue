
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
        nombreInstructor: 'John Doe',
        email: 'john.doe@example.com',
        documentoIdentidad: 123456789,
        numeroDeContacto: 1234567890,
      };

      const result = await service.crear(instructorDto);
      const createdInstructor = result.data;

      expect(createdInstructor).toBeDefined();
      expect(createdInstructor.nombreInstructor).toEqual(instructorDto.nombreInstructor);
      expect(createdInstructor.email).toEqual(instructorDto.email);
    });

    it('should throw ConflictException if documentoIdentidad already exists', async () => {
      const instructorDto1: instructoresDto = {
        nombreInstructor: 'Jane Doe',
        email: 'jane.doe@example.com',
        documentoIdentidad: 987654321,
        numeroDeContacto: 9876543210,
      };
      await service.crear(instructorDto1);

      const instructorDto2: instructoresDto = {
        nombreInstructor: 'Jim Doe',
        email: 'jim.doe@example.com',
        documentoIdentidad: 987654321, // Duplicate documentoIdentidad
        numeroDeContacto: 1122334455,
      };

      await expect(service.crear(instructorDto2)).rejects.toThrow(ConflictException);
    });

     it('should throw ConflictException if email already exists', async () => {
      const instructorDto1: instructoresDto = {
        nombreInstructor: 'Jane Doe',
        email: 'duplicate.email@example.com',
        documentoIdentidad: 111222333,
        numeroDeContacto: 9876543210,
      };
      await service.crear(instructorDto1);

      const instructorDto2: instructoresDto = {
        nombreInstructor: 'Jim Doe',
        email: 'duplicate.email@example.com', // Duplicate email
        documentoIdentidad: 444555666,
        numeroDeContacto: 1122334455,
      };

      await expect(service.crear(instructorDto2)).rejects.toThrow(ConflictException);
    });
  });

  describe('consultarTodos', () => {
    it('should return all instructors', async () => {
      await service.crear({
        nombreInstructor: 'Instructor A',
        email: 'a@a.com',
        documentoIdentidad: 1,
        numeroDeContacto: 123,
      });
      await service.crear({
        nombreInstructor: 'Instructor B',
        email: 'b@b.com',
        documentoIdentidad: 2,
        numeroDeContacto: 456,
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
