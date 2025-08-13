import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async crear(@Body() crearUserDto: UserDto) {
    return await this.UserService.crear(crearUserDto);
  }

  @Get(':id')
  async consultarTodos() {
    return await this.UserService.consultaTodos();
  }

  @Get(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actializarUserDto: Partial<UserDto>,
  ) {
    return await this.UserService.actualizar(id, actializarUserDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return await this.UserService.eliminar(id);
  }
}
