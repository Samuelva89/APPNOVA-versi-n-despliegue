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
@UseGuards(AuthGuard('jwt'), RolesGuard) // Aplicamos los guards a todo el controlador
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}

  @Post()
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede crear
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearProjectoDto: ProjectoDto, @Req() req:any): Promise<IProjecto> {
    return await this.ProjectoService.crear(crearProjectoDto, req.user);
  }

  @Get()
  // Todos los roles autenticados pueden ver la lista de proyectos
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
  // Todos los roles autenticados pueden ver un proyecto específico
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
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede reemplazar todo el proyecto
  async actualizarCompleto(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: ProjectoDto,
  ): Promise<IProjecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto, Req);
  }

  @Patch(':id')
  // El líder, coinvestigador e investigador pueden "aportar información"
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarProjectoDto: Partial<ProjectoDto>,
    @Req() req: any,// pasar el usuario autenticado
  ): Promise<IProjecto> {
    return await this.ProjectoService.actualizar(id, actualizarProjectoDto, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO) // Solo el líder puede eliminar
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string, @Req() req:any) {
    await this.ProjectoService.eliminar(id, req.user);
  }
}