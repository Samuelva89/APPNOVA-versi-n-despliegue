import mongoose from 'mongoose';

// Esquema de Mongoose para la colección de Observaciones de Seguimiento
export const ObservacionSegSchema = new mongoose.Schema(
  {
    observacion: { type: String, required: true },
    fecha_observacion: { type: Date },
  },
  { timestamps: true }, // Crea automáticamente createdAt y updatedAt
);

export interface ISeguimiento extends mongoose.Document {
  proyecto_id: mongoose.Types.ObjectId;  // Relación con Proyecto
  usuario_id: mongoose.Types.ObjectId;   // Relación con Usuario
  observacion: string;                   // Texto de la observación
  fecha_observacion: Date;               // Fecha de observación
  createdAt: Date;                        // Fecha de creación
  updatedAt: Date;                        // Fecha de última actualización
}



