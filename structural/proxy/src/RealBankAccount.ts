import type { BankAccount } from "./BankAccount";

export class RealBankAccount implements BankAccount {
  constructor(private balance: number) {}

  withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Summa musbat bo'lishi kerak");
    }
    if (amount > this.balance) {
      throw new Error(`Mablag' yetarli emas. Balans: ${this.balance} so'm`);
    }

    this.balance -= amount;
    console.log(`[Hisob] ${amount} so'm yechildi. Qoldiq: ${this.balance} so'm`);
  }
}