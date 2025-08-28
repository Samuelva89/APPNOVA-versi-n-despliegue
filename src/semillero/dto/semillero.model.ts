import mongoose, { Document, Schema } from 'mongoose';

export const SemilleroSchema: Schema = new mongoose.Schema(
  {
    Nombre_Semillero: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export interface ISemillero extends Document {
  Nombre_Semillero: string;
  createdAt: Date;
  updatedAt: Date;
}