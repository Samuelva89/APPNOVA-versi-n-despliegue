import { IsNotEmpty, IsString, IsDateString, IsArray } from 'class-validator';
import { IProjecto } from 'src/projecto/dto/projecto.model';

// Renombramos la clase para ser más específicos sobre su propósito (Creación).
export class CronogramaDto {
  // Cambiamos el título por el ID del proyecto para una mejor relación de datos.
  @IsString()
  @IsOptional()
  proyecto: IProjecto['_id'];

  // Aplicamos camelCase.
  @IsString()
  @IsNotEmpty({ message: 'El centro de formación es obligatorio.' })
  centroDeFormacion: string;

  // Añadimos @IsArray y ponemos el nombre en plural y camelCase.
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Los objetivos específicos son obligatorios.' })
  objetivosEspecificos: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Las actividades son obligatorias.' })
  actividades: string[];

  @IsString()
  @IsNotEmpty({ message: 'Los entregables son obligatorios.' })
  entregables: string;

  // Aplicamos camelCase.
  @IsString()
  @IsNotEmpty({ message: 'Las observaciones son obligatorias.' })
  observaciones: string;

  @IsString()
  @IsNotEmpty({ message: 'El año es obligatorio.' })
  year: string;

  @IsDateString(
    {},
    {
      message: 'La fecha de inicio debe tener un formato válido (YYYY-MM-DD).',
    },
  )
  @IsNotEmpty()
  fechaInicio: Date;

  
  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener un formato válido (YYYY-MM-DD).' },
  )
  @IsNotEmpty()
  fechaFin: Date;
}
