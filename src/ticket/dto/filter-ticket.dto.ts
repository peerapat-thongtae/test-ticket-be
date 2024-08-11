import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from '../constraints/enum';

export class FilterTicketDto {
  @IsOptional()
  @IsEnum(StatusEnum, { each: true })
  statuses?: StatusEnum[];

  @IsOptional()
  sort_by?: 'status' | 'latest_update';
}
