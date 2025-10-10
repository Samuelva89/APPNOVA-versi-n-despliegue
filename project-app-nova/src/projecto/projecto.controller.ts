import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  HttpStatus,
  UseGuards,
  Req
} from '@nestjs/common';
import { ProjectoService } from './projecto.service';
import { ProjectoDto } from './dto/projecto.dto';
import { IProjecto } from './dto/projecto.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('projecto')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async crear(@Body() crearProjectoDto: ProjectoDto, @Req() req:any): Promise<any> {
    return await this.ProjectoService.crear(crearProjectoDto, req.user);
  }

  @Get()
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
    UserRole.LIDER_DE_SEMILLERO,
  )
  async consultarTodos(@Req() req:any): Promise<IProjecto[]> {
    return await this.ProjectoService.consultarTodos(req.user);
  }

  @Get(':id')
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
    UserRole.LIDER_DE_SEMILLERO,
  )
  async consultarPorId(@Param('id') id: string, @Req() req:any): Promise<IProjecto> {
    return await this.ProjectoService.consultarPorId(id, req.user);
  }

  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: ProjectoDto,
    @Req() req: any,
  ): Promise<any> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto, req.user);
  }

  @Patch(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<ProjectoDto>,
    @Req() req: any,
  ): Promise<any> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async eliminar(@Param('id') id: string, @Req() req:any): Promise<any> {
    return await this.ProjectoService.eliminar(id, req.user);
  }
}