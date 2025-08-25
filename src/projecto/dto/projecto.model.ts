import mongoose from 'mongoose';
import { IAprendiz } from 'src/aprendiz/dto/aprendiz.model';
import { IEvidencia } from 'src/evidencias/dto/evidencias.model';
import { IInstructores } from 'src/instructores/dto/instructores.model';
import { ISeguimiento } from 'src/seguimiento/dto/seguimiento.model';
import { ISemillero } from 'src/semillero/dto/semillero.model';
import { IUser } from 'src/user/dto/user.model';

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
  user: IUser; //relcion con User
  instructor: IInstructores; // relacion con instructores
  aprendiz: IAprendiz; // relacion con aprendiz
  evidencias: IEvidencia// relacion eviencias
  semillero: ISemillero// relacion con semillero
  instructores: IInstructores// relacion con instructores
  seguimiento: ISeguimiento// relacion con seguimiento
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
