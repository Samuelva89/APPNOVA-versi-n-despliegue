import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const EvidenciaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      trim: true, // Elimina espacios en blanco al inicio y al final
    },

    fechacarga: {
      type: Date,
      default: Date.now, // Si no se provee una fecha, se establece la fecha actual
    },

    tipoevidencia: {
      type: String,
      required: [true, 'El tipo de evidencia es obligatorio.'],
    },

    archivoURL: {
      type: String,
      required: [true, 'La URL del archivo es obligatoria.'],
    },
  },
  {
    // Opciones del Schema
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt
  },
);

export interface IEvidencia extends Document {
  // readonly _id: string; // El _id es añadido por Mongoose a través de Document

  readonly titulo: string;
  readonly fechacarga: Date;
  readonly tipoevidencia: string;
  readonly archivoURL: string;

  // Los campos createdAt y updatedAt son añadidos automáticamente si usas la opción timestamps en el schema
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
