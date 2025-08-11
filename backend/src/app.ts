import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import database from './Db/mongodb';
import cors from 'cors';
import userRoutes from './routers/user.router'
import fileRoutes from './routers/file.router'

dotenv.config();
database();
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CLIENT_URL || 'none',
    credentials: true,
}))
app.use(cookieParser());

app.use('/user',userRoutes)
app.use('/file',fileRoutes)

app.get('/',(req,res)=>{
    res.send(`working on ${process.env.PORT}`)
});

export default app;