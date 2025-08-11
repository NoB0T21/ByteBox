
import { files } from '@/Types'
import React from 'react'
import Thumbnail from '../Thumbnail'
import { getFileSize, getFileType } from '@/utils/utils'

export const Details = ({file,name}:{file:files,name:string}) => {
    const{type, extension} = getFileType(file.originalname)
    const fileSize =  getFileSize(file.fileSize)
    
  return (
    <>
    <div className="flex gap-5 p-4 border-1 border-zinc-500 rounded-md w-full">
        <div className='flex size-15'><Thumbnail type={type} extension={extension} url={file.imageURL}/></div>
        <div className="flex flex-col w-3/4">
            <div className='font-semibold truncate'>{file.originalname}</div>
            <div className='font-semibold text-sm'>{file.createdAt.split('T')[0]}<br/>{file.createdAt.split('T')[1].split(':')[0]}:{file.createdAt.split('T')[1].split(':')[1]}</div>
        </div>
    </div>
    <div className='flex gap-5 w-full'>
        <div className='flex flex-col'>
            <p>Format:</p>
            <p>Size:</p>
            <p>Owner:</p>
            <p>last edited:</p>
        </div>
        <div className='flex flex-col'>
            <p>{extension}</p>
            <p>{fileSize}</p>
            <p>{name}</p>
            <p>{file.createdAt.split('T')[1].split(':')[0]}:{file.createdAt.split('T')[1].split(':')[1]}, {file.createdAt.split('T')[0]}</p>
        </div>
    </div>
    </>
  )
}
