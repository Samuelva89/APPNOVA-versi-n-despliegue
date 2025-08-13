import { IsString } from 'class-validator';

export class SemilleroDTO {
  @IsString()
  Nombre_Semillero: string;
}
