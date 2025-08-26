import mongoose, { Document, Schema } from 'mongoose';

// Interfaz que representa un documento de Instructor en MongoDB
export interface IInstructores extends Document {
  Nombre_Instructor: string;
  Email: string;
  Documento_Identidad: number;
  Numero_de_contacto: number;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose para la colección de Instructores
export const InstructoresSchema: Schema = new Schema(
  {
    Nombre_Instructor: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Documento_Identidad: { type: Number, required: true, unique: true },
    Numero_de_contacto: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);