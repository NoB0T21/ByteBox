import { Types } from 'mongoose';
import fileModel from '../Models/file.model'

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
interface files{
    owner: string,
    path: string,
    originalname: string,
    imageURL: string,
    fileType: string,
    fileSize: number
}

export const  createfile = async ({owner,path,originalname,imageURL,fileType,fileSize}:files) => {
 if(!owner || !path || !originalname || !fileType || !fileSize) return
 const file = await fileModel.create({
    owner: new Types.ObjectId(owner),
    path,
    originalname,
    imageURL,
    fileType,
    fileSize
  });
 return file
}

export const  getfiles = async ({id}:{id: any}) => {
 if(!id) return
 const file = await fileModel.find({$or: [
    { owner: id },
    { shareuser: id }
  ]});
 return file
}

export const  renamefiles = async ({id,originalname}:{id: string, originalname: string}) => {
 if(!id) return
 const file = await fileModel.findOneAndUpdate({_id: id},{originalname});
 return file
}

export const  sharefiles = async ({id,userIs}:{id: string, userIs: string[]}) => {
 if(!id) return
 const file = await fileModel.findOneAndUpdate({_id: id},{$addToSet:{shareuser:userIs}}, { new: true });
 return file
}

export const  updatesharefiles = async ({id,shareuser}:{id: string, shareuser: string[]}) => {
 if(!id) return
 const file = await fileModel.findOneAndUpdate({_id: id},{$set:{shareuser:shareuser}}, { new: true });
 console.log(shareuser)
 return file
}

export const  deletefiles = async ({id}:{id: string}) => {
 if(!id) return
 const file = await fileModel.findOneAndDelete({_id: id});
 return file
}

export const  getfiless = async ({id}:{id: any}) => {
 if(!id) return
 const file = await fileModel.findOne({_id: id});
 return file
}

export const getfileBySearch = async ({ query,id }: { query: string | RegExp ,id: any }) => {
  if (!query) return [];

   const regex = typeof query === 'string'
    ? new RegExp(escapeRegExp(query.trim()), 'i')
    : query;

  const file = await fileModel.find({
     $and: [
    {
      $or: [
        { owner: id },
        { shareuser: id }
      ]
    },
    {
      originalname: { $regex: regex }
    }
  ]
  })
  return file;
};