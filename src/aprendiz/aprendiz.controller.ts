import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch, // 👈 Importamos Patch
  HttpCode, // 👈 Importamos HttpCode
  HttpStatus, // 👈 Importamos HttpStatus
} from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizDto } from './dto/aprendiz.dto';
import { IAprendiz } from './dto/aprendiz.model';

@Controller('aprendiz')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearAprendizDto: AprendizDto): Promise<IAprendiz> {
    return await this.aprendizService.crear(crearAprendizDto);
  }

  @Get()
  async consultarTodos(): Promise<IAprendiz[]> {
    return await this.aprendizService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<IAprendiz> {
    return await this.aprendizService.consultarPorId(id);
  }

  @Put(':id') // 👈 PUT para actualización completa
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: AprendizDto,
  ): Promise<IAprendiz> {
    return await this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Patch(':id') // 👈 PATCH para actualización parcial
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: Partial<AprendizDto>,
  ): Promise<IAprendiz> {
    return await this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content en caso de éxito
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.aprendizService.eliminar(id);
  }
}