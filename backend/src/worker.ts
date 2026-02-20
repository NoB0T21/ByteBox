import Redis from "ioredis";
import dotenv from "dotenv"
dotenv.config();

const redis = new Redis(process.env.REDIS_URL||'');

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
    console.log("Processing...");
    const jobs = {
      to: job.to,
      subject: job.subject,
      html: job.html
    }
    try {
        console.log("Sending email...");

        await fetch((`${process.env.EMAIL_SENDER_URL}/send`||''), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jobs)
        });

        console.log("Email sent successfully!");
    } catch (err) {
        console.error("Email failed:", err);
    }
    await new Promise(r => setTimeout(r, 2000));
}

startWorker();
