import { PartialType } from '@nestjs/mapped-types';
import { CreateOrtailDto } from './create-ortail.dto';

export class UpdateOrtailDto extends PartialType(CreateOrtailDto) {}
