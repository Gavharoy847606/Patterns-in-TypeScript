export type TicketLevel = 1 | 2 | 3 | 4;

export class Ticket {
  constructor(
    readonly id: number,
    readonly message: string,
    readonly level: TicketLevel,
  ) {}
}