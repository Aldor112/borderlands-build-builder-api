import * as mongoose from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const types = mongoose.Schema.Types;

export type UserDocument = User & mongoose.Document;
@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: types.String })
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: types.String })
  nickName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: types.String })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
