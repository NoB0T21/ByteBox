import express, { Request,Response } from 'express'
const app = express();;
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return 1
  } catch (error) {
    return 0
  }

}

app.post('/send', async function(req:Request, res:Response){
    const {to, subject, html} = req.body
    if(!to || !subject || !html) return res.status(400).json({
      message: "not sent",
      success: false
    })
    const response = await sendEmail(to,subject,html)
    if(response===0) return res.status(403).json({
      message: "not sent",
      success: false
    })
    else return res.status(200).json({
      message: "sent",
      success: true
    })
})
app.get('/',(req:Request, res:Response)=>{
    res.status(200).json({ warm: true });
});

app.listen(process.env.PORT,function(){
    console.log("Working on port 3000.....");
})