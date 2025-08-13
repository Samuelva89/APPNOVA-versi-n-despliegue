import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { IUser } from './dto/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<IUser>) {}

  async crear(crearUserDto: UserDto): Promise<IUser> {
    const respuesta = new this.userModel(crearUserDto);
    return await respuesta.save();
  }

  async consultaTodos(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async consultarPorId(id: string): Promise<IUser | null> {
    return await this.userModel.findById(id).exec();
  }

  async actualizar(
    id: string,
    actualizarUserDto: Partial<UserDto>,
  ): Promise<IUser | null> {
    return await this.userModel
      .findByIdAndUpdate(id, actualizarUserDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async eliminar(id: string): Promise<IUser | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
