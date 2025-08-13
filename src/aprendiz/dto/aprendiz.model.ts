import mongoose from 'mongoose';
import { Iprojecto } from 'src/projecto/dto/projecto.model';

// Esquema de Mongoose para la colección de Aprendices
export const AprendizSchema = new mongoose.Schema({
  // Nombre completo del aprendiz, campo requerido
  Nombre_Completo: { type: String, required: true },
  // Documento de identidad del aprendiz, campo requerido
  Documento_Identidad: { type: Number, required: true },
  // Número de ficha del aprendiz, campo requerido
  Numero_de_ficha: { type: Number, required: true },
  // Número de contacto del aprendiz, campo requerido
  Numero_de_contacto: { type: Number, required: true },
  // Correo electrónico del aprendiz, campo requerido
  Correo_Electronico: { type: String, required: true },
  // Fecha de inicio del proceso de formación, campo requerido
  Fecha_de_inicio: { type: String, required: true },
  // Fecha en que finaliza el proceso de formación, campo requerido
  Fecha_en_que_Finaliza: { type: String, required: true },
  // Proyecto al que pertenece el aprendiz, campo requerido
  Asigna_al_Projecto_que_Pertenece: { type: String, required: true },
});

// Interfaz que representa un documento de Aprendiz en MongoDB
export interface IAprendiz extends mongoose.Document {
  projecto: Iprojecto; //relcion con projecto
  instructores: IAprendiz; // Relación con instructores
  Nombre_Completo: string; // Nombre completo del aprendiz
  Documento_Identidad: number; // Documento de identidad
  Numero_de_ficha: number; // Número de ficha
  Numero_de_contacto: number; // Número de contacto
  Correo_Electronico: string; // Correo electrónico
  Fecha_de_inicio: string; // Fecha de inicio
  Fecha_en_que_Finaliza: string; // Fecha de finalización
  Asigna_al_Projecto_que_Pertenece: string; // Proyecto asignado
}
