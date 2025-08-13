import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  NombreCompleto: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(8, { message: 'la contraseña debe contener almenos 8 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).+$/, {
    message:
      'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales',
  })
  contraseña: string;
}
