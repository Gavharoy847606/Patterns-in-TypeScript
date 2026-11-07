
export {};  


interface Developer {
  writeCode(): void;
}

class JavaDeveloper implements Developer {
  writeCode(): void {
    console.log("   Java dasturchi Java kodini yozmoqda");
  }
}

class CppDeveloper implements Developer {
  writeCode(): void {
    console.log("   C++ dasturchi C++ kodini yozmoqda");
  }
}


abstract class Game {
  constructor(protected developer: Developer) {}  

  abstract develop(): void;
}

class RacingGame extends Game {
  develop(): void {
    console.log("Poyga o'yini yaratilmoqda:");
    this.developer.writeCode();
  }
}

class FootballGame extends Game {
  develop(): void {
    console.log("Futbol o'yini yaratilmoqda:");
    this.developer.writeCode();
  }
}

function main(): void {
  const games: Game[] = [
    new RacingGame(new JavaDeveloper()),
    new RacingGame(new CppDeveloper()),
    new FootballGame(new JavaDeveloper()),
    new FootballGame(new CppDeveloper()),
  ];

  games.forEach((game) => game.develop());
}

main();