import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EvidenciasService } from './evidencias.service';
import { IEvidencia } from './dto/evidencias.model';
import { EvidenciaDto } from './dto/evidencias.dto';

@Controller('evidencias')
export class EvidenciasController {
  constructor(private readonly evidenciaService: EvidenciasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearEvidenciaDto: EvidenciaDto): Promise<IEvidencia> {
    return await this.evidenciaService.crear(crearEvidenciaDto);
  }

  @Get()
  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaService.consultarTodos();
  }

  @Get(':id')
  async consultarporID(@Param('id') id: string): Promise<IEvidencia> {
    return await this.evidenciaService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: EvidenciaDto,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: Partial<EvidenciaDto>,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.evidenciaService.eliminar(id);
  }
}