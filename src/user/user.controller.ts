import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from './user';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('create')
  async createUser(@Body() createUser: CreateUser) {
    try {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(createUser.password, salt);

      this.userService.createUser({
        ...createUser,
        password: passHash,
      });

      return {
        status: 'Success',
        message: 'Successfully created user',
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getUsers() {
    try {
      return this.userService.getUsers();
    } catch (error) {
      return error;
    }
  }

  @Get('byid/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('byun/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Put('edit/:id')
  async updateUser(@Param('id') id: number, @Body() updateUser: UpdateUser) {
    try {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(updateUser.password, salt);
      updateUser.password = passHash;
      await this.userService.updateUser(id, updateUser);
      return {
        status: 'Success',
        message: 'Successfully updated user',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number) {
    try {
      await this.userService.deleteUser(id);
      return {
        status: 'Success',
        message: 'Successfully deleted user',
      };
    } catch (error) {
      return error;
    }
  }

  @Post('register')
  async registerUser(@Body() user: CreateUser): Promise<any> {
    return await this.authService.createAuthUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Body() user: CreateUser): Promise<any> {
    return await this.authService.loginUser(user);
  }
}
