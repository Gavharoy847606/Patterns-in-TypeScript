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

  createOrder(): this {
    this.order = new Order();
    return this;
  }

  abstract buildName(): this;
  abstract buildDrink(): this;
  abstract buildDessert(): this;
  abstract buildPrice(): this;

  getOrder(): Order {
    return this.order;
  }
}

class BreakfastOrderBuilder extends OrderBuilder {
  buildName() {
    this.order.name = "Nonushta kombo";
    return this;
  }
  buildDrink() {
    this.order.drink = "ESPRESSO";
    return this;
  }
  buildDessert() {
    this.order.dessert = "Kruassan";
    return this;
  }
  buildPrice() {
    this.order.price = 25000;
    return this;
  }
}

class BusinessLunchOrderBuilder extends OrderBuilder {
  buildName() {
    this.order.name = "Biznes lanch";
    return this;
  }
  buildDrink() {
    this.order.drink = "GREEN_TEA";
    return this;
  }
  buildDessert() {
    this.order.dessert = "Tiramisu";
    return this;
  }
  buildPrice() {
    this.order.price = 60000;
    return this;
  }
}

class Cashier {
  private builder!: OrderBuilder;

  setBuilder(builder: OrderBuilder): void {
    this.builder = builder;
  }

  buildOrder(): Order {
    return this.builder
      .createOrder()
      .buildName()
      .buildDrink()
      .buildDessert()
      .buildPrice()
      .getOrder();
  }
}

const cashier = new Cashier();

cashier.setBuilder(new BreakfastOrderBuilder());
console.log(cashier.buildOrder().toString());

cashier.setBuilder(new BusinessLunchOrderBuilder());
console.log(cashier.buildOrder().toString());

/**
 * Farq: metod ishini tugatgach nima qaytarishida.
 * void: kassir “yozib oldim” deb jim bo’ladi. Keyingi buyurtma uchun uni qaytadan chaqirasiz.
this: kassir “yozib oldim, yana nima?” deb sizga qarab turadi. Davom ettirasiz: “espresso... kruassan... hisob”.
 void: “hech narsa qaytarmayman”
typescript
class A {
  buildName(): void {
    this.name = "Nonushta";
    // hech narsa qaytmaydi
  }
}

const b = new A();
b.buildName();          // ishladi, lekin natija yo'q
b.buildName().buildDrink();  // xato: void ichida buildDrink yo'q

buildName() ishini bajaradi va tugaydi. Natijada qo’lingizda hech narsa qolmaydi (undefined), shuning uchun undan keyin nuqta qo’yib boshqa metodni chaqira olmaysiz. Har safar obyektning nomini qaytadan yozishga to’g’ri keladi:

typescript
b.buildName();
b.buildDrink();
b.buildPrice();
this: “obyektning o’zini qaytaraman”
typescript
class A {
  buildName(): this {
    this.name = "Nonushta";
    return this;        // o'zimni qaytaraman
  }
}

b.buildName().buildDrink().buildPrice();   // ishlaydi

return this degani: “ishimni qildim, endi obyektning o’zini qaytaryapman”. Qaytgan narsa yana o’sha b, shuning uchun darhol keyingi metodni chaqirsa bo’ladi.


*/