export {};

interface NotificationService {
  send(recipient: string, message: string): void;
}

class SmsNotificationService implements NotificationService {
  send(recipient: string, message: string): void {
    console.log(`📱 SMS → ${recipient}: ${message}`);
  }
}

class TelegramClient {
  sendTelegramMessage(chatId: string, text: string): void {
    console.log(`✈️ Telegram → chat ${chatId}: ${text}`);
  }
}

class EmailClient {
  sendEmail(emailAddress: string, subject: string, body: string): void {
    console.log(`📧 Email → ${emailAddress}`);
    console.log(`   Mavzu: ${subject}`);
    console.log(`   Matn:  ${body}`);
  }
}

class TelegramAdapter implements NotificationService {
  constructor(private client: TelegramClient) {}

  send(recipient: string, message: string): void {
    this.client.sendTelegramMessage(recipient, message);
  }
}

class EmailAdapter implements NotificationService {
  constructor(
    private client: EmailClient,
    private defaultSubject = "Yangi xabar",
  ) {}

  send(recipient: string, message: string): void {
    this.client.sendEmail(recipient, this.defaultSubject, message);
  }
}

class NotificationManager {
  constructor(private service: NotificationService) {}

  notify(recipient: string, message: string): void {
    this.service.send(recipient, message);
  }
}

function main(): void {
  const smsManager = new NotificationManager(new SmsNotificationService());
  const telegramManager = new NotificationManager(
    new TelegramAdapter(new TelegramClient()),
  );
  const emailManager = new NotificationManager(
    new EmailAdapter(new EmailClient(), "Buyurtma holati"),
  );

  smsManager.notify("+998901234567", "Buyurtmangiz tayyor");
  telegramManager.notify("123456789", "Buyurtmangiz yo'lda");
  emailManager.notify("ali@mail.uz", "Buyurtmangiz yetkazildi");
}

main();
