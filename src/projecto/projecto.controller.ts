import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectoService } from './projecto.service';
import { projectoDto } from './dto/projecto.dto';
import { Iprojecto } from './dto/projecto.model';

@Controller('projecto')
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearProjectoDto: projectoDto): Promise<Iprojecto> {
    return await this.ProjectoService.crear(crearProjectoDto);
  }

  @Get()
  async consultarTodos(): Promise<Iprojecto[]> {
    return await this.ProjectoService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<Iprojecto> {
    return await this.ProjectoService.consultarPorId(id);
  }

  @Put(':id')
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: projectoDto,
  ): Promise<Iprojecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<projectoDto>,
  ): Promise<Iprojecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.ProjectoService.eliminar(id);
  }
}