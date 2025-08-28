import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class ObservacionSegDto {
  @IsString()
  @IsNotEmpty({ message: 'La observación no puede estar vacía.' })
  observacion: string;

  @IsDateString(
    {},
    { message: 'La fecha de observación debe ser válida (YYYY-MM-DD).' },
  )
  @IsOptional()
  fecha_observacion: Date;
}