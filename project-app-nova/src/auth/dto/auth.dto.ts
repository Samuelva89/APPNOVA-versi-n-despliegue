import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../common/constants/roles.enum';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty({ message: 'Los roles son obligatorios' })
  roles: UserRole[];

  @IsString()
  @IsOptional()
  semilleroId?: string;
}
