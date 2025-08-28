import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class EvidenciaDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  titulo: string;

  @IsDateString(
    {},
    { message: 'La fecha de carga debe tener un formato válido.' },
  )
  @IsOptional()
  fechacarga: Date;

  @IsNotEmpty({ message: 'El tipo de evidencia es obligatorio.' })
  @IsString()
  tipoevidencia: string;

  @IsNotEmpty({ message: 'La URL del archivo es obligatoria.' })
  @IsString()
  @IsUrl({}, { message: 'La URL del archivo debe ser un enlace válido.' })
  archivoURL: string;
}