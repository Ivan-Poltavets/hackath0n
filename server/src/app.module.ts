import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { config } from './configs/main.config';
import { DatabaseConfig } from './db.service';
import { LocationModule } from './location/location.module';
import {
  LoginValidationMiddleware,
  RegisterValidationMiddleware,
} from './middlewares';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UserModule,
    LocationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes({
      path: 'users/login',
      method: RequestMethod.POST,
    });
    consumer.apply(RegisterValidationMiddleware).forRoutes({
      path: 'users/register',
      method: RequestMethod.POST,
    });
  }
}
