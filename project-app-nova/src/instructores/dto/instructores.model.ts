import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interfaz que representa un documento de Instructor en MongoDB
export interface IInstructores extends Document {
  Nombre_Instructor: string;
  Email: string;
  Documento_Identidad: number;
  Numero_de_contacto: number;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Instructores extends Document {
  @Prop({ required: true })
  Nombre_Instructor: string;

  @Prop({ required: true, unique: true })
  Email: string;

  @Prop({ required: true, unique: true })
  Documento_Identidad: number;

  @Prop({ required: true })
  Numero_de_contacto: number;
}

export const InstructoresSchema = SchemaFactory.createForClass(Instructores);