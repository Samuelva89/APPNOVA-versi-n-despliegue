import { Controller } from '@nestjs/common';
import { ProjectoService } from './projecto.service';

@Controller('projecto')
export class ProjectoController {
  constructor(private readonly ProjectoService: ProjectoService) {}
}
