import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { StatusEnum } from '../constraints/enum';
import { IsEnum } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
