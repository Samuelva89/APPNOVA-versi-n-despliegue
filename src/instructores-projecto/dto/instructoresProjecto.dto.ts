import { IsDate } from 'class-validator';

export class instructoresProjectoDto {
  @IsDate()
  Fecha_de_inicio: Date;
  @IsDate()
  Fecha_en_que_Finaliza: Date;
}
