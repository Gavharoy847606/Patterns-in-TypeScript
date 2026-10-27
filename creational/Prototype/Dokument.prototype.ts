export {};
/**
 * TypeScript’da Document degan tayyor (brauzer) tur bor.
 * Fayl oddiy skript bo’lsa, o’zingizning class Documentingiz u bilan to’qnashib,
 * Duplicate identifier 'Document' xatosini beradi. export {};
 * faylni modulga aylantiradi va to’qnashuv yo’qoladi.
 */

interface Copyable<T> {
  clone(): T;
}

class Document implements Copyable<Document> {
  constructor(
    private _id: number,
    private _title: string,
    private _content: string,
    private _author: string,
    private _tags: string[],
  ) {}

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }
  set content(value: string) {
    this._content = value;
  }

  get author(): string {
    return this._author;
  }
  set author(value: string) {
    this._author = value;
  }

  get tags(): string[] {
    return this._tags;
  }
  set tags(value: string[]) {
    this._tags = value;
  }

  // 3. deep copy
  clone(): Document {
    return new Document(this._id, this._title, this._content, this._author, [
      ...this._tags,
    ]);
  }

  toString(): string {
    return `Document{id=${this._id}, title='${this._title}', content='${this._content}', author='${this._author}', tags=[${this._tags.join(", ")}]}`;
  }
}

// DocumentFactory
class DocumentFactory {
  constructor(private prototype: Document) {}

  setDocument(document: Document): void {
    this.prototype = document;
  }

  cloneDocument(): Document {
    return this.prototype.clone();
  }
}

//main()
function main() {
  const original = new Document(1, "Shartnoma", "Shartnoma matni", "Ali", [
    "rasmiy",
    "muhim",
  ]);

  const factory = new DocumentFactory(original);

  const copy1 = factory.cloneDocument();
  const copy2 = factory.cloneDocument();

  copy1.id = 2;
  copy1.title = "Shartnoma (nusxa 1)";
  copy1.content = "Yangi matn 1";
  copy1.tags.push("yangi");

  copy2.id = 3;
  copy2.title = "Shartnoma (nusxa 2)";
  copy2.content = "Yangi matn 2";
  copy2.tags[0] = "qoralama";

  console.log("Original:", original.toString());
  console.log("Copy 1:  ", copy1.toString());
  console.log("Copy 2:  ", copy2.toString());
  console.log("original === copy1:", original === copy1);
}

main();
