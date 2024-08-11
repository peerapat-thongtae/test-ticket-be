import { StatusEnum } from '../constraints/enum';

export class Ticket {
  id: string; // uuid

  title: string;

  description: string;

  contact: string;

  status: StatusEnum;

  created_at: Date;

  updated_at: Date;
}
