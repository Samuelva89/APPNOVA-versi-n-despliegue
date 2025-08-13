import mongoose from 'mongoose';

export const SemilleroSchema = new mongoose.Schema(
  {
    // Esta línea define el campo "Nombre_Semillero" en el esquema de Mongoose.
    // type: String indica que el valor debe ser una cadena de texto.
    // required: true significa que este campo es obligatorio al crear un documento.
    // unique: true asegura que no se repitan valores en este campo dentro de la colección, es decir, cada semillero debe tener un nombre único.
    Nombre_Semillero: { type: String, required: true, unique: true },
  },
  // Esta opción { timestamps: true } en el esquema de Mongoose indica que automáticamente se agregarán dos campos a los documentos de la colección: 'createdAt' y 'updatedAt'.
  // 'createdAt' almacena la fecha y hora en que se creó el documento, y 'updatedAt' almacena la fecha y hora de la última actualización del documento.
  { timestamps: true },
);

// Esta línea define una interfaz llamada ISemillero que extiende de mongoose.Document.
// Al extender mongoose.Document, la interfaz hereda todas las propiedades y métodos de un documento de Mongoose, como _id, save(), etc.
// Además, se especifica que cada objeto ISemillero debe tener una propiedad llamada Nombre_Semillero de tipo string.
export interface ISemillero extends mongoose.Document {
  Nombre_Semillero: string;
}
