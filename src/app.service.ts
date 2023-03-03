import { Sequelize } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private sequalize: Sequelize) {}
  createHello(): string {
    return 'Create Hello Nestjs';
  }
  getHello(): string {
    return 'Hello Nestjs!';
  }
  getHelloById(): string {
    return 'Get Id Hello Nestjs';
  }
  updateHello(): string {
    return 'Update Hello Nestjs';
  }
  deleteHello(): string {
    return 'Delete Hello Nestjs';
  }
}
