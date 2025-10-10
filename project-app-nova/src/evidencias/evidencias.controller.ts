import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EvidenciasService } from './evidencias.service';
import { IEvidencia } from './dto/evidencias.model';
import { CreateEvidenciaDto } from './dto/evidencias.dto'; // Usamos el nuevo DTO
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('evidencias')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EvidenciasController {
  constructor(private readonly evidenciaService: EvidenciasService) {}

  @Post('upload')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  @UseInterceptors(FileInterceptor('archivo'))
  async uploadEvidencia(
    @UploadedFile() file: Express.Multer.File, 
    @Body() createEvidenciaDto: CreateEvidenciaDto, 
    @Req() req: any, 
  ): Promise<any> { // Se cambia el tipo de retorno a any para aceptar la respuesta estandarizada
    const userId = req.user.id; 
    return await this.evidenciaService.crear(createEvidenciaDto, file, userId);
  }

  @Get()
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.LIDER_DE_SEMILLERO,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
  )
  async consultarTodos(): Promise<IEvidencia[]> {
    return await this.evidenciaService.consultarTodos();
  }

  @Get(':id')
  @Roles(
    UserRole.LIDER_DE_PROYECTO,
    UserRole.DINAMIZADOR,
    UserRole.LIDER_DE_SEMILLERO,
    UserRole.COINVESTIGADOR,
    UserRole.INVESTIGADOR,
  )
  async consultarporID(@Param('id') id: string): Promise<IEvidencia> {
    return await this.evidenciaService.consultarPorId(id);
  }

  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: Partial<CreateEvidenciaDto>,
  ): Promise<any> { // Se cambia el tipo de retorno a any
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR, UserRole.LIDER_DE_SEMILLERO)
  async eliminar(@Param('id') id: string): Promise<any> { // Se cambia el tipo y se elimina @HttpCode
    return await this.evidenciaService.eliminar(id);
  }
}