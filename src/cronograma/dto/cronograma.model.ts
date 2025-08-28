import mongoose, { Document, Schema } from 'mongoose';

// Interfaz que representa un documento de Cronograma en MongoDB
export interface ICronograma extends Document {
  actividad_general: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose para la colección de Cronogramas
export const CronogramaSchema = new mongoose.Schema(
  {
    actividad_general: { 
      type: String, 
      required: true, 
      trim: true,
      unique: true // 👈 Agregado para la unicidad
    },
    fecha_inicio: { type: Date },
    fecha_fin: { type: Date },
  },
  { timestamps: true }, // createdAt y updatedAt automáticos
);