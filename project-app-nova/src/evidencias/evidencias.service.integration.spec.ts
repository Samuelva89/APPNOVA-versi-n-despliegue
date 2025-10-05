import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciasService } from './evidencias.service';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { EvidenciaSchema } from './dto/evidencias.model';
import { CreateEvidenciaDto } from './dto/evidencias.dto';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { UserSchema } from '../user/dto/user.model';
import { ProjectoSchema } from '../projecto/dto/projecto.model';

describe('EvidenciasService (Integration)', () => {
  let service: EvidenciasService;
  let mongoUri: string;
  let connection: Connection;

  // Mock data for relationships
  const mockProjectId = new Types.ObjectId();
  const mockUserId = new Types.ObjectId().toHexString();

  // Mock file object from Multer
  const mockFile: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'test.pdf',
    encoding: '7bit',
    mimetype: 'application/pdf',
    size: 1024,
    destination: './uploads',
    filename: 'test-file-name.pdf',
    path: 'uploads/test-file-name.pdf',
    buffer: Buffer.from('test data'),
    stream: null,
  };

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
          { name: 'Evidencia', schema: EvidenciaSchema },
          { name: 'User', schema: UserSchema },
          { name: 'Projecto', schema: ProjectoSchema },
        ]),
      ],
      providers: [EvidenciasService],
    }).compile();

    service = module.get<EvidenciasService>(EvidenciasService);
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
    it('should create a new evidencia successfully', async () => {
      const evidenciaDto: CreateEvidenciaDto = {
        nombre: 'Evidencia de Prueba',
        descripcion: 'Descripción de prueba',
        proyectoId: mockProjectId.toHexString(),
      };

      const createdEvidencia = await service.crear(evidenciaDto, mockFile, mockUserId);

      expect(createdEvidencia).toBeDefined();
      expect(createdEvidencia.nombre).toEqual(evidenciaDto.nombre);
      expect(createdEvidencia.path).toEqual(mockFile.path);
      expect(createdEvidencia.user.toString()).toEqual(mockUserId);
    });

    it('should throw BadRequestException if file is not provided', async () => {
      const evidenciaDto: CreateEvidenciaDto = {
        nombre: 'Evidencia sin archivo',
        descripcion: '',
        proyectoId: mockProjectId.toHexString(),
      };

      await expect(service.crear(evidenciaDto, null, mockUserId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('consultarTodos', () => {
    it('should return all evidencias', async () => {
      const dto: CreateEvidenciaDto = { nombre: 'Evidencia 1', descripcion: '', proyectoId: mockProjectId.toHexString() };
      await service.crear(dto, mockFile, mockUserId);

      const evidencias = await service.consultarTodos();
      expect(evidencias).toBeDefined();
      expect(evidencias.length).toBe(1);
      expect(evidencias[0].nombre).toBe('Evidencia 1');
    });
  });

  describe('consultarPorId', () => {
    it('should return a single evidencia', async () => {
        const dto: CreateEvidenciaDto = { nombre: 'Evidencia para buscar', descripcion: '', proyectoId: mockProjectId.toHexString() };
        const created = await service.crear(dto, mockFile, mockUserId);

        const found = await service.consultarPorId(created._id);
        expect(found).toBeDefined();
        expect(found.nombre).toBe(dto.nombre);
    });

    it('should throw NotFoundException for a non-existent ID', async () => {
        const nonExistentId = new Types.ObjectId().toHexString();
        await expect(service.consultarPorId(nonExistentId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminar', () => {
    it('should delete an evidencia', async () => {
        const dto: CreateEvidenciaDto = { nombre: 'Evidencia a eliminar', descripcion: '', proyectoId: mockProjectId.toHexString() };
        const created = await service.crear(dto, mockFile, mockUserId);

        await service.eliminar(created._id);

        await expect(service.consultarPorId(created._id)).rejects.toThrow(NotFoundException);
    });
  });
});