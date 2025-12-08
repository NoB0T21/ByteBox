import { NextFunction, Request, Response } from 'express'
import redis from '../Db/redis';

const cachData = async (req:Request, res:Response, next:NextFunction) => {
    const userEmail = req.user.email;
    const cacheKey = `files:${userEmail}`

    const cached = await redis.get(cacheKey);
    if (cached) {
        return res.status(200).json(JSON.parse(cached));
    }else {
        next()
    }
}

export default cachData;