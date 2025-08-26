import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InstructoresService } from './instructores.service';
import { instructoresDto } from './dto/instructores.dto';
import { IInstructores } from './dto/instructores.model';

@Controller('instructores')
export class InstructoresController {
  constructor(private readonly instructoresService: InstructoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() crearInstructoresDto: instructoresDto,
  ): Promise<IInstructores> {
    return await this.instructoresService.crear(crearInstructoresDto);
  }

  @Get()
  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<IInstructores> {
    return await this.instructoresService.consultarPorId(id);
  }

  @Put(':id')
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarInstructoresDto: instructoresDto,
  ): Promise<IInstructores> {
    return await this.instructoresService.actualizar(
      id,
      actualizarInstructoresDto,
    );
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarInstructoresDto: Partial<instructoresDto>,
  ): Promise<IInstructores> {
    return await this.instructoresService.actualizar(
      id,
      actualizarInstructoresDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.instructoresService.eliminar(id);
  }
}