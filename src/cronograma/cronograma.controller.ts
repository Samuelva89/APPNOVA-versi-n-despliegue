import { Body, Controller, Param, Post, Get, Patch, Delete } from '@nestjs/common';
import { CronogramaService } from './cronograma.service';
import { CronogramaDto } from './dto/cronograma.dto';
import { ICronograma } from './dto/cronograma.model';

@Controller('cronograma')
export class CronogramaController {
    constructor( private readonly cronogramaService: CronogramaService) {}

    @Post()
    async crear (@Body() crearCronogramaDto: CronogramaDto) {
        return await this.cronogramaService.crear(crearCronogramaDto);
    }

    @Get()
    async consultarTodos() {
        return await this.cronogramaService.consultarTodos();
    }

    @Get(':id')
    async consultarTodosPorId(@Body() @Param('id') id: String) {
        return await this.cronogramaService.consultarPorId(id);
    }

    @Patch(':id')
    async actualizar( @Param('id') id: String, @Body() actualizarCronogramaDto: Partial<ICronograma>,
) {
    return await this.cronogramaService.actualizar(id, actualizarCronogramaDto);
}

    @Delete(':id')
    async eliminar(@Param('id') id: String) {
        return await this.cronogramaService.eliminar(id);
    }
}
