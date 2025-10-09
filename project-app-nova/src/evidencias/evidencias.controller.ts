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

  /**
   * Endpoint para subir una nueva evidencia.
   * Utiliza FileInterceptor para procesar el archivo enviado en el campo 'archivo'.
   */
  @Post('upload')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  @UseInterceptors(FileInterceptor('archivo'))
  async uploadEvidencia(
    @UploadedFile() file: Express.Multer.File, // Inyecta el archivo procesado por Multer
    @Body() createEvidenciaDto: CreateEvidenciaDto, // Inyecta los datos del formulario
    @Req() req: any, // Inyecta la petición para obtener el usuario
  ): Promise<IEvidencia> {
    const userId = req.user.id; // Se asume que el Guard de JWT añade el usuario a la request
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

  // NOTA: La actualización (PUT/PATCH) de una evidencia que incluye un archivo
  @Put(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarEvidenciasDto: Partial<CreateEvidenciaDto>,
  ): Promise<IEvidencia> {
    return await this.evidenciaService.actualizar(id, actualizarEvidenciasDto);
  }

  @Delete(':id')
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.COINVESTIGADOR, UserRole.INVESTIGADOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.evidenciaService.eliminar(id);
  }
}