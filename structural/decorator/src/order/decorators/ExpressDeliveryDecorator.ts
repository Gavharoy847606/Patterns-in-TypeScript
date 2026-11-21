import { loggedMethod } from "../../logging/loggedMethod";
import { OrderDecorator } from "./OrderDecorator";

const EXPRESS_DELIVERY_PRICE = 30_000;

export class ExpressDeliveryDecorator extends OrderDecorator {
  getDescription(): string {
    return `${super.getDescription()} + tezkor yetkazib berish`;
  }

  @loggedMethod
  getPrice(): number {
    return super.getPrice() + EXPRESS_DELIVERY_PRICE;
  }
}