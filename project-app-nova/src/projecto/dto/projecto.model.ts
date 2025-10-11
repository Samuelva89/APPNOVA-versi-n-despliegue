import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IAprendiz } from 'src/aprendiz/dto/aprendiz.model';
import { ICronograma } from 'src/cronograma/dto/cronograma.model';
import { IEvidencia } from 'src/evidencias/dto/evidencias.model';
import { IInstructores } from 'src/instructores/dto/instructores.model';
import { ISeguimiento } from 'src/seguimiento/dto/seguimiento.model';
import { ISemillero } from 'src/semillero/dto/semillero.model';
import { ProjectoEstado } from './projecto.dto';

@Schema({ timestamps: true })
export class Projecto extends Document {
  @Prop({ required: true, type: Date })
  fechaInicio: Date;

  @Prop({ required: true, type: Date })
  fechaFin: Date;

  @Prop({ required: true })
  regional: string;

  @Prop({ required: true })
  municipio: string;

  @Prop({ required: true })
  centroDeFormacion: string;

  @Prop({ required: true })
  programaDeFormacion: string;

  @Prop({ required: true })
  nombreDelSemilleroDeInvestigacion: string;

  @Prop({ required: true })
  lineaDeInvestigacionAsociada: string;

  @Prop({ required: true, unique: true })
  tituloDeProyecto: string;

  @Prop({ required: true })
  resumen: string;

  @Prop({ required: true })
  palabrasClave: string;

  @Prop({ required: true })
  justificacion: string;

  @Prop({ required: true })
  planteamientoDelProblema: string;

  @Prop({ required: false })
  estadoDelArte: string;

  @Prop({ required: true })
  objetivoGeneral: string;

  @Prop({ type: String, required: true })
  objetivoEspecifico: string[];

  @Prop({ required: true })
  beneficiarios: string;

  @Prop({ required: true })
  metodologia: string;

  @Prop({ required: true })
  impactosEconomicoSocialAmbientalEsperados: string;

  @Prop({ required: true })
  resultadosEsperados: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(ProjectoEstado),
  })
  estado: ProjectoEstado;

  @Prop({ required: false })
  bibliografia: string;

  @Prop({ required: false })
  anexos: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Aprendiz' }] })
  aprendices: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Instructores' }] })
  instructores: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Cronograma' }] })
  cronograma: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Evidencia' }] })
  evidencias: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Seguimiento' }] })
  seguimiento: MongooseSchema.Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Semillero' }] })
  semillero: MongooseSchema.Types.ObjectId[];
}

// Interfaz que representa un documento de Projecto en MongoDB
export interface IProjecto extends Document {
  fechaInicio: Date;
  fechaFin: Date;
  regional: string;
  municipio: string;
  centroDeFormacion: string;
  programaDeFormacion: string;
  nombreDelSemilleroDeInvestigacion: string;
  lineaDeInvestigacionAsociada: string;
  instructores: IInstructores[]; //Referencia al modelo Instructor
  aprendices: IAprendiz[]; // relacion con aprediz
  tituloDeProyecto: string;
  resumen: string;
  palabrasClave: string;
  justificacion: string;
  planteamientoDelProblema: string;
  estadoDelArte: string;
  objetivoGeneral: string;
  objetivoEspecifico: string[];//lista de objetivos
  beneficiarios: string;
  impactosEconomicoSocialAmbientalEsperados: string;
  resultadosEsperados: string;
  estado: ProjectoEstado;
  bibliografia: string;
  anexos: string;
  cronograma: ICronograma[];
  semillero: ISemillero[];
  seguimiento: ISeguimiento[];
  evidencias: IEvidencia[];
}

export const ProjectoSchema = SchemaFactory.createForClass(Projecto);
