import mongoose from 'mongoose';

export const ProjectoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  resumen: { type: String, required: true },
  planteamientodelProblema: { type: String, required: true },
  objetivos: { type: String, required: true },
  justificacion: { type: String, required: true },
  metodologia: { type: String, required: true },
  resultadosEsperados: { type: String, required: true },
  estado: { type: String, required: true },
  fechadeInicio: { type: Date, required: true },
  fechadeFin: { type: Date, required: true },
});

export interface Iprojecto extends mongoose.Document {
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
