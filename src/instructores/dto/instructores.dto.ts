import { IsEmail, IsNumber, IsString } from 'class-validator';

export class instructoresDto {
  @IsString()
  Nombre_Instructor: string;
  @IsEmail()
  Email: string;
  @IsNumber()
  Documento_Identidad: number;
  @IsNumber()
  Numero_de_contacto: number;
}
