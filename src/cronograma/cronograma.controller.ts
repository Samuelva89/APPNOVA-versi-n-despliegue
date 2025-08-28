import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaDto } from './dto/cronograma.dto';
import { ICronograma } from './dto/cronograma.model';

@Controller('cronograma')
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearCronogramaDto: CronogramaDto): Promise<ICronograma> {
    return await this.cronogramaService.crear(crearCronogramaDto);
  }

  @Get()
  async consultarTodos(): Promise<ICronograma[]> {
    return await this.cronogramaService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<ICronograma> {
    return await this.cronogramaService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarCronogramaDto: CronogramaDto,
  ): Promise<ICronograma> {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarCronogramaDto: Partial<CronogramaDto>,
  ): Promise<ICronograma> {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.cronogramaService.eliminar(id);
  }
}