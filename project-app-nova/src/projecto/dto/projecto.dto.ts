import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';

export enum ProjectoEstado {
  EN_DESARROLLO = 'en desarrollo',
  FINALIZADO = 'finalizado',
  PENDIENTE = 'pendiente',
}

export class ProjectoDto {
  @IsDateString(
    {},
    { message: 'La fecha de inicio debe tener formato válido (YYYY-MM-DD).'},
  )
  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria.' })
  fechaInicio: Date;

  @IsDateString(
    {},
    { message: 'La fecha de fin debe tener formato válido (YYYY-MM-DD).' },
  )
  @IsNotEmpty({ message: 'La fecha de fin es obligatoria.' })
  fechaFin: Date;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de la regional es obligatorio.' })
  regional: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del municipio es obligatorio.' })
  municipio: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del centro es obligatorio.' })
  centroDeFormacion: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del programa es obligatorio.' })
  programaDeFormacion: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del semillero es obligatorio.' })
  nombreDelSemilleroDeInvestigacion: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre del lider es obligatorio.' })
  lineaDeInvestigacionAsociada: string;

  @IsString()
  @IsNotEmpty({ message: 'El título del proyecto es obligatorio.' })
  tituloDeProyecto: string;

  @IsString()
  @IsNotEmpty({ message: 'El resumen es obligatorio.' })
  resumen: string;

  @IsString()
  @IsNotEmpty({ message: 'Las palabras clave son obligatorias.' })
  palabrasClave: string;

  @IsString()
  @IsNotEmpty({ message: 'La justificación es obligatoria.' })
  justificacion: string;

  @IsString()
  @IsNotEmpty({ message: 'El planteamiento del problema es obligatorio.' })
  planteamientoDelProblema: string;

  @IsString()
  @IsOptional()
  estadoDelArte: string;

  @IsString()
  @IsNotEmpty({ message: 'El objetivo general es obligatorio.' })
  objetivoGeneral: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Los objetivos específicos son obligatorios.' })
  objetivoEspecifico: string[];

  @IsString()
  @IsNotEmpty({ message: 'Los beneficiarios son obligatorios.' })
  beneficiarios: string;

  @IsString()
  @IsNotEmpty({ message: 'La metodología es obligatoria.' })
  metodologia: string;

  @IsString()
  @IsNotEmpty({ message: 'El impacto es obligatorio.' })
  impactosEconomicoSocialAmbientalEsperados: string;

  @IsString()
  @IsNotEmpty({ message: 'Los resultados esperados son obligatorios.' })
  resultadosEsperados: string;

  @IsEnum(ProjectoEstado, {
    message:
      'El estado debe ser uno de los valores permitidos: en desarrollo, finalizado o pendiente.',
  })
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  estado: ProjectoEstado;

  @IsString()
  @IsOptional()
  bibliografia: string;

  @IsString()
  @IsOptional()
  anexos: string;

  @IsArray({ message: 'Los instructores deben ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  instructores: string[];

  @IsArray({ message: 'Los aprendices deben ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  aprendices: string[];

  @IsArray({ message: 'El cronograma debe ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  cronograma: string[];

  @IsArray({ message: 'El semillero debe ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  semillero: string[];

  @IsArray({ message: 'El seguimiento debe ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  seguimiento: string[];

  @IsArray({ message: 'Las evidencias deben ser un arreglo de IDs.' })
  @IsString({ each: true })
  @IsOptional()
  evidencias: string[];
}
