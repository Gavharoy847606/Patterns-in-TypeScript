import { ChatBot } from "./ChatBot";
import { Manager } from "./Manager";
import { Operator } from "./Operator";
import type { SupportHandler } from "./SupportHandler";
import { Ticket } from "./Ticket";

function buildSupportChain(): SupportHandler {
  const bot = new ChatBot();
  const operator = new Operator();
  const manager = new Manager();

  bot.setNext(operator).setNext(manager);

  return bot;                              // boshlanishi
}

function main(): void {
  const support = buildSupportChain();

  const tickets = [
    new Ticket(1, "Parolni qanday o'zgartiraman?", 1),
    new Ticket(2, "To'lov o'tmadi", 2),
    new Ticket(3, "Pulni qaytarish", 3),
    new Ticket(4, "Ma'lumotlar sizib chiqdi", 4),
  ];

  tickets.forEach((ticket) => support.handle(ticket));
}

main();