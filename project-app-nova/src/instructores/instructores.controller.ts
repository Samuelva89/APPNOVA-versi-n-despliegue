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
  UseGuards,
} from '@nestjs/common';
import { InstructoresService } from './instructores.service';
import { instructoresDto } from './dto/instructores.dto';
import { IInstructores } from './dto/instructores.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('instructores')
export class InstructoresController {
  constructor(private readonly instructoresService: InstructoresService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() crearInstructoresDto: instructoresDto,
  ): Promise<IInstructores> {
    return await this.instructoresService.crear(crearInstructoresDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarTodos(): Promise<IInstructores[]> {
    return await this.instructoresService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarPorId(@Param('id') id: string): Promise<IInstructores> {
    return await this.instructoresService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
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
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR)
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
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.instructoresService.eliminar(id);
  }
}