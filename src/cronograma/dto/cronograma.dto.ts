import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CronogramaDto {

  @IsString()
  @IsNotEmpty({ message: 'La actividad general es obligatoria' })
  @MaxLength(255, {
    message: 'La actividad general no puede superar 255 caracteres',
  })
  actividad_general: string;

  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD)' },
  )
  @IsOptional()
  fecha_inicio?: Date;

  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD)' },
  )
  @IsOptional()
  fecha_fin?: Date;
}
