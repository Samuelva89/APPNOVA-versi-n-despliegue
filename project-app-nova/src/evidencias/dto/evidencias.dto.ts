import { IsNotEmpty, IsString } from 'class-validator';


 // Define la estructura de datos para crear una nueva evidencia.
 // Estos son los campos que el usuario llenará en el formulario al subir un archivo.

export class CreateEvidenciaDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la evidencia es obligatorio.' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })  
  descripcion: string;

  @IsString()
  @IsNotEmpty({ message: 'Toda evidencia debe estar asociada a un proyecto.' })
  proyectoId: string;
}