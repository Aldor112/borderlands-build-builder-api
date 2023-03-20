import { HttpException, HttpStatus } from '@nestjs/common';
import { InternalCodes } from '../enums/internal-codes.enum';

export const UserExceptions = {
  UserExist: new HttpException(
    { message: 'Usuario Ya Existe', internalCode: InternalCodes.UserExist },
    HttpStatus.BAD_REQUEST,
  ),
  UserNotExist: new HttpException(
    { message: 'Usuario no Existe', internalCode: InternalCodes.UserNotExist },
    HttpStatus.BAD_REQUEST,
  ),
  InvalidPassword: new HttpException(
    { message: 'Contraseña invalida', internalCode: InternalCodes.BadPassword },
    HttpStatus.BAD_REQUEST,
  ),
};
