import mongoose from 'mongoose';

// Esquema de Mongoose para la colección de Usuarios
export const UserSchema = new mongoose.Schema(
  {
    // Nombre completo del usuario, requerido
    NombreCompleto: { type: String, required: true },

    // Correo electrónico, requerido y único
    email: { type: String, required: true, unique: true },

    // Contraseña (encriptada), requerida
    contraseña: { type: String, required: true },
  },
  { timestamps: true }, // Agrega automáticamente createdAt y updatedAt
);

export interface IUser extends mongoose.Document {
  //rol: IRol;
  NombreCompleto: string;
  email: string;
  contraseña: string;
  createdAd: Date;
  updateAdd: Date;
}
