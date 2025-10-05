import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/auth.dto';
import { UserRole } from '../common/constants/roles.enum'; // Importar UserRole

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const result = user.toObject();
      delete result.password;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: any = {
      sub: user._id,
      email: user.email,
      roles: user.roles,
    };

    // Incluir IDs condicionalmente
    if (user.instructorId) { // Incluir si el ID existe
      payload.instructorId = user.instructorId;
    }
    if (user.aprendizId) { // Incluir si el ID existe
      payload.aprendizId = user.aprendizId;
    }
    if (user.roles.includes(UserRole.LIDER_DE_SEMILLERO) && user.semilleroId) {
      payload.semilleroId = user.semilleroId;
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: RegisterAuthDto) {
    // The hashing responsibility is now in UserService.
    const newUser = await this.userService.crear(userDto);

    const result = newUser.toObject();
    delete result.password;
    return result;
  }
}