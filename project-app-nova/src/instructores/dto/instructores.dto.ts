import { IsEmail, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class instructoresDto {
  @IsString()
  @IsNotEmpty()
  nombreInstructor: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  documentoIdentidad: number;

  @IsNumber()
  @IsNotEmpty()
  numeroDeContacto: number;
}