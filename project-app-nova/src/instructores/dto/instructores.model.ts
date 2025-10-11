import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Interfaz que representa un documento de Instructor en MongoDB
export interface IInstructores extends Document {
  nombreInstructor: string;
  email: string;
  documentoIdentidad: number;
  numeroDeContacto: number;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class Instructores extends Document {
  @Prop({ required: true })
  nombreInstructor: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  documentoIdentidad: number;

  @Prop({ required: true })
  numeroDeContacto: number;
}

export const InstructoresSchema = SchemaFactory.createForClass(Instructores);