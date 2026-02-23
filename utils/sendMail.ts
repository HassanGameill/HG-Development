import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

// ===============================
// Types
// ===============================
interface IEmailOptions<T extends object> {
  email: string;
  subject: string;
  template: string;
  data: T; // Generic type for template data
}

// Example type for activation email
export interface IActivationEmailData {
  name: string;
  activationCode: string;
}

// ===============================
// Send Mail Function
// ===============================
const sendMail = async <T extends object>(options: IEmailOptions<T>): Promise<void> => {
  const { email, subject, template, data } = options;

  // Create transporter
  const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // TLS on port 587
  auth: {
    user: process.env.SMTP_MAIL,      // ✅ match .env
    pass: process.env.SMTP_PASSWORD,  // ✅ match .env
  },
});

  // Path to EJS template
const templatePath = path.join(process.cwd(), "mails", template);

  // Render EJS template
  let html: string;
  try {
    html = await ejs.renderFile(templatePath, data);
  } catch (err) {
    console.error(`Error rendering email template: ${template}`, err);
    throw new Error("Email template rendering failed");
  }

  // Mail options
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject,
    html,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} | Message ID: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send email to ${email}`, err);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
