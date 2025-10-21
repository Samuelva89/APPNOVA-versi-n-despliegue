import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaDto } from './dto/cronograma.dto';
import { ICronograma } from './dto/cronograma.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('cronograma')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CronogramaController {
  constructor(private readonly cronogramaService: CronogramaService) {}

  @Post()
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async crear(@Body() crearCronogramaDto: CronogramaDto): Promise<any> {
    return await this.cronogramaService.crear(crearCronogramaDto);
  }

  @Get()
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarTodos(): Promise<ICronograma[]> {
    return await this.cronogramaService.consultarTodos();
  }

  @Get(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.DINAMIZADOR, UserRole.LIDER_DE_SEMILLERO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async consultarPorId(@Param('id') id: string): Promise<ICronograma> {
    return await this.cronogramaService.consultarPorId(id);
  }

  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarCronogramaDto: CronogramaDto,
  ): Promise<any> {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
  }

  @Patch(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarCronogramaDto: Partial<CronogramaDto>,
  ): Promise<any> {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_SEMILLERO)
  async eliminar(@Param('id') id: string): Promise<any> {
    return await this.cronogramaService.eliminar(id);
  }
}