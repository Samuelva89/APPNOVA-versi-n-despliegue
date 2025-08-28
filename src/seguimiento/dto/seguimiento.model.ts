import mongoose, { Document, Schema } from 'mongoose';


export interface ISeguimiento extends Document {
  observacion: string;
  fecha_observacion: Date;
}

export const SeguimientoSchema: Schema = new mongoose.Schema(
  {
    observacion: {
      type: String,
      required: true,
      trim: true,
    },
    fecha_observacion: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);