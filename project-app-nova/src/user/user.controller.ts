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
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { IUser } from './dto/user.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async crear(@Body() crearUserDto: UserDto): Promise<IUser> {
    return await this.userService.crear(crearUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO)
  async consultarTodos(): Promise<IUser[]> {
    return await this.userService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO)
  async consultarPorId(@Param('id') id: string): Promise<IUser> {
    return await this.userService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarUserDTO: UserDto,
  ): Promise<IUser> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarUserDTO: Partial<UserDto>,
  ): Promise<IUser> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async eliminar(@Param('id') id: string) {
    await this.userService.eliminar(id);
  }
}