import mongoose from "mongoose";

export const AprendizSchema = new mongoose.Schema({
    Nombre_Completo: { type: String, reqiered:true },
    Documento_Identidad: { type: Number, required:true}, 
    Numero_de_ficha: { type: Number, required:true}, 
    Numero_de_contacto: { type: Number, required:true}, 
    Correo_Electronico: { type: String, required:true},
    Fecha_de_inicio: { type: String, required:true},
    Fecha_en_que_Finaliza: { type: String, required:true},
    Asigna_al_Projecto_que_Pertenece: { type: String, required:true} 
})
export interface IAprendiz extends mongoose.Document {
    Nombre_Completo: string;
    Documento_Identidad: number;
    Numero_de_ficha: number;
    Numero_de_contacto: number;
    Correo_Electronico: string;
    Fecha_de_inicio: string;
    Fecha_en_que_Finaliza: string;
    Asigna_al_Projecto_que_Pertenece: string;
}

