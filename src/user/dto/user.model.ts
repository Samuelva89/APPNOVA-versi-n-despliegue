import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
  nombreCompleto: string;
  email: string;
  contrasena: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new mongoose.Schema(
  {
    nombreCompleto: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true }, // Notar que el campo ahora se llama 'contrasena'
  },
  {
    timestamps: true,
  },
);