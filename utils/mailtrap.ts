import { MailtrapClient } from "mailtrap";

let client: MailtrapClient | null = null;

export const initMailtrap = async () => {
  if (!client && typeof window === "undefined") {
    const { MailtrapClient } = await import("mailtrap");
    client = new MailtrapClient({
      token: "fadfbb564ab4b8ad4604b603b2b220d9",
    });
  }
};

export const sendWelcomeEmail = async (toEmail: string, name: string) => {
  if (typeof window !== "undefined") {
    console.error("sendWelcomeEmail should only be called on the server side");
    return;
  }

  if (!client) {
    await initMailtrap();
  }

  if (!client) {
    console.error("Mailtrap client is not initialized");
    return;
  }

  const sender = { name: "PostBot AI", email: "PostBot_AI@demomailtrap.com" };

  try {
    await client.send({
      from: sender,
      to: [{ email: toEmail }],
      subject: "🎉 Welcome to PostBot AI, ${name}!",
      html: `
        <div style="font-family: 'Georgia', serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #2c3e50;">Welcome to <span style="color: #007bff;">PostBot AI</span>, ${name}!</h1>
            <p style="color: #555; font-size: 16px;">
              We're thrilled to have you on board! 🚀  
              PostBot AI will revolutionize your content creation experience.  
              Get started by exploring the amazing tools we've built for you.
            </p>
            <a href="https://yourwebsite.com/start" style="background-color: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 15px; font-weight: bold;">
              Start Creating Now
            </a>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="color: #777; font-size: 14px;">
              Need help? <a href="mailto:support@postbotai.com" style="color: #007bff;">Contact our support team</a>.
            </p>
          </div>
        </div>
      `,
    });
    console.log(`Email sent to ${toEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
  
};
