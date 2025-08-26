import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SemilleroService } from './semillero.service';
import { SemilleroDTO } from './dto/semilleros.dto';
import { ISemillero } from './dto/semillero.model';

@Controller('semillero')
export class SemilleroController {
  constructor(private readonly semilleroService: SemilleroService) {}

  // ===== POST - Crear semillero =====
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearSemilleroDTO: SemilleroDTO): Promise<ISemillero> {
    return await this.semilleroService.crear(crearSemilleroDTO);
  }

  // ===== GET - Obtener todos los semilleros =====
  @Get()
  async consultarTodos(): Promise<ISemillero[]> {
    return await this.semilleroService.ConsultarTodos();
  }

  // ===== GET - Obtener semillero por ID =====
  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<ISemillero> {
    return await this.semilleroService.consultarID(id);
  }

  // ===== PUT - Actualizar semillero =====
  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarSemilleroDTO: SemilleroDTO,
  ): Promise<ISemillero> {
    return await this.semilleroService.actualizar(id, actualizarSemilleroDTO);
  }
  
  // ===== PATCH - Actualizar semillero parcialmente =====
  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarSemilleroDTO: Partial<SemilleroDTO>,
  ): Promise<ISemillero> {
    return await this.semilleroService.actualizar(id, actualizarSemilleroDTO);
  }

  // ===== DELETE - Eliminar semillero =====
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.semilleroService.eliminar(id);
  }
}