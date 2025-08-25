import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectoService } from './projecto.service';
import { projectoDto } from './dto/projecto.dto';

@Controller('projecto')
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  async crear(@Body() crearProjectoDto: projectoDto) {
    return await this.ProjectoService.crear(crearProjectoDto);
  }

  @Get()
  async consultarTodos() {
    return await this.ProjectoService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Body() @Param('id') id: string) {
    return await this.ProjectoService.consultarPorId(id);
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<projectoDto>,
  ) {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.ProjectoService.eliminar(id);
  }
}
