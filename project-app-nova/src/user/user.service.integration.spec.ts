import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/user.model';
import { UserDto } from './dto/user.dto';
import { UserRole } from '../common/constants/roles.enum';
import { startMongo, stopMongo, clearCollections } from '../../test/utils/mongodb-memory-server';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Connection } from 'mongoose';

describe('UserService (Integration)', () => {
  let service: UserService;
  let mongoUri: string;
  let connection: Connection;

  beforeAll(async () => {
    mongoUri = await startMongo();
  });

  afterEach(async () => {
    await clearCollections(connection);
  });

  afterAll(async () => {
    await stopMongo(connection);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    connection = module.get<Connection>('DatabaseConnection'); // This line is problematic, will be fixed in next step

    // Clear collections before each test
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
    it('should create a new user successfully', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };

      const createdUser = await service.crear(userDto);

      expect(createdUser).toBeDefined();
      expect(createdUser.nombreCompleto).toEqual(userDto.nombreCompleto);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.roles).toEqual(userDto.roles);
      expect(createdUser.password).toBeDefined(); // Password should be hashed

      const foundUser = await service.findOneByEmail(userDto.email);
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toEqual(userDto.email);
    });

    it('should create a user with optional IDs', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'User with IDs',
        email: 'user.ids@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
        instructorId: '60d5ec49f8c7a40015a7b0a1',
        aprendizId: '60d5ec49f8c7a40015a7b0a2',
        semilleroId: '60d5ec49f8c7a40015a7b0a3',
      };

      const createdUser = await service.crear(userDto);

      expect(createdUser).toBeDefined();
      expect(createdUser.instructorId?.toString()).toEqual(userDto.instructorId);
      expect(createdUser.aprendizId?.toString()).toEqual(userDto.aprendizId);
      expect(createdUser.semilleroId?.toString()).toEqual(userDto.semilleroId);
    });

    it('should throw ConflictException if email already exists', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };
      await service.crear(userDto);

      const duplicateUserDto: UserDto = {
        nombreCompleto: 'Duplicate User',
        email: 'existing@example.com',
        password: 'anotherpassword',
        roles: [UserRole.INVESTIGADOR],
      };

      await expect(service.crear(duplicateUserDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Find Me',
        email: 'findme@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };
      await service.crear(userDto);

      const foundUser = await service.findOneByEmail(userDto.email);
      expect(foundUser).toBeDefined();
      expect(foundUser?.email).toEqual(userDto.email);
    });

    it('should return null if user not found by email', async () => {
      const foundUser = await service.findOneByEmail('nonexistent@example.com');
      expect(foundUser).toBeNull();
    });
  });

  describe('consultarTodos', () => {
    it('should return all users', async () => {
      await service.crear({
        nombreCompleto: 'User 1',
        email: 'user1@example.com',
        password: 'pass1',
        roles: [UserRole.INVESTIGADOR],
      });
      await service.crear({
        nombreCompleto: 'User 2',
        email: 'user2@example.com',
        password: 'pass2',
        roles: [UserRole.INVESTIGADOR],
      });

      const users = await service.consultarTodos();
      expect(users).toBeDefined();
      expect(users.length).toBe(2);
      expect(users[0].email).toEqual('user1@example.com');
      expect(users[1].email).toEqual('user2@example.com');
    });

    it('should return an empty array if no users exist', async () => {
      const users = await service.consultarTodos();
      expect(users).toBeDefined();
      expect(users.length).toBe(0);
    });
  });

  describe('consultarPorId', () => {
    it('should find a user by ID', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'User By ID',
        email: 'userbyid@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };
      const createdUser = await service.crear(userDto);

      const foundUser = await service.consultarPorId(createdUser._id);
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toEqual(userDto.email);
    });

    it('should throw NotFoundException if user not found by ID', async () => {
      const nonExistentId = '60d5ec49f8c7a40015a7b0a0'; // A valid-looking but non-existent ID
      await expect(service.consultarPorId(nonExistentId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('actualizar', () => {
    it('should update a user successfully', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Original Name',
        email: 'original@example.com',
        password: 'oldpassword',
        roles: [UserRole.INVESTIGADOR],
      };
      const createdUser = await service.crear(userDto);

      const updateDto: Partial<UserDto> = {
        nombreCompleto: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedUser = await service.actualizar(createdUser._id, updateDto);

      expect(updatedUser).toBeDefined();
      expect(updatedUser.nombreCompleto).toEqual(updateDto.nombreCompleto);
      expect(updatedUser.email).toEqual(updateDto.email);
      expect(updatedUser._id.toString()).toEqual(createdUser._id.toString());
    });

    it('should update user password successfully', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Password User',
        email: 'password@example.com',
        password: 'oldpassword',
        roles: [UserRole.INVESTIGADOR],
      };
      const createdUser = await service.crear(userDto);

      const updateDto: Partial<UserDto> = {
        password: 'newpassword',
      };

      const updatedUser = await service.actualizar(createdUser._id, updateDto);

      expect(updatedUser).toBeDefined();
      expect(await bcrypt.compare('newpassword', updatedUser.password)).toBe(true);
      expect(await bcrypt.compare('oldpassword', updatedUser.password)).toBe(false);
    });

    it('should throw NotFoundException if user to update not found', async () => {
      const nonExistentId = '60d5ec49f8c7a40015a7b0a0';
      const updateDto: Partial<UserDto> = { nombreCompleto: 'Non Existent' };
      await expect(service.actualizar(nonExistentId, updateDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('eliminar', () => {
    it('should delete a user successfully', async () => {
      const userDto: UserDto = {
        nombreCompleto: 'Delete Me',
        email: 'delete@example.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };
      const createdUser = await service.crear(userDto);

      const deletedUser = await service.eliminar(createdUser._id);
      expect(deletedUser).toBeDefined();
      expect(deletedUser?.email).toEqual(userDto.email);

      await expect(service.consultarPorId(createdUser._id)).rejects.toThrow(NotFoundException); // Corrected assertion
    });

    it('should return null if user to delete not found', async () => {
      const nonExistentId = '60d5ec49f8c7a40015a7b0a0';
      const deletedUser = await service.eliminar(nonExistentId);
      expect(deletedUser).toBeNull();
    });
  });
});