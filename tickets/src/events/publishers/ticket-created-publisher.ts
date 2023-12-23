import { Publisher, Subjects, TicketCreatedEvent } from "@mxticketing/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{  
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}