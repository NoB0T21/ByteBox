import Redis from "ioredis";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const redis = new Redis(process.env.REDIS_URL||'');

async function sendEmail(to: string) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
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
    console.log(process.env.EMAIL_PASS)
    console.log(process.env.EMAIL_USER)
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
