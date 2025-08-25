import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class projectoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;
  @IsString()
  @IsNotEmpty()
  resumen: string;
  @IsString()
  @IsNotEmpty()
  planteamientodelProblema: string;
  @IsString()
  @IsNotEmpty()
  objetivos: string;
  @IsString()
  @IsNotEmpty()
  justificacion: string;
  @IsString()
  @IsNotEmpty()
  metodologia: string;
  @IsString()
  @IsNotEmpty()
  resultadosEsperados: string;
  @IsString()
  @IsNotEmpty()
  estado: string;
  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener formato válido (YYYY-MM-DD)' },
  )
  @IsNotEmpty()
  fechadeInicio: Date;
  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener formato válido (YYYY-MM-DD)' },
  )
  @IsNotEmpty()
  fechadeFin: Date;
}
