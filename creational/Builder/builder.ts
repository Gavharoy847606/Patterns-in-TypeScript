
type DrinkKind = "ESPRESSO" | "GREEN_TEA" | "CAPPUCCINO";

class Order {
  name = "";
  drink: DrinkKind | null = null;
  dessert = "";
  price = 0;

  toString(): string {
    return `Order{name='${this.name}', drink=${this.drink}, dessert='${this.dessert}', price=${this.price}}`;
  }
}

abstract class OrderBuilder {
  protected order!: Order;

  createOrder(): void {
    this.order = new Order();
  }

  abstract buildName(): void;
  abstract buildDrink(): void;
  abstract buildDessert(): void;
  abstract buildPrice(): void;

  getOrder(): Order {
    return this.order;
  }
}

class BreakfastOrderBuilder extends OrderBuilder {
  buildName() {
    this.order.name = "Nonushta kombo";
  }
  buildDrink() {
    this.order.drink = "ESPRESSO";
  }
  buildDessert() {
    this.order.dessert = "Kruassan";
  }
  buildPrice() {
    this.order.price = 25000;
  }
}

class BusinessLunchOrderBuilder extends OrderBuilder {
  buildName() {
    this.order.name = "Biznes lanch";
  }
  buildDrink() {
    this.order.drink = "GREEN_TEA";
  }
  buildDessert() {
    this.order.dessert = "Tiramisu";
  }
  buildPrice() {
    this.order.price = 60000;
  }
}

class Cashier {
  private builder!: OrderBuilder;

  setBuilder(builder: OrderBuilder): void {
    this.builder = builder;
  }

  buildOrder(): Order {
    this.builder.createOrder();
    this.builder.buildName();
    this.builder.buildDrink();
    this.builder.buildDessert();
    this.builder.buildPrice();
    return this.builder.getOrder();
  }
}

const cashier = new Cashier();

cashier.setBuilder(new BreakfastOrderBuilder());
console.log(cashier.buildOrder().toString());

cashier.setBuilder(new BusinessLunchOrderBuilder());
console.log(cashier.buildOrder().toString());