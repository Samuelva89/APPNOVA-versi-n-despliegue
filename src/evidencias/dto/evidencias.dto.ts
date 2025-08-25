// evidencias.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class EvidenciaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' },
  )
  @IsOptional()
  fechacarga: Date;

  @IsNotEmpty()
  @IsString()
  tipoevidencia: string;

  @IsNotEmpty()
  @IsString()
  archivoURL: string;
}
