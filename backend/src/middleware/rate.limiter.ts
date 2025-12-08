import { NextFunction, Request, Response } from 'express'
import redis from '../Db/redis';

export function RateLimiter(seconds:number,Requests:number){
  return async function  rateLimiter(req: Request, res: Response, next: NextFunction){
    const ip = req.ip || req.socket.remoteAddress;
    if(!ip){
      res.status(500).json({
        message: "Some Error occure",
        success: false,
      })
      return 
    }
  
    const request = await redis.incr(ip);
    let ttl
    if (request === 1) {
      await redis.expire(ip, seconds);
      ttl = seconds
    }else{
      ttl = await redis.ttl(ip)
    }
    if(request>Requests && ttl > 0){
      res.status(429).json({
        message: "Too Many Requests, Try again later",
        callInMinute: request,
        success: false,
      })
      return
    }
    next();
  }
}