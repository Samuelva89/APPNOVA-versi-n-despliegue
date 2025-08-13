import mongoose from 'mongoose';

// Esquema de Mongoose para la colección de Instructores
export const InstructoresSchema = new mongoose.Schema(
  {
    // Nombre del instructor, campo requerido
    Nombre_Instructor: { type: String, required: true },
    // Correo electrónico del instructor, campo requerido y único
    Email: { type: String, required: true, unique: true },
    // Documento de identidad del instructor, campo requerido y único
    Documento_Identidad: { type: Number, required: true, unique: true },
    // Número de contacto del instructor, campo requerido
    Numero_de_contacto: { type: Number, required: true },
  },
  { timestamps: true }, // Agrega automáticamente createdAt y updatedAt
);

// Interfaz que representa un documento de Instructor en MongoDB
export interface IInstructores extends mongoose.Document {
  //User: IUser; // Relación con el user
  Nombre_Instructor: string; // Nombre del instructor
  Email: string; // Correo electrónico
  Documento_Identidad: number; // Documento de identidad
  Numero_de_contacto: number; // Número de contacto
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de última actualización
}
