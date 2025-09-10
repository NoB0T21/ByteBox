import Image from 'next/image'
import React from 'react'

const FileLogo = ({extension,type}: {type:string,extension:string}) => {
  return (
    <div>
      {type==='doc' && <Image className='size-15' src={'/Images/doc.png'} alt='file' width={500} height={500}/>}
      {type==='docx' && <Image className='size-15' src={'/Images/docx.png'} alt='file' width={500} height={500}/>}
      {type==='xls' && <Image className='size-15' src={'/Images/xls.png'} alt='file' width={500} height={500}/>}
      {type==='xlsx' && <Image className='size-15' src={'/Images/xlsx.png'} alt='file' width={500} height={500}/>}
      {type==='txt' && <Image className='size-15' src={'/Images/txt.png'} alt='file' width={500} height={500}/>}
      {type==='ppt' && <Image className='size-15' src={'/Images/ppt.png'} alt='file' width={500} height={500}/>}
      {type==='pptx' && <Image className='size-15' src={'/Images/pptx.png'} alt='file' width={500} height={500}/>}
      {type==='pdf' && <Image className='size-15' src={'/Images/pdf.png'} alt='file' width={500} height={500}/>}
      {extension==='video' && <Image className='size-15' src={'/Images/play.png'} alt='file' width={500} height={500}/>}
      {extension==='other' && <Image className='size-15' src={'/Images/unknown.png'} alt='file' width={500} height={500}/>}
      {extension==="mp3"||extension==="wav"||extension==="ogg"||extension==="flac"||extension==="m4a" && <Image className='size-15' src={'/Images/audio.png'} alt='file' width={500} height={500}/>}
    </div>
  )
}

export default FileLogo
