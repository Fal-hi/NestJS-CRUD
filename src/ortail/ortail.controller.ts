import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { OrtailService } from './ortail.service';
import { CreateOrtailDto } from './dto/create-ortail.dto';
import { UpdateOrtailDto } from './dto/update-ortail.dto';

@Controller('ortails')
export class OrtailController {
  constructor(private readonly ortailService: OrtailService) {}

  @Post('create')
  async createOrtail(@Body() createOrtailDto: CreateOrtailDto) {
    try {
      const ortail = await this.ortailService.createOrtail({
        ...createOrtailDto,
      });
      if (ortail) {
        return {
          status: HttpStatus.CREATED,
          data: ortail,
        };
      } else {
        return {
          status: HttpStatus.NOT_IMPLEMENTED,
          message: 'Failed to created order detail',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const ortail = await this.ortailService.findAllOrtails();
      return {
        status: HttpStatus.FOUND,
        data: ortail,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Get('byid/:id')
  async findOrtailById(@Param('id') id: number) {
    try {
      const ortail = await this.ortailService.findOrtailById(id);
      if (ortail) {
        return {
          status: HttpStatus.FOUND,
          data: ortail,
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Order detail not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Put('edit/:id')
  async updateOrtail(
    @Param('id') id: number,
    @Body() updateOrtailDto: UpdateOrtailDto,
  ) {
    try {
      await this.ortailService.updateOrtail(id, updateOrtailDto);

      return {
        status: HttpStatus.ACCEPTED,
        message: 'Successfully order detail',
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error,
      };
    }
  }

  @Delete(':id')
  async removeOrtail(@Param('id') id: number) {
    try {
      const ortail = await this.ortailService.removeOrtail(id);
      if (ortail) {
        return {
          status: HttpStatus.OK,
          message: 'Successfully deleted order detail',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Order detail not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      };
    }
  }
}
