import mongoose, { Document, Schema } from 'mongoose';

// Interfaz que representa un documento de Projecto en MongoDB
export interface Iprojecto extends Document {
  titulo: string;
  resumen: string;
  planteamientodelProblema: string;
  objetivos: string;
  justificacion: string;
  metodologia: string;
  resultadosEsperados: string;
  estado: string;
  fechadeInicio: Date;
  fechadeFin: Date;
}

// Esquema de Mongoose para la colección 'Projecto'
export const ProjectoSchema: Schema = new mongoose.Schema(
  {
    titulo: { 
      type: String, 
      required: true, 
      unique: true // 👈 Evita que se repitan los títulos
    },

    resumen: { type: String, required: true },
    planteamientodelProblema: { type: String, required: true },
    objetivos: { type: String, required: true },
    justificacion: { type: String, required: true },
    metodologia: { type: String, required: true },
    resultadosEsperados: { type: String, required: true },

    estado: { 
      type: String, 
      required: true, 
      enum: ['en desarrollo', 'finalizado', 'pendiente'] // 👈 Asegura valores válidos
    },

    fechadeInicio: { type: Date, required: true },
    fechadeFin: { type: Date, required: true },

  },
  
  {
    timestamps: true,
  },
);