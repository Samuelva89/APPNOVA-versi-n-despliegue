import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class AprendizDto {
  @IsString()
  Nombre_Completo: string;
  @IsNumber()
  Documento_Identidad: number;
  @IsNumber()
  Numero_de_ficha: number;
  @IsNumber()
  Numero_de_contacto: number;
  @IsEmail()
  Correo_Electronico: string;
  @IsDate()
  Fecha_de_inicio: Date;
  @IsDate()
  Fecha_en_que_Finaliza: Date;
  @IsString()
  Asigna_al_Projecto_que_Pertenece: string;
}
