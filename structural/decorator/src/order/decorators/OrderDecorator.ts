import type { Order } from "../Order";

export abstract class OrderDecorator implements Order {
  constructor(protected readonly order: Order) {}

  getDescription(): string {
    return this.order.getDescription();
  }

  getPrice(): number {
    return this.order.getPrice();
  }
}