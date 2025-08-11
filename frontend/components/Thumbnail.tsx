import React from 'react'
import Image from 'next/image';
import FileLoge from './FileLogo'

interface Props {
    type: string;
    extension: string;
    url: string;
}

const Thumbnail = ({type,extension,url=''}:Props) => {
    const isImage = type==="image" && extension!=="svg"
  return (
    <figure>
      {type==='image'?<Image src={url} alt='prev' width={100} height={100} className='w-16 h-full rounded-full' />:<FileLoge type={extension} extension={type}/>}
    </figure>
  )
}

export default Thumbnail
