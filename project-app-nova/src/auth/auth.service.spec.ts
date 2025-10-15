import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/auth.dto';
import { UserRole } from '../common/constants/roles.enum';

// Mock de UserService
const mockUserService = {
  crear: jest.fn((dto) => ({
    message: 'Usuario creado con éxito.',
    data: {
      _id: 'someUserId',
      nombreCompleto: dto.nombreCompleto,
      email: dto.email,
      roles: dto.roles,
      instructorId: dto.instructorId || undefined,
      aprendizId: dto.aprendizId || undefined,
      semilleroId: dto.semilleroId || undefined,
      // La contraseña no debería estar en el 'data' del retorno de crear,
      // ya que el servicio la elimina antes de devolverla.
    },
  })),
  findOneByEmail: jest.fn((email) => {
    if (email === 'test@example.com') {
      return {
        _id: 'someUserId',
        nombreCompleto: 'Test User',
        email: 'test@example.com',
        password: 'password',
        roles: [UserRole.INVESTIGADOR],
        toObject: () => ({
          _id: 'someUserId',
          nombreCompleto: 'Test User',
          email: 'test@example.com',
          password: 'password',
          roles: [UserRole.INVESTIGADOR],
        }),
      };
    }
    return null;
  }),
};

// Mock de JwtService
const mockJwtService = {
  sign: jest.fn(() => 'mockedJwtToken'),
};

// Mock de bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
  compare: jest.fn((password, hashedPassword) => password === 'password' && hashedPassword === 'password'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Pruebas para validateUser ---
  it('should validate a user with correct credentials', async () => {
    const user = await service.validateUser('test@example.com', 'password');
    expect(userService.findOneByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'password');
    expect(user).toBeDefined();
    expect(user.email).toEqual('test@example.com');
    expect(user.password).toBeUndefined(); // La contraseña debe ser eliminada
  });

  it('should return null for an invalid password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false); // Simular contraseña incorrecta
    const user = await service.validateUser('test@example.com', 'wrongpassword');
    expect(userService.findOneByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'password');
    expect(user).toBeNull();
  });

  it('should return null if user is not found', async () => {
    (mockUserService.findOneByEmail as jest.Mock).mockResolvedValueOnce(null); // Simular usuario no encontrado
    const user = await service.validateUser('nonexistent@example.com', 'password');
    expect(userService.findOneByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    expect(bcrypt.compare).not.toHaveBeenCalled(); // No se debe llamar a compare si el usuario no existe
    expect(user).toBeNull();
  });

  // --- Pruebas para login ---
  it('should return an access token on successful login', async () => {
    const user = {
      _id: 'someUserId',
      email: 'test@example.com',
      roles: [UserRole.INVESTIGADOR],
      instructorId: 'someInstructorId',
      aprendizId: 'someAprendizId',
      semilleroId: 'someSemilleroId',
    };
    const result = await service.login(user);

    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'someUserId',
      email: 'test@example.com',
      roles: [UserRole.INVESTIGADOR],
      instructorId: 'someInstructorId',
      aprendizId: 'someAprendizId',
    });    expect(result).toEqual({ access_token: 'mockedJwtToken' });
  });

  it('should return an access token on successful login without optional IDs', async () => {
    const user = {
      _id: 'someUserId',
      email: 'test@example.com',
      roles: [UserRole.INVESTIGADOR],
    };
    const result = await service.login(user);

    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'someUserId',
      email: 'test@example.com',
      roles: [UserRole.INVESTIGADOR],
    });
    expect(result).toEqual({ access_token: 'mockedJwtToken' });
  });

  it('should include semilleroId if user is LIDER_DE_SEMILLERO', async () => {
    const user = {
      _id: 'someUserId',
      email: 'lider@example.com',
      roles: [UserRole.LIDER_DE_SEMILLERO],
      semilleroId: 'specificSemilleroId',
    };
    const result = await service.login(user);

    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'someUserId',
      email: 'lider@example.com',
      roles: [UserRole.LIDER_DE_SEMILLERO],
      semilleroId: 'specificSemilleroId',
    });
    expect(result).toEqual({ access_token: 'mockedJwtToken' });
  });

  // --- Pruebas para register (existentes, se mantienen) ---

  // Prueba para LIDER_DE_PROYECTO
  it('should register a LIDER_DE_PROYECTO user', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Lider',
      email: 'lider@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_PROYECTO],
    };

    const result = await service.register(registerDto);


    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Lider',
      email: 'lider@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_PROYECTO],
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Lider',
      email: 'lider@test.com',
      roles: [UserRole.LIDER_DE_PROYECTO],
    });
  });

  // Prueba para COINVENTIGADOR
  it('should register a COINVENTIGADOR user', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Coinvestigador',
      email: 'coinvestigador@test.com',
      password: 'password',
      roles: [UserRole.COINVESTIGADOR],
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Coinvestigador',
      email: 'coinvestigador@test.com',
      password: 'password',
      roles: [UserRole.COINVESTIGADOR],
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Coinvestigador',
      email: 'coinvestigador@test.com',
      roles: [UserRole.COINVESTIGADOR],
    });
  });

  // Prueba para INVESTIGADOR
  it('should register an INVESTIGADOR user', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Investigador',
      email: 'investigador@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Investigador',
      email: 'investigador@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Investigador',
      email: 'investigador@test.com',
      roles: [UserRole.INVESTIGADOR],
    });
  });

  // Prueba para DINAMIZADOR
  it('should register a DINAMIZADOR user', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Dinamizador',
      email: 'dinamizador@test.com',
      password: 'password',
      roles: [UserRole.DINAMIZADOR],
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Dinamizador',
      email: 'dinamizador@test.com',
      password: 'password',
      roles: [UserRole.DINAMIZADOR],
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Dinamizador',
      email: 'dinamizador@test.com',
      roles: [UserRole.DINAMIZADOR],
    });
  });

  // Prueba para LIDER_DE_SEMILLERO
  it('should register a LIDER_DE_SEMILLERO user', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Lider Semillero',
      email: 'lider.semillero@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_SEMILLERO],
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Lider Semillero',
      email: 'lider.semillero@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_SEMILLERO],
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Lider Semillero',
      email: 'lider.semillero@test.com',
      roles: [UserRole.LIDER_DE_SEMILLERO],
    });
  });

  // Prueba para LIDER_DE_SEMILLERO con semilleroId
  it('should register a LIDER_DE_SEMILLERO user with semilleroId', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Lider Semillero ID',
      email: 'lider.semillero.id@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_SEMILLERO],
      semilleroId: 'someSemilleroId',
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Lider Semillero ID',
      email: 'lider.semillero.id@test.com',
      password: 'password',
      roles: [UserRole.LIDER_DE_SEMILLERO],
      semilleroId: 'someSemilleroId',
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Lider Semillero ID',
      email: 'lider.semillero.id@test.com',
      roles: [UserRole.LIDER_DE_SEMILLERO],
      semilleroId: 'someSemilleroId',
    });
  });

  // Prueba para un usuario con instructorId
  it('should register a user with instructorId', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Instructor User',
      email: 'instructor@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
      instructorId: 'someInstructorId',
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Instructor User',
      email: 'instructor@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
      instructorId: 'someInstructorId',
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Instructor User',
      email: 'instructor@test.com',
      roles: [UserRole.INVESTIGADOR],
      instructorId: 'someInstructorId',
    });
  });

  // Prueba para un usuario con aprendizId
  it('should register a user with aprendizId', async () => {
    const registerDto: RegisterAuthDto = {
      nombreCompleto: 'Test Aprendiz User',
      email: 'aprendiz@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
      aprendizId: 'someAprendizId',
    };

    const result = await service.register(registerDto);

    expect(userService.crear).toHaveBeenCalledWith({
      nombreCompleto: 'Test Aprendiz User',
      email: 'aprendiz@test.com',
      password: 'password',
      roles: [UserRole.INVESTIGADOR],
      aprendizId: 'someAprendizId',
    });
    expect(result).toEqual({
      _id: 'someUserId',
      nombreCompleto: 'Test Aprendiz User',
      email: 'aprendiz@test.com',
      roles: [UserRole.INVESTIGADOR],
      aprendizId: 'someAprendizId',
    });
  });
});