
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { UserSchema } from '../user/dto/user.model';
import { RegisterAuthDto } from './dto/auth.dto';
import { UserRole } from '../common/constants/roles.enum';
import { startMongo, stopMongo } from '../../test/utils/mongodb-memory-server';
import * as bcrypt from 'bcrypt';
import { Connection } from 'mongoose';

describe('AuthService (Integration)', () => {
  let authService: AuthService;
  let userService: UserService;
  let connection: Connection;
  let mongoUri: string;

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
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        JwtModule.register({
          secret: 'test-secret-key',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    connection = module.get(getConnectionToken());

    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and save it to the database', async () => {
      const registerDto: RegisterAuthDto = {
        nombreCompleto: 'Integration Test User',
        email: 'integration@test.com',
        password: 'password123',
        roles: [UserRole.INVESTIGADOR],
      };

      const registeredUser = await authService.register(registerDto);

      expect(registeredUser).toBeDefined();
      expect(registeredUser.email).toEqual(registerDto.email);

      // Verify the user exists in the database
      const dbUser = await userService.findOneByEmail('integration@test.com');
      expect(dbUser).toBeDefined();
      expect(dbUser.nombreCompleto).toEqual(registerDto.nombreCompleto);

      // Verify the password was hashed
      const isPasswordMatching = await bcrypt.compare('password123', dbUser.password);
      expect(isPasswordMatching).toBe(true);
    });
  });

  describe('validateUser', () => {
    beforeEach(async () => {
      // Create a user directly in the DB for validation tests
      const userDto = {
        nombreCompleto: 'Validate Me',
        email: 'validate@test.com',
        password: 'correct-password',
        roles: [UserRole.INVESTIGADOR],
      };
      await userService.crear(userDto);
    });

    it('should validate a user with correct credentials', async () => {
      const user = await authService.validateUser('validate@test.com', 'correct-password');
      expect(user).toBeDefined();
      expect(user.email).toEqual('validate@test.com');
      expect(user.password).toBeUndefined(); // Password should be removed
    });

    it('should return null for an invalid password', async () => {
      const user = await authService.validateUser('validate@test.com', 'wrong-password');
      expect(user).toBeNull();
    });

    it('should return null if user does not exist', async () => {
      const user = await authService.validateUser('nonexistent@test.com', 'any-password');
      expect(user).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access_token for a valid user', async () => {
        const userPayload = {
            _id: 'some-id',
            email: 'login@test.com',
            roles: [UserRole.DINAMIZADOR]
        };
        const result = await authService.login(userPayload);
        expect(result).toHaveProperty('access_token');
        expect(typeof result.access_token).toBe('string');
    });
  });

});
