import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizDto } from './dto/aprendiz.dto';

@Controller('aprendiz')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  async crear(@Body() crearAprendizDto: AprendizDto) {
    return this.aprendizService.crear(crearAprendizDto);
  }

  @Get()
  async consultarTodos() {
    return this.aprendizService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string) {
    return this.aprendizService.consultarPorId(id);
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: Partial<AprendizDto>,
  ) {
    return this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.aprendizService.eliminar(id);
  }
}
