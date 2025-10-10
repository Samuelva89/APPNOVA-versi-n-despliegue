import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';

export class AprendizDto {
  @IsString()
  nombreCompleto: string;
  @IsNumber()
  documentoIdentidad: number;
  @IsNumber()
  numeroDeFicha: number;
  @IsNumber()
  numeroDeContacto: number;
  @IsEmail()
  correoElectronico: string;
  @IsDateString()
  fechaDeInicio: Date;
  @IsDateString()
  fechaEnQueFinaliza: Date;
  @IsString()
  proyectoAsignadoId: string;
}
