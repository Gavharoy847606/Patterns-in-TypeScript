interface Prototype<T> {
  clone(): T;
}

class TestCase implements Prototype<TestCase> {
  constructor(
    public title: string,
    public steps: string[],
    public data: { username: string; password: string },
    public expected: string,
  ) {}

  clone(): TestCase {
    return new TestCase(
      this.title,
      [...this.steps],        
      { ...this.data },       
      this.expected,
    );
  }
}

const loginTemplate = new TestCase(
  "Login: muvaffaqiyatli",
  ["Saytni och", "Login kirit", "Parol kirit", "Kirishni bos"],
  { username: "admin", password: "123456" },
  "Dashboard ochiladi",
);

const wrongPassword = loginTemplate.clone();
wrongPassword.title = "Login: noto'g'ri parol";
wrongPassword.data.password = "xato";
wrongPassword.expected = "Xato xabari chiqadi";

const emptyLogin = loginTemplate.clone();
emptyLogin.title = "Login: bo'sh login";
emptyLogin.data.username = "";
emptyLogin.expected = "Login talab qilinadi";

console.log(loginTemplate.data.password);  