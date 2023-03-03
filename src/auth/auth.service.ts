import { Injectable, HttpStatus } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
import { users } from 'models';
import { CreateAuthUserDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createAuthUser(createAuthUser: CreateAuthUserDto): Promise<users> {
    return await this.userService.createUser(createAuthUser);
  }

  async getAuthUser(): Promise<users[]> {
    return await this.userService.getUsers();
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.getUserByUsername(username);
      const isValid = await bcrypt.compare(pass, user.password);

      if (user && isValid) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to validation',
      };
    }
    // if (!user) {
    //   return {
    //     status: HttpStatus.UNAUTHORIZED,
    //     message: 'Username or password is incorrect',
    //   };
    // }

    // if (!isValid) {
    //   return {
    //     status: HttpStatus.UNAUTHORIZED,
    //     message: 'Username or password is incorrect',
    //   };
    // }
  }

  async loginUser(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
