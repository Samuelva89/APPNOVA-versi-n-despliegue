import mongoose, { Document, Schema } from 'mongoose';

// Interfaz que representa un documento de Aprendiz en MongoDB
// Se corrigieron los tipos de datos para que coincidan con el DTO
export interface IAprendiz extends Document {
  Nombre_Completo: string;
  Documento_Identidad: number;
  Numero_de_ficha: number;
  Numero_de_contacto: number;
  Correo_Electronico: string;
  Fecha_de_inicio: Date; // Cambiado de 'string' a 'Date'
  Fecha_en_que_Finaliza: Date; // Cambiado de 'string' a 'Date'
  Asigna_al_Projecto_que_Pertenece: string;
}

// Esquema de Mongoose para la colección de Aprendices
export const AprendizSchema: Schema = new Schema({
  // Nombre completo del aprendiz
  Nombre_Completo: { type: String, required: true },
  
  // Documento de identidad: campo requerido y único
  Documento_Identidad: { 
    type: Number, 
    required: true,
    unique: true // 👈 Evita que se creen aprendices con el mismo número
  },

  // Número de ficha
  Numero_de_ficha: { type: Number, required: true },

  // Número de contacto
  Numero_de_contacto: { type: Number, required: true },

  // Correo electrónico: campo requerido y único
  Correo_Electronico: { 
    type: String, 
    required: true,
    unique: true // 👈 Evita que se creen aprendices con el mismo correo
  },
  
  // Fecha de inicio: tipo de dato 'Date'
  Fecha_de_inicio: { 
    type: Date,
    required: true
  },
  
  // Fecha de finalización: tipo de dato 'Date'
  Fecha_en_que_Finaliza: { 
    type: Date,
    required: true
  },
  
  // Proyecto al que pertenece el aprendiz
  Asigna_al_Projecto_que_Pertenece: { type: String, required: true },
}, {
  timestamps: true // Opcional, pero recomendado: añade campos 'createdAt' y 'updatedAt'
});