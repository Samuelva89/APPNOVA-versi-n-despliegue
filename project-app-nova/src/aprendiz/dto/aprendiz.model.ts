import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IProjecto } from 'src/projecto/dto/projecto.model';

// Interfaz que representa un documento de Aprendiz en MongoDB
export interface IAprendiz extends Document {
  nombreCompleto: string;
  documentoIdentidad: number;
  numeroDeFicha: number;
  numeroDeContacto: number;
  correoElectronico: string;
  fechaDeInicio: Date;
  fechaEnQueFinaliza: Date;
  proyectoAsignado: IProjecto;
}

@Schema({
  timestamps: true, // Opcional, pero recomendado: añade campos 'createdAt' y 'updatedAt'
})
export class Aprendiz {
  // Nombre completo del aprendiz
  @Prop({ required: true })
  nombreCompleto: string;

  // Documento de identidad: campo requerido y único
  @Prop({ required: true, unique: true })
  documentoIdentidad: number;

  // Número de ficha
  @Prop({ required: true })
  numeroDeFicha: number;

  // Número de contacto
  @Prop({ required: true })
  numeroDeContacto: number;

  // Correo electrónico: campo requerido y único
  @Prop({ required: true, unique: true })
  correoElectronico: string;

  // Fecha de inicio: tipo de dato 'Date'
  @Prop({ required: true, type: Date })
  fechaDeInicio: Date;

  // Fecha de finalización: tipo de dato 'Date'
  @Prop({ required: true, type: Date })
  fechaEnQueFinaliza: Date;

  // Proyecto al que pertenece el aprendiz
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Projecto', required: true })
  proyectoAsignado: MongooseSchema.Types.ObjectId;
}

export const AprendizSchema = SchemaFactory.createForClass(Aprendiz);