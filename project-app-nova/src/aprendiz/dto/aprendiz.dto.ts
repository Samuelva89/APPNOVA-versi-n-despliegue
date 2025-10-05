import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

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
  @IsDate()
  fechaDeInicio: Date;
  @IsDate()
  fechaEnQueFinaliza: Date;
  @IsString()
  proyectoAsignadoId: string;
}
