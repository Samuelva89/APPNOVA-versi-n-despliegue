import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Semillero extends Document {
  @Prop({ required: true, unique: true })
  nombreSemillero: string;
}

export const SemilleroSchema = SchemaFactory.createForClass(Semillero);

export interface ISemillero extends Document {
  nombreSemillero: string;
  createdAt: Date;
  updatedAt: Date;
}