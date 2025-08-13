import mongoose from 'mongoose';

// Esquema de Mongoose para la colección de Cronogramas
export const CronogramaSchema = new mongoose.Schema(
  {
    actividad_general: { type: String, required: true },
    fecha_inicio: { type: Date },
    fecha_fin: { type: Date },
  },
  { timestamps: true }, // createdAt y updatedAt automáticos
);

// Interfaz que representa un documento de Cronograma en MongoDB
export interface ICronograma extends mongoose.Document {
  actividad_general: string; // Actividad general
  fecha_inicio?: Date; // Fecha de inicio
  fecha_fin?: Date; // Fecha de fin
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de última actualización
}
