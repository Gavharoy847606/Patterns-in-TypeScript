# Patterns-in-TypeScript
Patternlar uch guruhga bo’linadi:  Creational (yaratuvchi): obyektlar qanday yaratiladi (Factory, Singleton, Builder) Structural (tuzilma): obyektlar qanday bog’lanadi (Adapter, Decorator, Facade) Behavioral (xulq): obyektlar qanday muloqot qiladi (Strategy, Observer, Command)


# Creational Design Patterns (TypeScript, Kafe misoli)

Bu fayl **obyekt yaratish** patternlarini tushuntiradi: Factory, Abstract Factory, Builder va Singleton.
Maqsad: kodni boshidan yoza olmasangiz ham, **har bir pattern nima uchun kerakligini** va **qachon ishlatilishini** aniq tushunish.

Hamma misollar bitta mavzuda: **kafe**.

---

## Eng avval: creational pattern nima?

Dasturda obyektlar `new` bilan yaratiladi. Kichik dasturda bu muammo emas. Lekin dastur kattalashganda:

- `new` yuzlab joyda yoziladi va birini o'zgartirsangiz hammasini tuzatishingiz kerak bo'ladi
- obyekt yig'ish murakkablashadi (10 ta parametr)
- ba'zi obyektdan faqat **bitta** bo'lishi kerak (masalan, DB ulanishi)

**Creational patternlar** shu muammolarni hal qiladi: obyektni yaratish **qanday** va **kim tomonidan** bajarilishini tartibga soladi.

| Pattern | Bir jumlada | Savol, javobi shu pattern |
|---|---|---|
| Factory | Obyektni men emas, factory yaratadi | "Qaysi klass kerakligini ishlatuvchi kod bilmasa bo'ladimi?" |
| Abstract Factory | Bir-biriga mos **to'plamni** yaratadi | "Mos keladigan bir nechta obyektni birga olsam bo'ladimi?" |
| Builder | Murakkab obyektni **qadamma-qadam** yig'adi | "10 ta parametrli konstruktorni qanday soddalashtiraman?" |
| Singleton | Obyektdan **faqat bittasi** bo'ladi | "Hamma bitta DB ulanishidan foydalansa bo'ladimi?" |

---

## Umumiy g'oya: interfeys

Hamma patternlarda bitta asosiy fikr bor: ishlatuvchi kod **aniq klassni emas, interfeysni** biladi.

```typescript
interface Drink {
  prepare(): void;
}
```

Interfeys shartnoma kabi: "ichimlik bo'lish uchun `prepare()` qila olish kerak". Ichimlik `Espresso` bo'ladimi, `GreenTea` bo'ladimi, ishlatuvchi kod uchun farqi yo'q. Shu sababli yangi turni qo'shganda eski kod o'zgarmaydi.

---

## 1. Factory

### Nima uchun kerak?

Kassirga "menga espresso ber" deysiz. Kassir espressoni qanday tayyorlashini siz bilmaysiz va bilishingiz shart emas.

Factorysiz hamma joyda `new Espresso()` yozilardi. Ertaga `Espresso`ning yaratilishi o'zgarsa, yuzta joyni tuzatasiz. Factory bilan esa yaratish **bitta joyda**.

### Rollar

| Rol | Kafe misolida | Vazifasi |
|---|---|---|
| Mahsulot interfeysi | `Drink` | "ichimlik nima qila oladi" |
| Aniq mahsulotlar | `Espresso`, `GreenTea` | haqiqiy ichimliklar |
| Factory interfeysi | `DrinkFactory` | "factory ichimlik yaratadi" |
| Aniq factory'lar | `EspressoFactory`, `GreenTeaFactory` | har biri o'z ichimligini yaratadi |

### Kod

```typescript
interface Drink {
  prepare(): void;
}

class Espresso implements Drink {
  prepare() { console.log("☕ Espresso tayyorlandi"); }
}
class GreenTea implements Drink {
  prepare() { console.log("🍵 Yashil choy damlandi"); }
}

interface DrinkFactory {
  createDrink(): Drink;
}

class EspressoFactory implements DrinkFactory {
  createDrink(): Drink { return new Espresso(); }
}
class GreenTeaFactory implements DrinkFactory {
  createDrink(): Drink { return new GreenTea(); }
}

type DrinkType = "espresso" | "green-tea";

function getDrinkFactory(type: DrinkType): DrinkFactory {
  switch (type) {
    case "espresso":  return new EspressoFactory();
    case "green-tea": return new GreenTeaFactory();
  }
}

// Ishlatish
const drink = getDrinkFactory("green-tea").createDrink();
drink.prepare();
```

### Muhim joyi

Oxirgi uch qatorda `Espresso` yoki `GreenTea` degan so'z **yo'q**. Ishlatuvchi kod faqat `DrinkFactory` va `Drink`ni biladi.

### Qachon ishlatiladi

- qaysi klass kerakligi **dastur ishlayotganda** aniqlansa (config, foydalanuvchi tanlovi)
- yangi turlar tez-tez qo'shilsa
- yaratish jarayoni murakkab bo'lsa

### Qachon ishlatilmaydi

Bitta klass bor va o'zgarmasa. `new User()` uchun factory yozish ortiqcha murakkablik.

---

## 2. Abstract Factory

### Nima uchun kerak?

Factory **bitta** narsa yaratadi. Abstract Factory esa **bir-biriga mos bir nechta narsani** yaratadi.

Italyan kafesiga kirsangiz: espresso + tiramisu + kichik chashka. Choyxonaga kirsangiz: yashil choy + chak-chak + piyola. Choyni espresso chashkasida bermaysiz. To'plam **mos bo'lishi** kerak, shuni pattern kafolatlaydi.

### Rollar

| Rol | Kafe misolida |
|---|---|
| Mahsulot interfeyslari | `Drink`, `Dessert`, `Tableware` |
| Oila #1 | `Espresso`, `Tiramisu`, `EspressoCup` |
| Oila #2 | `GreenTea`, `ChakChak`, `Piyola` |
| Abstract Factory | `CafeFactory` |
| Aniq factory'lar | `ItalianCafeFactory`, `ChaikhonaFactory` |

### Kod

```typescript
interface Drink     { prepare(): void; }
interface Dessert   { serve(): void; }
interface Tableware { place(): void; }

// Italyan oilasi
class Espresso    implements Drink     { prepare() { console.log("☕ Espresso"); } }
class Tiramisu    implements Dessert   { serve()   { console.log("🍰 Tiramisu"); } }
class EspressoCup implements Tableware { place()   { console.log("🥄 Espresso chashkasi"); } }

// Choyxona oilasi
class GreenTea implements Drink     { prepare() { console.log("🍵 Yashil choy"); } }
class ChakChak implements Dessert   { serve()   { console.log("🍯 Chak-chak"); } }
class Piyola   implements Tableware { place()   { console.log("🏺 Piyola"); } }

// Abstract Factory
interface CafeFactory {
  createDrink(): Drink;
  createDessert(): Dessert;
  createTableware(): Tableware;
}

class ItalianCafeFactory implements CafeFactory {
  createDrink()     { return new Espresso(); }
  createDessert()   { return new Tiramisu(); }
  createTableware() { return new EspressoCup(); }
}

class ChaikhonaFactory implements CafeFactory {
  createDrink()     { return new GreenTea(); }
  createDessert()   { return new ChakChak(); }
  createTableware() { return new Piyola(); }
}

// Mijoz kodi: qaysi kafe ekanini bilmaydi
function serveSet(factory: CafeFactory) {
  factory.createTableware().place();
  factory.createDrink().prepare();
  factory.createDessert().serve();
}

serveSet(new ItalianCafeFactory());
serveSet(new ChaikhonaFactory());
```

### Muhim joyi

`serveSet()` ichida `Espresso`, `Piyola` kabi so'zlar yo'q. Qaysi factory berilsa, o'sha kafening **to'liq to'plami** keladi.

### Factory bilan farqi

| | Factory | Abstract Factory |
|---|---|---|
| Nechta narsa yaratadi | 1 ta | bir nechta bog'liq narsa |
| Maqsad | bitta turni tanlash | **mos to'plamni** kafolatlash |

### Kamchiligi

- yangi **oila** qo'shish oson (yapon kafesi: yangi klasslar yozasiz, eskisiga tegmaysiz)
- yangi **mahsulot turi** qo'shish og'riqli (masalan `Napkin`): interfeysga va **hamma** factory'ga qo'shish kerak

### Qachon ishlatiladi

Bir-biriga mos bir nechta obyektni birga ishlatish kerak va bir to'plamdan boshqasiga o'tish ehtimoli bor bo'lsa. Masalan: UI temasi (Light/Dark: tugma + input + menyu), turli DB'lar (PostgreSQL/MongoDB uchun ulanish + so'rov + tranzaksiya).

---

## 3. Builder

### Nima uchun kerak?

Murakkab obyektni bitta konstruktorga tiqsangiz:

```typescript
new Order("Nonushta kombo", "ESPRESSO", "Kruassan", 25000, true, false, null);
```

Qaysi qiymat nimani bildirishini bilib bo'lmaydi. Builder yig'ishni **nomlangan qadamlarga** bo'ladi.

### Klassik Builder (ustoz yozgan shakl)

| Rol | Kafe misolida | Vazifasi |
|---|---|---|
| Product | `Order` | yig'iladigan natija |
| Builder (abstrakt) | `OrderBuilder` | qadamlar ro'yxati |
| Aniq builder'lar | `BreakfastOrderBuilder`, `BusinessLunchOrderBuilder` | qadamlarning o'z variantini bajaradi |
| Director | `Cashier` | qadamlarni **to'g'ri tartibda** chaqiradi |

```typescript
type DrinkKind = "ESPRESSO" | "GREEN_TEA" | "CAPPUCCINO";

class Order {
  name = "";
  drink: DrinkKind | null = null;
  dessert = "";
  price = 0;
}

abstract class OrderBuilder {
  protected order!: Order;

  createOrder(): void { this.order = new Order(); }

  abstract buildName(): void;
  abstract buildDrink(): void;
  abstract buildDessert(): void;
  abstract buildPrice(): void;

  getOrder(): Order { return this.order; }
}

class BreakfastOrderBuilder extends OrderBuilder {
  buildName()    { this.order.name = "Nonushta kombo"; }
  buildDrink()   { this.order.drink = "ESPRESSO"; }
  buildDessert() { this.order.dessert = "Kruassan"; }
  buildPrice()   { this.order.price = 25000; }
}

class BusinessLunchOrderBuilder extends OrderBuilder {
  buildName()    { this.order.name = "Biznes lanch"; }
  buildDrink()   { this.order.drink = "GREEN_TEA"; }
  buildDessert() { this.order.dessert = "Tiramisu"; }
  buildPrice()   { this.order.price = 60000; }
}

class Cashier {
  private builder!: OrderBuilder;

  setBuilder(builder: OrderBuilder): void { this.builder = builder; }

  buildOrder(): Order {
    this.builder.createOrder();
    this.builder.buildName();
    this.builder.buildDrink();
    this.builder.buildDessert();
    this.builder.buildPrice();
    return this.builder.getOrder();
  }
}

// Ishlatish
const cashier = new Cashier();
cashier.setBuilder(new BreakfastOrderBuilder());
console.log(cashier.buildOrder());
```

### Muhim joyi

`Cashier` **tartibni** biladi (avval nom, keyin ichimlik, ...), lekin **qiymatlarni** bilmaydi. Yangi buyurtma turi qo'shsangiz kassirga tegmaysiz.

### Zamonaviy (fluent) Builder, TS/JS'da ko'proq uchraydi

Har bir metod `this` qaytaradi, shuning uchun zanjir bo'ladi:

```typescript
class CoffeeBuilder {
  private size: "S" | "M" | "L" = "M";
  private milk = false;
  private sugar = 0;

  setSize(size: "S" | "M" | "L"): this { this.size = size; return this; }
  addMilk(): this { this.milk = true; return this; }
  addSugar(spoons: number): this { this.sugar = spoons; return this; }

  build() {
    if (this.sugar > 5) throw new Error("Juda shirin!");   // tekshiruv shu yerda
    return { size: this.size, milk: this.milk, sugar: this.sugar };
  }
}

const coffee = new CoffeeBuilder().setSize("L").addMilk().addSugar(2).build();
```

Kod deyarli gapdek o'qiladi. `axios` va `knex` ham shunday ishlaydi.

### Qachon ishlatiladi

- yig'ish **tartibi** muhim yoki murakkab bo'lsa
- bir xil jarayondan **turli ko'rinishdagi** natija olish kerak bo'lsa
- yaratishdan oldin **tekshiruv** (validatsiya) kerak bo'lsa

### Qachon ishlatilmaydi

TypeScript'da oddiy holatlar uchun Builder shart emas, obyekt literali yetadi:

```typescript
function createCoffee(opts: { size?: "S" | "M" | "L"; milk?: boolean; sugar?: number }) { /* ... */ }
createCoffee({ size: "L", milk: true });
```

---

## 4. Singleton

### Nima uchun kerak?

Ilova DB'ga ulanadi. Ulanish **qimmat**: tarmoq, login, parol tekshirish. Har so'rovda yangi ulanish ochilsa, 100 foydalanuvchi = 100 ulanish. DB serveri `too many connections` xatosi bilan yiqiladi.

Singleton: butun ilovada ulanish **faqat bitta**, hamma uni bo'lishib ishlatadi.

### Uch qismi

1. **Statik maydon**: yagona nusxani saqlaydi
2. **Private konstruktor**: tashqaridan `new` qilib bo'lmaydi
3. **`getInstance()`**: nusxa bo'lmasa yaratadi, bo'lsa borini beradi

### Kod

```typescript
class Database {
  private static instance: Database | null = null;

  private constructor() {
    console.log("🔌 DB ga ulanilmoqda...");   // faqat 1 marta chiqadi
  }

  static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`📄 Bajarildi: ${sql}`);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2);        // true: bitta va o'sha obyekt
// new Database();               // ❌ xato: constructor is private
```

### Node.js'da oddiyroq yo'l

Node.js modulni **bir marta** yuklab keshlaydi, shuning uchun quyidagi ham Singleton:

```typescript
// db.ts
class Database { /* ... */ }
export const db = new Database();   // hamma fayl bitta db'ni oladi
```

```typescript
// userService.ts
import { db } from "./db";
```

Real loyihalarda (`pg`, `mongoose`, `Prisma`) odatda bitta ulanish emas, **connection pool** bitta bo'ladi. G'oya o'sha.

### Java'dagi `synchronized` nima edi?

Java'da bir nechta thread ishlaydi: ikkitasi bir vaqtda "hali nusxa yo'q" deb ikkita obyekt yaratib yuborishi mumkin. `synchronized` buni to'xtatadi. Node.js bitta threadda ishlaydi, shuning uchun kerak emas.

### Kamchiliklari (ehtiyot bo'ling)

- **Global holat**: hamma joydan o'zgartirish mumkin, xatoni topish qiyin
- **Test yozish qiyin**: soxta (mock) DB berib bo'lmaydi
- **Yashirin bog'liqlik**: klass konstruktoridan DB'ga muhtojligi ko'rinmaydi

Yaxshiroq yo'l: obyektni bir marta yaratib, kerakli klassga **tashqaridan berish** (dependency injection):

```typescript
class UserService {
  constructor(private db: Database) {}
}
```

### Qachon ishlatiladi

Haqiqatan ham bitta nusxa kerak bo'lsa: DB pool, konfiguratsiya, logger, kesh.

---

## Ustoz kodi bilan moslik jadvali

| Pattern | Ustoz (Java) | Kafe (TS) |
|---|---|---|
| Factory | `Developer`, `DeveloperFactory` | `Drink`, `DrinkFactory` |
| Abstract Factory | `ProjectTeamFactory` (Developer + Tester + PM) | `CafeFactory` (Drink + Dessert + Tableware) |
| Builder | `Website`, `Director`, `WebsiteBuilder` | `Order`, `Cashier`, `OrderBuilder` |
| Singleton | `ProgrammLogger.getProgrammLogger()` | `Database.getInstance()` |

**Nega Java'da fayllar shuncha ko'p?** Java'da qoida: bitta public klass = bitta fayl. Bu pattern'ning talabi emas, Java'ning talabi. TypeScript'da hammasini bitta faylga yozsa bo'ladi.

---

## Qaysi pattern'ni qachon tanlayman?

```
Obyektni yaratish bilan bog'liq muammo bormi?
│
├─ Faqat 1 ta nusxa kerakmi?                     → Singleton
├─ Parametrlar juda ko'p / yig'ish bosqichli?     → Builder
├─ Bir nechta MOS obyekt birga kerakmi?           → Abstract Factory
├─ Qaysi klass kerakligi keyin aniqlanadimi?      → Factory
└─ Hech biri yo'qmi?                              → oddiy `new` yetadi
```

**Eng muhim qoida:** oddiy holatni murakkablashtirmang. Pattern vosita, maqsad emas. Muammo bo'lmasa, pattern ham kerak emas.

---

## Ishga tushirish

```bash
npm install -g ts-node typescript
npx ts-node factory.ts
```

Har bir misolni alohida `.ts` fayliga saqlab, shu buyruq bilan ishga tushirish mumkin.

---

## O'zimni tekshirish savollari

1. Factory'da ishlatuvchi kod nima uchun `new Espresso()` deb yozmaydi?
2. Abstract Factory Factory'dan nimasi bilan farq qiladi? Kafe misolida ayting.
3. Abstract Factory'ga yangi **oila** qo'shish oson, yangi **mahsulot turi** qo'shish nega qiyin?
4. Builder'da Director nima uchun kerak? U nimani biladi, nimani bilmaydi?
5. Singleton'da konstruktor `private` bo'lmasa nima buziladi?
6. Node.js'da Singleton uchun `synchronized` nega kerak emas?