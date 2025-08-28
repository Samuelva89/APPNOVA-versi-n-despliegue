import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { IUser } from './dto/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearUserDto: UserDto): Promise<IUser> {
    return await this.userService.crear(crearUserDto);
  }

  @Get()
  async consultarTodos(): Promise<IUser[]> {
    return await this.userService.consultarTodos();
  }

  @Get(':id')
  async consultarPorId(@Param('id') id: string): Promise<IUser> {
    return await this.userService.consultarPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarUserDTO: UserDto,
  ): Promise<IUser> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarUserDTO: Partial<UserDto>,
  ): Promise<IUser> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.userService.eliminar(id);
  }
}