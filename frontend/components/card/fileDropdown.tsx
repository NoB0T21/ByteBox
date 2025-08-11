'use client'
import { AnimatePresence, motion } from "motion/react"
import { files } from '@/Types'
import { actionDropdown } from "@/utils"
import Items from './Items'
import React, { useEffect, useState } from "react"
import { Menu } from "../icon/Icons"
import { api } from "@/utils/api"
import Cookies from "js-cookie"
import { revalidateFilesPage, revalidateShareTag } from "@/utils/actions/serverAction"
import { Details} from "./Details"
import Sharefile from "./Sharefile"

interface UsersIDs{
    _id:string;
    name:string;
    email:string;
    picture:string;
    password:string;
}

const fileDropdown = ({file}:{file: files}) => {
  const token = Cookies.get('token') || ''
  const [showDiv,setShowDiv] = useState(false)
  const [showtypeDiv,setShowTypeDiv] = useState(true)
  const [typeDiv,setTypeDiv] = useState('')
  const [fileName,setFileName] = useState(file.originalname)
  const [shareUser,setShareUser] = useState<string[]>([])
  const [shareUserid,setShareUserid] = useState<UsersIDs[]>([])
  const [name,setName] = useState('')

  useEffect (()=>{
    const fetchUsers = async () => {
    const usersID = file.shareuser;
      const response = await api.post('/user/getshareUSer', usersID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setShareUserid(response.data.data)
      const user=  await api.get(`/user/getuser/${file.owner}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    })
    setName(user.data.data.name)
  };
    fetchUsers()
  },[file.shareuser])

  const handleRname =  async(e: React.FormEvent) => {
    e.preventDefault()
    const extension = fileName.split('.')[1]
    const extensions = file.originalname.split('.')[1]
    const name: string = `${fileName}.${extensions}`
    if(!extension){
      const response = await api.post(`/file/rename/${file._id}`,{name: name},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      })
      
      setShowTypeDiv(true)
      await revalidateFilesPage()
      return
    }
    const response = await api.post(`/file/rename/${file._id}`,{name: fileName},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
    setShowTypeDiv(true)
    await revalidateFilesPage()
  }

  const handleshare =async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await api.post(`/file/share/${file._id}`,{shareuser: shareUser},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
    await revalidateShareTag()
    setShareUser([])
  }
  const handleRemoveUser=async(userId:string) => {
    const updatedEmails = file.shareuser.filter((e) => e !== userId);
    const response = await api.post(`/file/updateshare/${file._id}`,{shareuser: updatedEmails},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
    await revalidateShareTag()
  }

  const handleDelete = async () => {
    const response = await api.delete(`/file/delete/${file._id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
      
    await revalidateFilesPage()
    setShowTypeDiv(true)
    setShowDiv(false)
    return
  }

  return (
    <>
    <div>
      <div onClick={()=>setShowDiv(true)} className="focus-visible:ring-0 focus-visible:ring-transparent focus:ring-transparent ring-offset-transparent focus-visible:ring-offset-0 focus:ring-offset-0 size-6"><Menu/></div>
      {showDiv&&<>
        <AnimatePresence initial={showDiv}>{file && <motion.div 
        initial={{ opacity: 0,y:-100}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,y:-100}}
        className='top-0 left-0 z-20 absolute flex justify-center items-center backdrop-blur-xs w-full h-full'>
          <div className="bg-zinc-800 p-4 rounded-xl w-85 md:w-120">
              {showtypeDiv?<><div className="flex justify-between gap-2">
                <div className='mb-3 font-semibold text-[1.2rem] truncate'>{file.originalname}</div>
                <div onClick={()=>{setShowDiv(false)}}>x</div>
              </div>
            {actionDropdown.map((items)=>(
              <div key={items.value} className="flex flex-col gap-3" onClick={()=>{if(items.lable!=='Download')setShowTypeDiv(false);setTypeDiv(items.lable)}} ><Items key={items.value} lable={items.lable} url={file.imageURL} file={file}/></div>
            ))}</>:<>
              <div className="flex justify-between gap-2">
                <div className='flex gap-4 mb-3 w-full font-semibold text-[1.2rem] truncate'>
                  <div className="flex justify-center w-full">{typeDiv}</div>
                  <div className="" onClick={()=>{setShowTypeDiv(true)}}>x</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 p-3 w-full h-full text-[1.2rem]">
                {typeDiv==='Rename' && <>
                    <input className="bg-zinc-600 mx-2 p-2 px-4 rounded-full w-full" type="text" name="name" onChange={(e)=>setFileName(e.target.value)} value={fileName} />
                    <div className="flex justify-between gap-3 w-full">
                      <div className="flex justify-center items-center bg-zinc-700 px-5 py-1 rounded-full w-1/2" onClick={()=>{setShowTypeDiv(true)}}>cancle</div>
                      <button onClick={(e)=>handleRname(e)} className="flex justify-center items-center bg-purple-600 px-5 py-1 rounded-full w-1/2">save</button>
                    </div>
                </>}

                {typeDiv==='Details' && <>
                <Details file={file} name={name}/>
                </>}

                {typeDiv==='Share' && <>
                <Details file={file} name={name}/>
                <Sharefile file={file}
                  onInputChange={setShareUser}
                  onRemove={handleRemoveUser}
                  shareUserid={shareUserid}/>
                  <div className="flex gap-3">
                    <div onClick={(e)=>handleshare(e)} className="flex justify-center items-center bg-purple-700 rounded-full w-25 h-12">Share</div>
                  </div>
                </>}
                
                {typeDiv==='Delete' && <>
                    <div className="px-4 font-light text-[1.2rem]">Are you soure you want move <b className="font-bold">{file.originalname}</b> file to Trash?</div>
                    <div className="flex gap-3">
                      <div className="flex justify-center items-center bg-zinc-600 px-5 py-1 rounded-full" onClick={()=>{setShowTypeDiv(true)}}>cancle</div>
                      <div onClick={()=>handleDelete()} className="flex justify-center items-center bg-red-500 rounded-full w-25">Move</div>
                    </div>
                </>}
              </div>
            </>}
          </div>
          </motion.div>}</AnimatePresence>
        </>}
      </div>
    </>
  )
}

export default fileDropdown
