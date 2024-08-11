import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { randomUUID } from 'crypto';
import { StatusEnum } from './constraints/enum';
import { FilterTicketDto } from './dto/filter-ticket.dto';
import * as _ from 'lodash';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [];
  findOne(id: string): Ticket {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) {
      throw new NotFoundException(`This ticket id ${id} is not found`);
    }
    return ticket;
  }

  create(createTicketDto: CreateTicketDto): Ticket {
    const newTicket: Ticket = {
      id: randomUUID(),
      title: createTicketDto.title,
      description: createTicketDto.description,
      contact: createTicketDto.contact,
      status: StatusEnum.pending,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.tickets.push(newTicket);
    return newTicket;
  }

  update(id: string, updateTicketDto: UpdateTicketDto): Ticket {
    const ticket = this.findOne(id);

    if (updateTicketDto.title) {
      ticket.title = updateTicketDto.title;
    }

    if (updateTicketDto.description) {
      ticket.description = updateTicketDto.description;
    }

    if (updateTicketDto.contact) {
      ticket.contact = updateTicketDto.contact;
    }

    if (updateTicketDto.status) {
      ticket.status = updateTicketDto.status;
    }

    ticket.updated_at = new Date();
    return ticket;
  }

  findAll(filter?: FilterTicketDto) {
    let tickets = this.tickets;
    if (filter) {
      if (filter.statuses.length > 0) {
        tickets = this.tickets.filter((val) =>
          filter.statuses.includes(val.status),
        );
      }

      if (filter?.sort_by === 'status') {
        tickets = _.sortBy(tickets, 'status');
      }

      if (filter?.sort_by === 'latest_update') {
        tickets = _.sortBy(tickets, 'updated_at');
      }
    }
    return tickets;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
