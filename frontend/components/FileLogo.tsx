import Image from 'next/image'
import React from 'react'

const FileLogo = ({extension,type}: {type:string,extension:string}) => {
  return (
    <div>
      {type==='doc' && <Image className='w-15 h-15' src={'/Images/doc.png'} alt='file' width={100} height={100}/>}
      {type==='docx' && <Image className='w-15 h-15' src={'/Images/docx.png'} alt='file' width={100} height={100}/>}
      {type==='xls' && <Image className='w-15 h-15' src={'/Images/xls.png'} alt='file' width={100} height={100}/>}
      {type==='xlsx' && <Image className='w-15 h-15' src={'/Images/xlsx.png'} alt='file' width={100} height={100}/>}
      {type==='txt' && <Image className='w-15 h-15' src={'/Images/txt.png'} alt='file' width={100} height={100}/>}
      {type==='ppt' && <Image className='w-15 h-15' src={'/Images/ppt.png'} alt='file' width={100} height={100}/>}
      {type==='pptx' && <Image className='w-15 h-15' src={'/Images/pptx.png'} alt='file' width={100} height={100}/>}
      {type==='pdf' && <Image className='w-15 h-15' src={'/Images/pdf.png'} alt='file' width={100} height={100}/>}
      {extension==='video' && <Image className='w-15 h-15' src={'/Images/play.png'} alt='file' width={100} height={100}/>}
      {extension==='other' && <Image className='w-15 h-15' src={'/Images/unknown.png'} alt='file' width={100} height={100}/>}
      {extension==="mp3"||extension==="wav"||extension==="ogg"||extension==="flac"||extension==="m4a" && <Image className='w-15 h-15' src={'/Images/audio.png'} alt='file' width={100} height={100}/>}
    </div>
  )
}

export default FileLogo
