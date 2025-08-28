import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

export const EvidenciaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },

    fechacarga: {
      type: Date,
      default: Date.now,
    },

    tipoevidencia: {
      type: String,
      required: true,
    },

    archivoURL: {
      type: String,
      required: true,
      unique: true, // 👈 Agregado para unicidad
    },
  },
  {
    timestamps: true,
  },
);

export interface IEvidencia extends Document {
  titulo: string;
  fechacarga: Date;
  tipoevidencia: string;
  archivoURL: string;
  createdAt: Date;
  updatedAt: Date;
}