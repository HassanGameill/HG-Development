import Twilio from "twilio";

const client = new (Twilio as any)(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);


interface ISmsOptions {
  to: string | null;      // Recipient phone number (E.164 format, e.g., +201234567890)
  message: string; // SMS text
}

export const sendSms = async (options: ISmsOptions): Promise<void> => {
  const { to, message } = options;

  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    console.log(`SMS sent to ${to} | SID: ${msg.sid}`);
  } catch (err) {
    console.error(`Failed to send SMS to ${to}`, err);
    throw new Error("Failed to send SMS");
  }
};
