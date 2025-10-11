import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IProjecto } from 'src/projecto/dto/projecto.model';

// Interfaz que representa un documento de Cronograma en MongoDB
export interface ICronograma extends Document {
  proyecto: IProjecto;
  centroDeFormacion: string;
  objetivosEspecificos: string[];
  actividades: string[];
  entregables: string;
  observaciones: string;
  year: string;
  fechaInicio: Date;
  fechaFin: Date;
}

@Schema({ timestamps: true }) // createdAt y updatedAt automáticos
export class Cronograma extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Projecto', required: true })
  proyecto: MongooseSchema.Types.ObjectId;
  
  @Prop({ required: true })
  centroDeFormacion: string;

  @Prop({ type: [String], required: true })
  objetivosEspecificos: string[];

  @Prop({ type: [String], required: true })
  actividades: string[];

  @Prop({ required: true })
  entregables: string;

  @Prop({ required: false })
  observaciones: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  fechaInicio: Date;

  @Prop({ required: true })
  fechaFin: Date;
}

export const CronogramaSchema = SchemaFactory.createForClass(Cronograma);