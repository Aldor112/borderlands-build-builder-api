import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    {
      ...JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.EXPIRES_IN,
          },
        }),
      }),
      global: true,
    },
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
