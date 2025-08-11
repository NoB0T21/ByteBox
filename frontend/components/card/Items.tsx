import { Details, Download, Rename, Share, Trash } from '../icon/Icons'
import DownloadBtn from '../DownloadBtn'
import { files } from '@/Types'

const Items = ({lable,url, file}:{lable: string,url: string,file: files}) => {
  return (
    <>
    <div className={` ${lable==='Delete' ? 'hover:bg-red-700': `${lable==='Download' ? 'hover:bg-blue-500': 'hover:bg-purple-700 '}`} text-[1.1rem] gap-5 flex justify-start items-center font-light px-3 rounded-2xl h-8`}>
      <div className={`w-5 hover:animate-bounce`}>
        {lable==='Rename' && <Rename/>}
        {lable==='Details' && <Details/>}
        {lable==='Share' && <Share/>}
        {lable==='Download' && <Download/>}
        {lable==='Delete' && <Trash/>}
      </div>
      <div >{lable==='Download' ? <DownloadBtn url={`${url}`} name={file.originalname}/> : <p>{lable}</p>}</div>
    </div>
    </>
  )
}

export default Items
