import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from './dto/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async crear(crearUserDto: UserDto) {
    const { email, password, ...restOfDto } = crearUserDto;

    const userExistente = await this.userModel.findOne({ email }).exec();
    if (userExistente) {
      throw new ConflictException(`El usuario con el email "${email}" ya existe.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUser = new this.userModel({
      ...restOfDto,
      email,
      password: hashedPassword,
      roles: crearUserDto.roles, // Añadir roles desde el DTO
    });

    const userGuardado = await nuevoUser.save();
    const result = (userGuardado as any).toObject();
    delete result.password;

    return {
      message: 'Usuario creado con éxito.',
      data: result,
    };
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }

  async consultarTodos(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }
    return user;
  }

  async actualizar(id: string, actualizarUserDto: Partial<UserDto>) {
    const { password } = actualizarUserDto;
    if (password) {
      const salt = await bcrypt.genSalt();
      actualizarUserDto.password = await bcrypt.hash(password, salt);
    }
    
    const userActualizado = await this.userModel
      .findByIdAndUpdate(id, actualizarUserDto, { new: true, runValidators: true })
      .exec();

    if (!userActualizado) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }

    const result = (userActualizado as any).toObject();
    delete result.password;

    return {
      message: 'Usuario actualizado con éxito.',
      data: result,
    };
  }

  async eliminar(id: string) {
    const userEliminado = await this.userModel.findByIdAndDelete(id).exec();
    if (!userEliminado) {
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado.`);
    }
    return {
      message: `Usuario con ID "${id}" eliminado con éxito.`,
    };
  }
}
