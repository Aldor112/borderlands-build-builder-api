import { Controller, UseGuards } from '@nestjs/common';
import { Get, Post, Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginUser } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create')
  createUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @Post('login')
  loginUser(@Body() user: LoginUser) {
    return this.authService.loginUser(user.email, user.password);
  }

  /*@ApiBearerAuth()
  @ApiOperation({ summary: 'test endpoint to test' })
  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return 'workds';
  }*/
}
