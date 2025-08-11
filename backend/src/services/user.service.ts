import { HydratedDocument } from 'mongoose'
import User  from '../Models/user.model'
import user from '../Models/user.model'

interface EmailParam {
    name:string,
    email:string,
    picture:string,
    password:string
}

export const findUser =  async ({email}:{email:string}) => {
  const user = await User.findOne({email})
  if(!user)return null
  return user
}

export const findUsers =  async ({shareuser}:{shareuser:string[]}): Promise<any[]> => {
  const user = await User.find({ email: { $in: shareuser } });
  if(!user)return []
  return user
}

export const findUsersByid =  async ({shareuser}:{shareuser:any}): Promise<any> => {
  const user = await User.findOne({ _id:shareuser });
  return user
}

export const getUsersByid =  async ({shareuser}:{shareuser:string[]}): Promise<any[]> => {
  const user = await User.find({ _id: { $in: shareuser } });
  if(!user)return []
  return user
}

export const registerUser = async ({ name, email,picture, password }: EmailParam) => {
  const data = await User.create({
    name,
    email,
    picture,
    password,
  });
    return data;
  };