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
import { SemilleroService } from './semillero.service';
import { SemilleroDTO } from './dto/semilleros.dto';
import { ISemillero } from './dto/semillero.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('semillero')
export class SemilleroController {
  constructor(private readonly semilleroService: SemilleroService) {}

  // ===== POST - Crear semillero =====
  @Post()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearSemilleroDTO: SemilleroDTO): Promise<ISemillero> {
    return await this.semilleroService.crear(crearSemilleroDTO);
  }

  // ===== GET - Obtener todos los semilleros =====
  @Get()
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO)
  async consultarTodos(): Promise<ISemillero[]> {
    return await this.semilleroService.ConsultarTodos();
  }

  // ===== GET - Obtener semillero por ID =====
  @Get(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO)
  async consultarPorId(@Param('id') id: string): Promise<ISemillero> {
    return await this.semilleroService.consultarID(id);
  }

  // ===== PUT - Actualizar semillero =====
  @Put(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  // @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarSemilleroDTO: SemilleroDTO,
  ): Promise<ISemillero> {
    return await this.semilleroService.actualizar(id, actualizarSemilleroDTO);
  }
  
  // ===== PATCH - Actualizar semillero parcialmente =====
  @Patch(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarSemilleroDTO: Partial<SemilleroDTO>,
  ): Promise<ISemillero> {
    return await this.semilleroService.actualizar(id, actualizarSemilleroDTO);
  }

  // ===== DELETE - Eliminar semillero =====
  @Delete(':id')
  @UseGuards(AuthGuard('jwt')/*, RolesGuard*/)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.semilleroService.eliminar(id);
  }
}