import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Semillero extends Document {
  @Prop({ required: true, unique: true })
  Nombre_Semillero: string;
}

export const SemilleroSchema = SchemaFactory.createForClass(Semillero);

export interface ISemillero extends Document {
  Nombre_Semillero: string;
  createdAt: Date;
  updatedAt: Date;
}