class Database {
  private static instance: Database | null = null;
  private connected = false;

  private constructor() {
    console.log("DB ga ulanilmoqda...");
    this.connected = true;
  }

  static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`Bajarildi: ${sql}`);
  }
}

// Ishlatish
const db1 = Database.getInstance();
const db2 = Database.getInstance();

db1.query("SELECT * FROM users");
console.log(db1 === db2);
