import { IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  title: string;

  description: string;
  contact: string;
}
