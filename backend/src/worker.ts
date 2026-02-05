import Redis from "ioredis";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv"
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const redis = new Redis(process.env.REDIS_URL||'');

async function sendEmail(to: string) {
  await sgMail.send({
    to,
    from: process.env.EMAIL_USER!,
    subject: "Welcome back",
    text: "Hello Aryan 👋",
  });
}

async function startWorker() {
  console.log("Worker started...");

  while (true) {
    const result = await redis.brpop("jobs", 0);

    if (!result) continue;

    const [, jobString] = result;
    const job = JSON.parse(jobString);

    await processJob(job);
  }
}

async function processJob(job: any) {
    console.log("Processing:", job);
    try {
        console.log("Sending email...");

        await sendEmail(job.to);

        console.log("Email sent successfully!");
    } catch (err) {
        console.error("Email failed:", err);
    }
    await new Promise(r => setTimeout(r, 2000));
}

startWorker();
