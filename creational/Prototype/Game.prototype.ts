interface Copyable<T> {
  clone(): T;
}

class GameCharacter implements Copyable<GameCharacter> {
  constructor(
    private _id: number,
    private _name: string,
    private _level: number,
    private _weapon: string,
  ) {}

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._level = value;
  }

  get weapon(): string {
    return this._weapon;
  }
  set weapon(value: string) {
    this._weapon = value;
  }

  clone(): GameCharacter {
    return new GameCharacter(this._id, this._name, this._level, this._weapon);
  }

  toString(): string {
    return `GameCharacter{id=${this._id}, name='${this._name}', level=${this._level}, weapon='${this._weapon}'}`;
  }
}

class CharacterFactory {
  constructor(private prototype: GameCharacter) {}

  setCharacter(character: GameCharacter): void {
    this.prototype = character;
  }

  cloneCharacter(): GameCharacter {
    return this.prototype.clone();
  }
}

function main() {
  const original = new GameCharacter(1, "Aslan", 10, "Qilich");

  const factory = new CharacterFactory(original);

  const clone1 = factory.cloneCharacter();
  const clone2 = factory.cloneCharacter();

  clone1.name = "Sardor";
  clone1.level = 25;
  clone1.weapon = "Kamon";

  clone2.name = "Dilnoza";
  clone2.level = 40;
  clone2.weapon = "Tayoq";

  console.log("Original:", original.toString());
  console.log("Clone 1: ", clone1.toString());
  console.log("Clone 2: ", clone2.toString());

  console.log("original === clone1:", original === clone1);
  console.log("clone1 === clone2:", clone1 === clone2);
}

main();
