import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { users } from './../../models/users';
// import { AuthService } from '../auth/auth.service';s
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([users]), forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
