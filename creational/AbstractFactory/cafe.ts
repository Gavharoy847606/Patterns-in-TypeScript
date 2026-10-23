// cafe.ts

interface Drink {
  prepare(): void;
}
interface Dessert {
  serve(): void;
}
interface Tableware {
  place(): void;
}

class Espresso implements Drink {
  prepare() {
    console.log("Espresso tayyorlandi");
  }
}
class Tiramisu implements Dessert {
  serve() {
    console.log("Tiramisu keltirildi");
  }
}
class EspressoCup implements Tableware {
  place() {
    console.log("Kichik espresso chashkasi qo'yildi");
  }
}

class GreenTea implements Drink {
  prepare() {
    console.log("🍵 Yashil choy damlandi");
  }
}
class ChakChak implements Dessert {
  serve() {
    console.log("Chak-chak keltirildi");
  }
}
class Piyola implements Tableware {
  place() {
    console.log("Piyola qo'yildi");
  }
}

interface CafeFactory {
  createDrink(): Drink;
  createDessert(): Dessert;
  createTableware(): Tableware;
}

class ItalianCafeFactory implements CafeFactory {
  createDrink(): Drink {
    return new Espresso();
  }
  createDessert(): Dessert {
    return new Tiramisu();
  }
  createTableware(): Tableware {
    return new EspressoCup();
  }
}

class ChaikhonaFactory implements CafeFactory {
  createDrink(): Drink {
    return new GreenTea();
  }
  createDessert(): Dessert {
    return new ChakChak();
  }
  createTableware(): Tableware {
    return new Piyola();
  }
}

// ===== 5. Mijoz kodi (ErpProject.main o'rniga) =====
function serveSet(factory: CafeFactory) {
  const tableware = factory.createTableware();
  const drink = factory.createDrink();
  const dessert = factory.createDessert();

  tableware.place();
  drink.prepare();
  dessert.serve();
}

function getCafeFactory(type: "italian" | "chaikhona"): CafeFactory {
  switch (type) {
    case "italian":
      return new ItalianCafeFactory();
    case "chaikhona":
      return new ChaikhonaFactory();
  }
}

serveSet(getCafeFactory("italian"));
console.log("---");
serveSet(getCafeFactory("chaikhona"));