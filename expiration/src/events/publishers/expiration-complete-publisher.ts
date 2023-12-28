import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@mxticketing/common";

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
