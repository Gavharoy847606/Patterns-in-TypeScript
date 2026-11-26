import type { BankAccount } from "./BankAccount";
import { BankAccountProxy } from "./BankAccountProxy";
import { RealBankAccount } from "./RealBankAccount";

export class BankApp {
  run(): void {
    this.authorizedUserScenario();
    this.guestScenario();
  }

  private authorizedUserScenario(): void {
    console.log("=== 1. Tizimga kirgan foydalanuvchi ===");
    const account: BankAccount = new BankAccountProxy(new RealBankAccount(1_000_000), true);

    this.tryWithdraw(account, 200_000);
    this.tryWithdraw(account, 5_000_000);
  }

  private guestScenario(): void {
    console.log("\n=== 2. Tizimga kirmagan foydalanuvchi ===");
    const account: BankAccount = new BankAccountProxy(new RealBankAccount(1_000_000), false);

    this.tryWithdraw(account, 100_000);
  }

  private tryWithdraw(account: BankAccount, amount: number): void {
    try {
      account.withdraw(amount);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Hato: ${message}`);
    }
  }
}