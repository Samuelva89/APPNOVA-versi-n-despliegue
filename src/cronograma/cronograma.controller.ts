import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaDto } from './dto/cronograma.dto';
import { ICronograma } from './dto/cronograma.model';

@Controller('cronograma')
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) {}

  @Post()
  async crear(@Body() crearCronogramaDto: CronogramaDto): Promise<ICronograma> {
    return await this.cronogramaService.crear(crearCronogramaDto);
  }

  @Get()
  async consultarTodos(): Promise<ICronograma[]> {
    return await this.cronogramaService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(
    @Body() @Param('id') id: string,
  ): Promise<ICronograma | null> {
    return await this.cronogramaService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarCronogramaDto: Partial<CronogramaDto>,
  ): Promise<ICronograma | null> {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.cronogramaService.eliminar(id);
  }
}
