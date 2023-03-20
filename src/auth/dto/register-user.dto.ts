import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickName: string;
  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
