import { AuthMiddleware } from './auth/auth.middleware';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ProcatModule } from './procat/procat.module';
import { ProductModule } from './product/product.module';
import { OrtailModule } from './ortail/ortail.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    CustomerModule,
    OrderModule,
    ProcatModule,
    ProductModule,
    OrtailModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/token', method: RequestMethod.POST })
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'customers', method: RequestMethod.GET },
      );
  }
}
