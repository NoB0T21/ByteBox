'use client'
import { convertFileToUrl, getFileType } from '@/utils/utils'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { BarLoader } from 'react-spinners'
import { useAppContext } from '@/context'
import Thumbnail from './Thumbnail'
import { MAX_FILE_SIZE } from '@/utils'
import Toasts from './toasts/Toasts'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { revalidateFilesPage } from '@/utils/actions/serverAction'

const FileUpload = () => {
  const token = Cookies.get("token") || "";
  const {user} = useAppContext()
  const {_id} = user
  const [files,setFiles] = useState<File[]>([])
  const [message, setMessage] = useState('warningMsg')
  const [tostType,setTostType] = useState('')
  const [showToast,setShowToast] = useState(false)
    
  const onDrop = useCallback( async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    const uploadPromises = acceptedFiles.map(async (file) => {
      if(file.size > MAX_FILE_SIZE){
        setFiles((prevFiles)=>prevFiles.filter((f)=>f.name!==file.name))
        setTostType('warningMsg')
          setMessage('Max size is 100MB')
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 6000);
        return
      }
      const formData = new FormData();
          formData.append("owner", _id);
          formData.append("file", file);
      const response = await api.post(`${process.env.NEXT_PUBLIC_BASE_URL}/file/upload`,formData,{
          headers: {
              Authorization: `Bearer ${token}`,
          },
          withCredentials: true
      })

        if(response.status===200){
          setFiles((prevFiles)=>prevFiles.filter((f)=>f.name!==file.name))
          setTostType('successMsg')
          setMessage('File uploaded')
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 6000);
        }
        if(response.status!==200){
          setTostType('erreoMsg')
          setMessage('File uploaded failed')
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false)
          }, 6000);
        }
      })
      await Promise.all(uploadPromises)
      await revalidateFilesPage()
  }, [_id])

  const handleRemoveFile = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, fileName: string) => {
    e.stopPropagation();
    setFiles((prevFiles)=> prevFiles.filter((file) => file.name !== fileName))
  }

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='flex flex-col items-end cursor-pointer'>
      <input {...getInputProps()} />
      <button className='relative flex justify-center items-center bg-purple-800 rounded-md w-20 h-8'> upload <input className='left-0 absolute opacity-0 w-full h-full' type='file' name='file' placeholder='Upload'/></button>
      {files.length>0 && (
        <ul className='right-0 -bottom-1 absolute flex flex-col justify-center gap-2 bg-[#f7f7f723] drop-shadow-white backdrop-blur-sm m-5 rounded-md w-65'>
          <h4 className='px-2 py-1 font-light'>Uploding...</h4>
          {files.map((file, index)=>{
            const{type, extension} = getFileType(file.name)
            return(<li className='p-1' key={`${file.name}-${index}`}>
              <div className='flex justify-between items-center px-2'>
                <div className='flex justify-center items-center gap-2'>
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={type==='image'? convertFileToUrl(file) : '/'}
                  />
                  <div className='text-sm'>
                    {file.name}
                    <BarLoader color='#fff'/>
                  </div>
                </div>
                <div onClick={(e)=>handleRemoveFile(e,file.name)}>X</div>
              </div>
            </li>)
          })}
        </ul>
      )}
      {showToast && <Toasts type={tostType==='warningMsg'||tostType==='erreoMsg'?(tostType==='erreoMsg'?'erreoMsg':'warningMsg'):'successMsg'} msg={message}/>}
    </div>
  )
}

export default FileUpload
