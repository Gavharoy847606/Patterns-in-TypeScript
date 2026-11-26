import { SupportHandler } from "./SupportHandler";
import type { Ticket } from "./Ticket";

const HANDLED_LEVEL = 2;

export class Operator extends SupportHandler {
  protected canHandle(ticket: Ticket): boolean {
    return ticket.level === HANDLED_LEVEL;
  }

  protected process(ticket: Ticket): void {
    console.log(`[Operator] Tiket #${ticket.id} hal qilindi: ${ticket.message}`);
  }
}