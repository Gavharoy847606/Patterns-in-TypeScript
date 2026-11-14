export {};

interface FileSystem {
  show(indent?: string): void;
}

class File implements FileSystem {
  constructor(private name: string) {}

  show(indent = ""): void {
    console.log(`${indent} ${this.name}`);
  }
}

class Folder implements FileSystem {
  private children: FileSystem[] = [];

  constructor(private name: string) {}

  add(item: FileSystem): this {
    this.children.push(item);
    return this;
  }

  remove(item: FileSystem): void {
    this.children = this.children.filter((child) => child !== item);
  }

  show(indent = ""): void {
    console.log(`${indent} ${this.name}`);
    this.children.forEach((child) => child.show(indent + "    "));
  }
}

function main(): void {
  const computer = new Folder("Computer");
  const documents = new Folder("Documents");
  const photos = new Folder("Photos");
  const music = new File("music.mp3");

  documents.add(new File("resume.pdf")).add(new File("homework.docx"));

  photos.add(new File("photo1.jpg")).add(new File("photo2.jpg"));

  computer.add(documents).add(photos).add(music);

  computer.show();

  console.log("\n--- music.mp3 o'chirilgandan keyin ---");
  computer.remove(music);
  computer.show();
}

main();
