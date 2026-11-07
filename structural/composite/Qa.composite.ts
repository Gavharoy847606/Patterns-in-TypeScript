export {};

interface TestResult {
  passed: number;
  failed: number;
}

interface TestComponent {
  run(indent?: string): TestResult;
}

class TestCase implements TestComponent {
  constructor(
    private name: string,
    private fn: () => void,
  ) {}

  run(indent = ""): TestResult {
    try {
      this.fn();
      console.log(`${indent} ${this.name}`);
      return { passed: 1, failed: 0 };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`${indent} ${this.name} — ${msg}`);
      return { passed: 0, failed: 1 };
    }
  }
}

class TestSuite implements TestComponent {
  private children: TestComponent[] = [];

  constructor(private name: string) {}

  add(child: TestComponent): this {
    this.children.push(child);
    return this;
  }

  run(indent = ""): TestResult {
    console.log(`${indent} ${this.name}`);
    const total: TestResult = { passed: 0, failed: 0 };

    for (const child of this.children) {
      const r = child.run(indent + "  ");
      total.passed += r.passed;
      total.failed += r.failed;
    }
    return total;
  }
}

const login = (u: string, p: string) => u === "admin" && p === "123456";
const applyDiscount = (price: number, percent: number) =>
  price - (price * percent) / 100;

function assertEqual(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`Kutilgan: ${expected}, kelgan: ${actual}`);
  }
}

const loginSuite = new TestSuite("Login")
  .add(
    new TestCase("to'g'ri login", () =>
      assertEqual(login("admin", "123456"), true),
    ),
  )
  .add(
    new TestCase("noto'g'ri parol", () =>
      assertEqual(login("admin", "xato"), false),
    ),
  )
  .add(new TestCase("bo'sh login", () => assertEqual(login("", ""), true))); 

const cardSuite = new TestSuite("Karta")
  .add(
    new TestCase("chegirma 10%", () =>
      assertEqual(applyDiscount(100000, 10), 90000),
    ),
  )
  .add(
    new TestCase("chegirma 0%", () =>
      assertEqual(applyDiscount(50000, 0), 50000),
    ),
  );

const checkoutSuite = new TestSuite("Checkout")
  .add(cardSuite) 
  .add(
    new TestCase("promo kod 50%", () =>
      assertEqual(applyDiscount(200000, 50), 100000),
    ),
  );

const regression = new TestSuite("Regression")
  .add(loginSuite)
  .add(checkoutSuite);

const result = regression.run();
console.log(`\nJami: ${result.passed} o'tdi, ${result.failed} yiqildi`);

interface Step {
  execute(): void;
}

class TypeText implements Step {
  constructor(
    private selector: string,
    private text: string,
  ) {}
  execute() {
    console.log(` ${this.selector} ← "${this.text}"`);
  }
}

class Click implements Step {
  constructor(private selector: string) {}
  execute() {
    console.log(`click ${this.selector}`);
  }
}

class Flow implements Step {
  private steps: Step[] = [];

  add(step: Step): this {
    this.steps.push(step);
    return this;
  }

  execute() {
    this.steps.forEach((s) => s.execute());
  }
}

const loginFlow = new Flow()
  .add(new TypeText("#username", "admin"))
  .add(new TypeText("#password", "123456"))
  .add(new Click("#submit"));

const checkoutFlow = new Flow()
  .add(loginFlow)
  .add(new Click("#add-to-cart"))
  .add(new Click("#pay"));

checkoutFlow.execute();
