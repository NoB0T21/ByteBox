import AvailableStorage from "@/components/dashbord/AvailableStorage";
import RecentFile from "@/components/dashbord/RecentFile";
import TypeFile from "@/components/dashbord/TypeFile";
import { files } from "@/Types";
import { getFilesll } from "@/utils/actions/fileActions";
import { getFileSize, getFileSizeinPercentage } from "@/utils/utils";
import { cookies, } from 'next/headers';

export default async function Home() {
  const token = (await cookies()).get('token')?.value || ''
  const file:files[] = await getFilesll({token: token})
  let sum:any =0;
  const size =await file.forEach((f: files)=>{
    return sum += f.fileSize
  },0)
  const percentage = getFileSizeinPercentage(sum)
  const sizes = getFileSize(sum)
  
  return (
    <div className="gap-4 grid grid-rows-6 sm:grid-rows-3 sm:grid-flow-col h-auto md:h-full">
      <div className="sm:col-span-1 row-span-1 gradient-bg2 hover:scale-101 rounded-xl transition-(scale) duration-300 ease-in-out">
        <AvailableStorage percentage={percentage} size={sizes}/>
      </div>
      <div className="sm:col-span-1 row-span-2 sm:row-span-2">
        <TypeFile file={file}/>
      </div>
      <div className="sm:col-span-2 row-span-3 sm:row-span-3 overflow-y-auto scrollbar">
        <RecentFile file={file}/>
      </div>
    </div>
  );
}
