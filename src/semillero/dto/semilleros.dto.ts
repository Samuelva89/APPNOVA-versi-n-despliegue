import { IsString, IsNotEmpty } from 'class-validator';

export class SemilleroDTO {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del semillero es obligatorio.' })
  Nombre_Semillero: string;
}