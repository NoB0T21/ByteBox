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
      {type==='image'?<Image src={url} alt='prev' width={500} height={500} className='rounded-full size-16' />:<FileLoge type={extension} extension={type}/>}
    </figure>
  )
}

export default Thumbnail
