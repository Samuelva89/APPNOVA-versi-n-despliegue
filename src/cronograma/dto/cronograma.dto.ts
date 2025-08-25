import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CronogramaDto {
  @IsString()
  @IsNotEmpty({ message: 'La actividad general es obligatoria' })
  actividad_general: string;

  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' },
  )
  @IsOptional()
  fecha_inicio: Date;

  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD)' },
  )
  @IsOptional()
  fecha_fin: Date;
}
