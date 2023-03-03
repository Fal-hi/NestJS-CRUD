import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.loginUser(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getHello(@Request() req) {
    return req.user;
  }

  // @Post()
  // createHello(): string {
  //   return this.appService.createHello();
  // }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/byId')
  // getHelloById(): string {
  //   return this.appService.getHelloById();
  // }

  // @Put()
  // updateHello(): string {
  //   return this.appService.updateHello();
  // }

  // @Delete()
  // deleteHello(): string {
  //   return this.appService.deleteHello();
  // }
}
