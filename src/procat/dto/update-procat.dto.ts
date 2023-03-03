import { PartialType } from '@nestjs/mapped-types';
import { CreateProcatDto } from './create-procat.dto';

export class UpdateProcatDto extends PartialType(CreateProcatDto) {}
