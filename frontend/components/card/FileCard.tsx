import { files } from '@/Types'
import FileLogo from '@/components/FileLogo'
import { getFileSize } from '@/utils/utils'
import FileDropdown from './fileDropdown'
import { FileShareee, SharedFile } from '../icon/Icons'
import { api } from '@/utils/api'
import { cookies, } from 'next/headers';
import Image from 'next/image'

interface User {
    _id:string,
    name:string,
    email:string,
    password:string
}

const FileCard = async ({file,types,extrnsion,userId} : {file:files, types: string,extrnsion:string,userId:string}) => {
  const fileSize = getFileSize(file.fileSize);
  const token = (await cookies()).get('token')?.value || ''
  const data=  await api.get(`/user/getuser/${file.owner}`,{
        headers: {
        Authorization: `Bearer ${token}`,
      },
    withCredentials: true,
  })
  const user:User=data.data.data

  return (
    <div className='flex flex-col gap-6 bg-[#0000002c] p-5 rounded-md cursor-pointer'>
      <div className='flex justify-between'>
          {types==='image'?<Image width={100} height={100} src={file.imageURL} alt='prev' className='rounded-full w-16 h-16 object-cover' />:<FileLogo type={extrnsion} extension={types}/>}
          <div className='flex flex-col justify-between items-center h-full font-light text-sm'>
              <FileDropdown file={file}/>
              <div>{fileSize}</div>
          </div>
        </div>
          <div className='flex flex-col gap-1 w-full font-medium text-sm text-clip'>
            <p className='truncate'>{file.originalname}</p>
            <div className='relative flex justify-between'>
              <p>{file.createdAt.split('T')[0]}</p>
              <p>{file.owner!==userId ? <>
                <div className='peer m-3 size-5'><SharedFile/></div>
                <div className='-top-3 -right-8 absolute bg-zinc-950 opacity-0 peer-hover:opacity-100 px-1 border-1 transition-(opacity) duration-200 ease-in-out'>shared by {user.name}</div>
              </> : <>
                {file.shareuser.length>0 ? <>
                  <div className='peer m-3 size-5'>
                    <FileShareee/>
                  </div>
                  <div className='-top-3 -right-8 absolute bg-zinc-950 opacity-0 peer-hover:opacity-100 px-1 border-1 transition-(opacity) duration-200 ease-in-out'>this file is been shared with users</div>
              </> : ''}</>}</p>
            </div>
        </div>
    </div>
  )
}

export default FileCard
