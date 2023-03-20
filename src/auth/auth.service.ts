import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserExceptions } from 'src/common/exceptions/user.exceptions';
import { Utils } from 'src/common/utils/utils.utils';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private utilsSvc: Utils,
    private jwtSvc: JwtService,
  ) {}

  async registerUser(userDto: RegisterUserDto) {
    const email = userDto.email.toLocaleLowerCase();
    const verifyUser = await this.userModel.findOne({ email: email });

    if (verifyUser) {
      throw UserExceptions.UserExist;
    }

    const hash = await this.utilsSvc.hashPassword(userDto.password);

    const user = await this.userModel.create({
      email: userDto.email,
      nickName: userDto.nickName,
      password: hash,
    });

    return {
      id: user._id,
      email: user.email,
      nickname: user.nickName,
    };
  }

  async loginUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw UserExceptions.UserNotExist;
    }

    const isPasswordValid = await this.utilsSvc.checkPassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw UserExceptions.InvalidPassword;
    }

    const payload = {
      userId: user._id,
    };

    const access_token = this.jwtSvc.sign(payload);
    const returned = {
      access_token,
      user: {
        id: user._id,
        nickname: user.nickName,
        email: user.email,
      },
    };

    return returned;
  }
}
