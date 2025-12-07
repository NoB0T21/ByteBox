import { NextFunction, Request, Response } from 'express'
import redis from '../Db/redis';

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress;
  if(!ip){
    
  }

  const request = await redis.incr(ip);
}

export default rateLimiter;