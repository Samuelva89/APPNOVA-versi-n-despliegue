import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Semillero extends Document {
  @Prop({ required: true, unique: true })
  NombreSemillero: string;
}

export const SemilleroSchema = SchemaFactory.createForClass(Semillero);

export interface ISemillero extends Document {
  NombreSemillero: string;
  createdAt: Date;
  updatedAt: Date;
}