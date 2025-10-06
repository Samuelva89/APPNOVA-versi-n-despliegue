import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizDto } from './dto/aprendiz.dto';
import { IAprendiz } from './dto/aprendiz.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('aprendiz')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearAprendizDto: AprendizDto): Promise<IAprendiz> {
    return await this.aprendizService.crear(crearAprendizDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
//   @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarTodos(): Promise<IAprendiz[]> {
    return await this.aprendizService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
//   @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarPorId(@Param('id') id: string): Promise<IAprendiz> {
    return await this.aprendizService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: AprendizDto,
  ): Promise<IAprendiz> {
    return await this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
//   @Roles(UserRole.LIDER_DE_PROYECTO)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarAprendizDto: Partial<AprendizDto>,
  ): Promise<IAprendiz> {
    return await this.aprendizService.actualizar(id, actualizarAprendizDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string): Promise<void> {
    await this.aprendizService.eliminar(id);
  }
}