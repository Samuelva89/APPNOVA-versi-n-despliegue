import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IAprendiz } from 'src/aprendiz/dto/aprendiz.model';
import { UserRole } from 'src/common/constants/roles.enum';
import { IInstructores } from 'src/instructores/dto/instructores.model';
import { ISemillero } from 'src/semillero/dto/semillero.model';

export interface IUser extends Document {
  nombreCompleto: string;
  email: string;
  password: string;
  roles: UserRole[];
  instructorId?: IInstructores;
  aprendizId?: IAprendiz;
  semilleroId?: ISemillero; // <-- Añadido para la relación
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  nombreCompleto: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [String],
    required: true,
    enum: UserRole,
    default: [UserRole.INVESTIGADOR], // Default role
  })
  roles: UserRole[];

  // CAMPOS AÑADIDOS PARA VINCULAR USER CON LOS DATOS
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Instructores',
    required: false,
    default: null,
  })
  instructorId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Aprendiz',
    required: false,
    default: null,
  })
  aprendizId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Semillero',
    required: false,
    default: null,
  })
  semilleroId: MongooseSchema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
