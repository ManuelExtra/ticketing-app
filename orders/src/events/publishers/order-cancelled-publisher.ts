import { Subjects, OrderCancelledEvent, Publisher } from "@mxticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}