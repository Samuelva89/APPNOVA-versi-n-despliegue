import mongoose from 'mongoose';
import { IInstructores } from 'src/instructores/dto/instructores.model';

export const instructoresProjectoSchema = new mongoose.Schema({
  Fecha_de_inicio: { type: Date, required: true },
  Fecha_en_que_Finaliza: { type: Date, required: true },
  rol_projecto: { type: String, requided: true },
});

export interface IinstructoresProjecto extends mongoose.Document {
  instructores: IInstructores; // relacion con la tabla instructores
  //projecto: IProjecto,//relacion con la tabla projecto
  rol_projecto: string;
  fecha_de_inicio: Date;
  fecha_de_fin: Date;
}
