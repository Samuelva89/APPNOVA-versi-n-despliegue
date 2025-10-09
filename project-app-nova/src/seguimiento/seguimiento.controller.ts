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
import { SeguimientoService } from './seguimiento.service';
import { ObservacionSegDto } from './dto/seguimiento.dto';
import { ISeguimiento } from './dto/seguimiento.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('seguimiento')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class seguimientoController {
  constructor(private readonly seguimientoService: SeguimientoService) {}

  @Post()
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  @HttpCode(HttpStatus.CREATED)
  async crear(
    @Body() crearObservacionSegDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.crear(crearObservacionSegDto);
  }

  @Get()
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
    UserRole.LIDER_DE_SEMILLERO,
  )
  async consultarTodos(): Promise<ISeguimiento[]> {
    return await this.seguimientoService.consultarTodos();
  }

  @Get(':id')
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
    UserRole.LIDER_DE_SEMILLERO,
  )
  async consultarID(@Param('id') id: string): Promise<ISeguimiento> {
    return await this.seguimientoService.consultarID(id);
  }

  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: ObservacionSegDto,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.actualizar(id, actualizarDto);
  }

  @Patch(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarDto: Partial<ObservacionSegDto>,
  ): Promise<ISeguimiento> {
    return await this.seguimientoService.actualizar(id, actualizarDto);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.seguimientoService.eliminar(id);
  }
}