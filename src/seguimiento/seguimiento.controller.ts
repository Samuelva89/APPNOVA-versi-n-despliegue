import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { ObservacionSegDto } from './dto/seguimiento.dto';
import { ISeguimiento } from './dto/seguimiento.model';

@Controller('seguimiento')
export class seguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  // Crear observación
  @Post()
  async crear(
    @Body() crearObservacionSegDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    return this.seguimientoService.crear(crearObservacionSegDto);
  }

  // Consultar todas las observaciones
  @Get()
  async consultarTodos(): Promise<ISeguimiento[]> {
    return this.seguimientoService.consultarTodos();
  }

  // Consultar observación por ID
  @Get(':id')
  async consultarID(@Param('id') id: string): Promise<ISeguimiento | null> {
    return this.seguimientoService.consultarID(id);
  }

  // Actualizar observación por ID
  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: Partial<ObservacionSegDto>,
  ): Promise<ISeguimiento | null> {
    return this.seguimientoService.actualizar(id, actualizarDto);
  }

  // Eliminar observación por ID
  @Delete(':id')
  async eliminar(@Param('id') id: string): Promise<ISeguimiento | null> {
    return this.seguimientoService.eliminar(id);
  }
}
