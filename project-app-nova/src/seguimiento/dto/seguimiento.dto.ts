import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsDate,
  IsArray,
  Matches,
} from 'class-validator';

export class ObservacionSegDto {
  @IsNotEmpty({ message: 'El número de acta no puede estar vacío.' })
  @IsString()
  numeroActa: string;

  @IsNotEmpty({
    message: 'El nombre del comité de la reunión no puede estar vacío.',
  })
  @IsString()
  nombreDelComiteDeLaReunion: string;

  @IsNotEmpty({ message: 'La ciudad no puede estar vacía.' })
  @IsString()
  ciudad: string;

  @IsDateString(
    {},
    { message: 'La fecha de observación debe ser válida (YYYY-MM-DD).' },
  )
  @IsNotEmpty({ message: 'La fecha de observación no puede estar vacía.' })
  fechaObservacion: Date;

  @IsNotEmpty({ message: 'La hora de inicio no puede estar vacía.' })
  @IsString()
  horaInicio: string;

  @IsNotEmpty({ message: 'La hora de fin no puede estar vacía.' })
  @IsString()
  horaFin: string;

  @IsNotEmpty({ message: 'El lugar y enlace no puede estar vacío.' })
  @IsString()
  lugarYEnlace: string;

  @IsNotEmpty({
    message: 'La agenda o puestos para desarrollar no puede estar vacía.',
  })
  @IsString()
  agendaOpuestosParaDesarrollar: string;

  @IsNotEmpty({
    message: 'Los objetivos de la reunión no pueden estar vacíos.',
  })
  @IsString()
  objetivoDeLaReunion: string;

  @IsNotEmpty()
  @IsString()
  desarrolloDeLaReunion: string;

  @IsNotEmpty({
    message:
      'La contextualización y avance del proyecto no pueden estar vacíos.',
  })
  @IsString()
  contextualizacionYAvanceDelProyecto: string;

  @IsNotEmpty({
    message: 'Las limitantes del proyecto no pueden estar vacías.',
  })
  @IsString()
  limitantesDelProyecto: string;

  @IsNotEmpty({ message: 'La evaluación de impacto no puede estar vacía.' })
  @IsString()
  evaluacionDelImpactoYParticipacionDeAprendices: string;

  @IsNotEmpty({
    message:
      'La presentación de resultados en eventos académicos no puede estar vacía.',
  })
  @IsString()
  presentacionDeResultadosEnEventosAcademicos: string;

  @IsNotEmpty({
    message: 'Las acciones a seguir y eventos no pueden estar vacíos.',
  })
  @IsString()
  definicionDeDecisionesYAccionesASeguir: string;

  @IsNotEmpty({ message: 'Las conclusiones no pueden estar vacías.' })
  @IsString()
  conclusiones: string;

  @IsNotEmpty({ message: 'La actividad de decisión no puede estar vacía.' })
  @IsString()
  actividadDecision: string;

  @IsNotEmpty({ message: 'Las fechas no pueden estar vacías.' })
  @IsDate()
  fecha: Date;

  @IsNotEmpty({ message: 'Los responsables no pueden estar vacíos.' })
  @IsString()
  responsables: string;

  @IsArray()
  @IsString()
  @Matches(/^(data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+)$/, {
    each: true,
    message: 'Cada firma debe ser una cadena en formato base64 válida.',
  })
  firmasOParticipacionVirtual: string[];

  @IsNotEmpty({
    message:
      'Los asistentes y aprobación de decisiones no pueden estar vacíos.',
  })
  @IsString()
  asistentesYAprobacionDeDecisiones: string;

  @IsNotEmpty({ message: 'Los nombres no pueden estar vacíos.' })
  @IsString()
  nombres: string;

  @IsNotEmpty({ message: 'Las dependencias no pueden estar vacías.' })
  @IsString()
  dependenciaEmpresa: string;

  @IsArray({
    message: ' La aprobación de las decisiones no pueden estar vacías.',
  })
  apruebaSiNo: string;

  @IsNotEmpty({ message: 'Las observaciones no pueden estar vacías.' })
  @IsString()
  observacion: string;

  @IsArray()
  @IsString()
  @Matches(/^(data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+)$/, {
    each: true,
    message: 'Cada firma debe ser una cadena en formato base64 válida.',
  })
  FirmasOParticipacionVirtual: string[];

  readonly proteccionDeDatos: string =
    'De acuerdo con La Ley 1581 de 2012, Protección de Datos Personales, el Servicio Nacional de Aprendizaje SENA, se compromete a garantizar la seguridad y protección de los datos personales que se encuentran almacenados en este documento, y les dará el tratamiento correspondiente en cumplimiento de lo establecido legalmente.';
}
