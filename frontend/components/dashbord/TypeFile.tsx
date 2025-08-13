import { files } from '@/Types'
import React from 'react'
import { DocumentsFill, ImagesFill, MediaFill, OtherFill } from '../icon/Icons'
import { getFileSize, getFileType } from '@/utils/utils'
import Link from 'next/link'

const TypeFile = async ({file}:{file:files[]}) => {
    const links = ['/Documents','/Videos','/Images','/Others']
    const icons = [<DocumentsFill/>,<ImagesFill/>,<MediaFill/>,<OtherFill/>]
    const colou = ['bg-blue-600','bg-orange-500','bg-emerald-700','bg-pink-400']
    const name = ['Documents','Videos','Images','Others']
    
    let Documentsum:any =0;
    let videosum:any =0;
    let imagesum:any =0;
    let othersum:any =0;
    let dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='document'){return Documentsum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='video'){return videosum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='image'){return imagesum += f.fileSize}
      },0)
    dd = await file.forEach((f: files)=>{
        const {type} = getFileType(f.originalname)
        if(type==='other'){return othersum += f.fileSize}
      },0)
      const Document = getFileSize(Documentsum)
      const video = getFileSize(videosum)
      const image = getFileSize(imagesum)
      const other = getFileSize(othersum)
      const sizes = [Document,video,image,other]
      return (
    <div className='gap-4 grid lg:grid-cols-4 sm:grid-rows-4 h-full'>
        {links.map((link,idx)=>(
            <div key={idx} className='lg:col-span-2 row-span-1 lg:row-span-2'>
            <Link href={link} className='flex lg:flex-col gap-5 bg-[#2A2A2A] hover:bg-gradient-to-r from-[#800080] to-[#B266B2] hover:scale-102 px-3 py-2 rounded-xl w-full h-full cursor-pointer transition-all duration-300 ease-in-out'>
                <div className='flex justify-between items-center gap-4 w-full'>
                    <div className={`${colou[idx]} shadow-[#B266B2] shadow-md rounded-full size-13 lg:size-20 lg:p-2`}>
                        {icons[idx]}
                    </div>
                    <p className='lg:w-3/4 font-medium text-sm lg:text-xl'>{sizes[idx]}</p>
                </div>
                <div className='flex justify-center items-center w-full font-semibold md:text-xl lg:text-2xl'>{name[idx]}</div>
            </Link>
        </div>
        ))}
    </div>
  )
}

export default TypeFile