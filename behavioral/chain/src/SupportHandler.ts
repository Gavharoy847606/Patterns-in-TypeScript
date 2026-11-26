import type { Ticket } from "./Ticket";

export abstract class SupportHandler {
  private next: SupportHandler | null = null;

  setNext(next: SupportHandler): SupportHandler {
    this.next = next;
    return next;
  }

  handle(ticket: Ticket): void {
    if (this.canHandle(ticket)) {
      this.process(ticket);
      return;                              // 
    }

    if (this.next) {
      this.next.handle(ticket);            //
    } else {
      console.log(`Tiket #${ticket.id} hal qilinmadi!`);
    }
  }

  protected abstract canHandle(ticket: Ticket): boolean;
  protected abstract process(ticket: Ticket): void;
}