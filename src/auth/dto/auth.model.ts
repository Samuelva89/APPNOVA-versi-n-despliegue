import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Auth extends Document {
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({
  timestamps: true,
  versionKey: false
})
export class AuthModel {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    default: 'user'
  })
  role: string;

  @Prop({
    type: Boolean,
    default: true
  })
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);

