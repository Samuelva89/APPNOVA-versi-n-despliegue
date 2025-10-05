import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IProjecto } from 'src/projecto/dto/projecto.model';
import { IUser } from 'src/user/dto/user.model';

// --- Interfaz de TypeScript para Evidencia ---
// Define la forma de un documento Evidencia para un tipado estricto en el código.
export interface IEvidencia extends Document {
  nombre: string;
  descripcion: string;
  path: string;
  mimetype: string;
  size: number;
  proyecto: IProjecto; // Relación poblada
  user: IUser; // Relación poblada
}

@Schema({ timestamps: true })
export class Evidencia extends Document {
  // --- Datos que provee el usuario al subir el archivo ---
  @Prop({ required: true, trim: true })
  nombre: string; // Nombre descriptivo para la evidencia. Ej: "Informe de Avance Q3"

  @Prop({ required: false })
  descripcion: string; // Texto opcional con más detalles sobre la evidencia.

  // --- Metadatos del archivo (generados por el backend) ---
  @Prop({ required: true })
  path: string; // Ruta interna en el servidor donde se guardó el archivo. Ej: "uploads/evidencias/abcdef123456.pdf"

  @Prop({ required: true })
  mimetype: string; // El tipo MIME del archivo, crucial para saber cómo tratarlo. Ej: "application/pdf", "image/png"

  @Prop({ required: true })
  size: number; // Tamaño del archivo en bytes. Útil para validaciones o información al usuario.

  // --- RELACIONES ESENCIALES ---
  // Se vincula la evidencia con el proyecto al que pertenece. Es un campo obligatorio.
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Projecto' })
  proyecto: MongooseSchema.Types.ObjectId;

  // Se vincula la evidencia con el usuario que la subió. Esencial para auditoría y permisos.
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;
}

export const EvidenciaSchema = SchemaFactory.createForClass(Evidencia);