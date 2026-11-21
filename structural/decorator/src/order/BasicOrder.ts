import { loggedMethod } from "../logging/loggedMethod";
import type { Order } from "./Order";

export class BasicOrder implements Order {
  constructor(
    private readonly productName: string,
    private readonly price: number,
  ) {}

  getDescription(): string {
    return this.productName;
  }

  @loggedMethod
  getPrice(): number {
    return this.price;
  }
}