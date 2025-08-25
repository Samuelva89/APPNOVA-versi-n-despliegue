import mongoose from 'mongoose';
import { Iprojecto } from 'src/projecto/dto/projecto.model';
import { IUser } from 'src/user/dto/user.model';

// Esquema de Mongoose para la colección de Observaciones de Seguimiento
export const ObservacionSegSchema = new mongoose.Schema(
  {
    proyecto: { type: String, required: true },
    user: { type: String, required: true },
    observacion: { type: String, required: true },
    fecha_observacion: { type: Date },
  },
  { timestamps: true }, // Crea automáticamente createdAt y updatedAt
);

export interface ISeguimiento extends mongoose.Document {
  proyecto: Iprojecto; // Relación con Proyecto
  user: IUser; // Relación con Usuario
  observacion: string; // Texto de la observación
  fecha_observacion: Date; // Fecha de observación
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de última actualización
}
