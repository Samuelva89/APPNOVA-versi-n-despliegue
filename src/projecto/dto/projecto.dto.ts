import { IsDateString, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum ProjectoEstado {
  EN_DESARROLLO = 'en desarrollo',
  FINALIZADO = 'finalizado',
  PENDIENTE = 'pendiente',
}

export class projectoDto {
  @IsString()
  @IsNotEmpty({ message: 'El título del proyecto es obligatorio.' })
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'El resumen es obligatorio.' })
  resumen: string;

  @IsString()
  @IsNotEmpty({ message: 'El planteamiento del problema es obligatorio.' })
  planteamientodelProblema: string;

  @IsString()
  @IsNotEmpty({ message: 'Los objetivos son obligatorios.' })
  objetivos: string;

  @IsString()
  @IsNotEmpty({ message: 'La justificación es obligatoria.' })
  justificacion: string;

  @IsString()
  @IsNotEmpty({ message: 'La metodología es obligatoria.' })
  metodologia: string;

  @IsString()
  @IsNotEmpty({ message: 'Los resultados esperados son obligatorios.' })
  resultadosEsperados: string;

  @IsEnum(ProjectoEstado, { message: 'El estado debe ser uno de los valores permitidos: en desarrollo, finalizado o pendiente.' })
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  estado: string;

  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener formato válido (YYYY-MM-DD).' },
  )
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
  fechadeInicio: Date;

  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener formato válido (YYYY-MM-DD).' },
  )
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria.' })
  fechadeFin: Date;
}