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
import { UserService } from './user.service';
import { RegisterAuthDto } from 'src/auth/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/common/constants/roles.enum';
import { IUser } from './dto/user.model';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async crear(@Body() crearUserDto: RegisterAuthDto): Promise<any> { // <-- DTO Cambiado aquí
    return await this.userService.crear(crearUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async consultarTodos(): Promise<IUser[]> {
    return await this.userService.consultarTodos();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async consultarPorId(@Param('id') id: string): Promise<IUser> {
    return await this.userService.consultarPorId(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarUserDTO: UserDto,
  ): Promise<any> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarUserDTO: Partial<UserDto>,
  ): Promise<any> {
    return await this.userService.actualizar(id, actualizarUserDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.LIDER_DE_PROYECTO, UserRole.LIDER_DE_SEMILLERO)
  async eliminar(@Param('id') id: string): Promise<any> {
    return await this.userService.eliminar(id);
  }
}