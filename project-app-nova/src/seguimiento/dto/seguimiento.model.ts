import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IProjecto } from 'src/projecto/dto/projecto.model';
import { IUser } from 'src/user/dto/user.model';

// Esta interfaz representa un documento de Seguimiento completamente poblado
export interface ISeguimiento extends Document {
  numeroActa: string;
  nombreDelComiteDeLaReunion: string;
  ciudad: string;
  fechaObservacion: Date;
  horaInicio: string;
  horaFin: string;
  lugarYEnlace: string;
  agendaOpuestosParaDesarrollar: string;
  objetivoDeLaReunion: string;
  desarrolloDeLaReunion: string;
  contextualizacionYAvanceDelProyecto: string;
  limitantesDelProyecto: string;
  evaluacionDelImpactoYParticipacionDeAprendices: string;
  presentacionDeResultadosEnEventosAcademicos: string;
  definicionDeDecisionesYAccionesASeguir: string;
  conclusiones: string;
  ctividadDecision: string;
  fecha: Date;
  responsables: string;
  firmasOParticipacionVirtual: string;
  asistentesYAprobacionDeDecisiones: string;
  nombres: string;
  dependenciaEmpresa: string;
  apruebaSiNo: string;
  observacion: string;
  proteccionDeDatos: string;
  // Relaciones
  proyecto: IProjecto[];
  user: IUser[];
}

@Schema({ timestamps: true })
export class Seguimiento extends Document {
  @Prop({ required: true, unique: true })
  numeroActa: string;

  @Prop({ required: true })
  nombreDelComiteDeLaReunion: string;

  @Prop({ required: true })
  ciudad: string;

  @Prop({ required: true, type: Date })
  fechaObservacion: Date;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ required: true })
  horaFin: string;

  @Prop({ required: true })
  lugarYEnlace: string;

  @Prop({ type: String })
  agendaOpuestosParaDesarrollar: string;

  @Prop({ type: String })
  objetivoDeLaReunion: string;

  @Prop({ required: true })
  desarrolloDeLaReunion: string;

  @Prop({ type: String })
  contextualizacionYAvanceDelProyecto: string;

  @Prop({ type: String })
  limitantesDelProyecto: string;

  @Prop({ type: String })
  evaluacionDelImpactoYParticipacionDeAprendices: string;

  @Prop({ type: String })
  presentacionDeResultadosEnEventosAcademicos: string;

  @Prop({ type: String })
  definicionDeDecisionesYAccionesASeguir: string;

  @Prop({ required: true })
  conclusiones: string;

  @Prop({ type: [String] })
  firmasOParticipacionVirtual: string[];

  // --- RELACIONES IMPORTANTES ---
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Projecto' }] })
  proyecto: MongooseSchema.Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  user: MongooseSchema.Types.ObjectId[];
}

export const SeguimientoSchema = SchemaFactory.createForClass(Seguimiento);
