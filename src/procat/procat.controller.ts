import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProcatService } from './procat.service';
import { CreateProcatDto } from './dto/create-procat.dto';
import { UpdateProcatDto } from './dto/update-procat.dto';

@Controller('procats')
export class ProcatController {
  constructor(private readonly procatService: ProcatService) {}

  @Post('create')
  async createProcat(@Body() createProcatDto: CreateProcatDto) {
    try {
      const procat = await this.procatService.createProcat({
        ...createProcatDto,
      });
      if (procat) {
        return {
          status: HttpStatus.CREATED,
          message: 'Successfully created product category',
        };
      } else {
        return {
          status: HttpStatus.NOT_IMPLEMENTED,
          message: 'failed to created product category',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get()
  async findAllProcats() {
    try {
      const procats = await this.procatService.findAllProcats();
      return {
        status: HttpStatus.FOUND,
        data: procats,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get('byid/:id')
  async findProcatById(@Param('id') id: number) {
    try {
      const procat = await this.procatService.findProcatById(id);
      if (procat) {
        return {
          status: HttpStatus.FOUND,
          data: procat,
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product category not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error occurred while fetching product category',
        error: error.message,
      };
    }
  }

  @Get('byname/:name_category')
  async findProcateByName(@Param('name_category') name_category: string) {
    try {
      const procat = await this.procatService.findProcateByName(name_category);
      if (procat) {
        return {
          status: HttpStatus.FOUND,
          data: procat,
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product category not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error occurred while fetching product category',
        error: error.message,
      };
    }
  }

  @Put('edit/:id')
  async updateProcat(
    @Param('id') id: number,
    @Body() updateProcatDto: UpdateProcatDto,
  ) {
    try {
      await this.procatService.updateProcat(id, updateProcatDto);
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Successfully updates product category',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Delete('delete/:id')
  async removeProcat(@Param('id') id: number) {
    try {
      const procat = await this.procatService.removeProcat(id);
      if (procat) {
        return {
          status: HttpStatus.OK,
          message: 'Successfully deleted product category',
        };
      } else {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product category not found',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      };
    }
  }
}
