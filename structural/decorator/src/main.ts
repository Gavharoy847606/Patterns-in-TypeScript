import { BasicOrder } from "./order/BasicOrder";
import type { Order } from "./order/Order";
import { ExpressDeliveryDecorator } from "./order/decorators/ExpressDeliveryDecorator";
import { GiftWrapDecorator } from "./order/decorators/GiftWrapDecorator";

function printOrder(order: Order): void {
  console.log(`${order.getDescription()}: ${order.getPrice()} so'm`);
}

function main(): void {
  let order: Order = new BasicOrder("Noutbuk", 5_000_000);
  order = new GiftWrapDecorator(order);
  order = new ExpressDeliveryDecorator(order);

  printOrder(order);
}

main();