import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizDto } from './dto/aprendiz.dto';
import { IAprendiz } from './dto/aprendiz.model';

@Controller('aprendiz')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  async crear(@Body() crearAprendizDto: AprendizDto): Promise<IAprendiz> {
    return await this.aprendizService.crear(crearAprendizDto);
  }

  @Get()
  async consultarTodos(): Promise<IAprendiz[]> {
    return await this.aprendizService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(
    @Body() @Param('id') id: string,
  ): Promise<IAprendiz | null> {
    return await this.aprendizService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: Partial<AprendizDto>,
  ): Promise<IAprendiz | null> {
    return await this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string): Promise<IAprendiz | null> {
    return await this.aprendizService.eliminar(id);
  }
}
