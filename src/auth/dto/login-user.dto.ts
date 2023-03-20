import { ApiProperty } from '@nestjs/swagger';

export class LoginUser {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
