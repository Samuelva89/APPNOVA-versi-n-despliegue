import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InstructoresService } from './instructores.service';
import { instructoresDto } from './dto/instructores.dto';

@Controller('instructores')
export class InstructoresController {
  constructor(private readonly instructoresService: InstructoresService) {}

  @Post()
  async crear(@Body() crearInstructoresDto: instructoresDto) {
    return await this.instructoresService.crear(crearInstructoresDto);
  }

  @Get()
  async consultarTodos() {
    return await this.instructoresService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Body() @Param('id') id: string) {
    return await this.instructoresService.consultarPorId(id);
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarInstructoresDto: Partial<instructoresDto>,
  ) {
    return await this.instructoresService.actualizar(
      id,
      actualizarInstructoresDto,
    );
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.instructoresService.eliminar(id);
  }
}
