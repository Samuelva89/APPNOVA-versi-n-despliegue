import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { ObservacionSegDto } from './dto/seguimiento.dto';
import { ISeguimiento } from './dto/seguimiento.model';

@Controller('seguimiento')
export class seguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() crearObservacionSegDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.crear(crearObservacionSegDto);
  }

  @Get()
  async consultarTodos(): Promise<ISeguimiento[]> {
    return await this.seguimientoService.consultarTodos();
  }

  @Get(':id')
  async consultarID(@Param('id') id: string): Promise<ISeguimiento> {
    return await this.seguimientoService.consultarID(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.actualizar(id, actualizarDto);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarDto: Partial<ObservacionSegDto>,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.seguimientoService.eliminar(id);
  }
}