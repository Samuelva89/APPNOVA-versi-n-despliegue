import { IsEmail, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class instructoresDto {
  @IsString()
  @IsNotEmpty()
  Nombre_Instructor: string;

  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @IsNumber()
  @IsNotEmpty()
  Documento_Identidad: number;

  @IsNumber()
  @IsNotEmpty()
  Numero_de_contacto: number;
}