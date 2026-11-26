import type { BankAccount } from "./BankAccount";

export class BankAccountProxy implements BankAccount {
  constructor(
    private readonly realAccount: BankAccount,
    private readonly isLoggedIn: boolean,
  ) {}

  withdraw(amount: number): void {
    console.log(`[Proxy] Pul yechish urinishi: ${amount} so'm`);

    if (!this.isLoggedIn) {
      throw new Error("Ruxsat berilmagan: avval tizimga kiring");
    }

    console.log("[Proxy] Avtorizatsiya tasdiqlandi");
    this.realAccount.withdraw(amount);
  }
}