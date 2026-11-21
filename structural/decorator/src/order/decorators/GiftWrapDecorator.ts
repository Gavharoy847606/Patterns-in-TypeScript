import { loggedMethod } from "../../logging/loggedMethod";
import { OrderDecorator } from "./OrderDecorator";

const GIFT_WRAP_PRICE = 15_000;

export class GiftWrapDecorator extends OrderDecorator {
  getDescription(): string {
    return `${super.getDescription()} + sovg'a qadoq`;
  }

  @loggedMethod
  getPrice(): number {
    return super.getPrice() + GIFT_WRAP_PRICE;
  }
}