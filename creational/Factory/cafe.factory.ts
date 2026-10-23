
interface Drink {
  prepare(): void;
}

class Espressoo implements Drink {
  prepare() {
    console.log("Espresso tayyorlandi");
  }
}

class GreeenTea implements Drink {
  prepare() {
    console.log("Yashil choy damlandi");
  }
}

interface DrinkFactory {
  createDrink(): Drink;
}

class EspressoFactory implements DrinkFactory {
  createDrink(): Drink {
    return new Espresso();
  }
}

class GreenTeaFactory implements DrinkFactory {
  createDrink(): Drink {
    return new GreenTea();
  }
}

type DrinkType = "espresso" | "green-tea";

function getDrinkFactory(type: DrinkType): DrinkFactory {
  switch (type) {
    case "espresso":
      return new EspressoFactory();
    case "green-tea":
      return new GreenTeaFactory();
  }
}

const factory = getDrinkFactory("green-tea");
const drink = factory.createDrink();
drink.prepare();


/**Factory va Abstract Factory’ni yonma-yon ko’ring

E’tibor bering, bugungi koddagi Espresso va GreenTea bilan oldingi darsdagi Espresso va GreenTea bir xil klasslar. Farq faqat factory’da:

Factory (bugun): EspressoFactory faqat bitta narsa yaratadi, ya’ni ichimlik.
Abstract Factory (oldingi dars): ItalianCafeFactory uchta narsani (ichimlik, shirinlik, idish) birgalikda yaratadi.

Ya’ni Abstract Factory aslida “bir nechta mos Factory’ni bitta guruhga yig’ish”. Bu bog’lanishni tushunsangiz,
ikki pattern o’rtasidagi chalkashlik yo’qoladi. */
