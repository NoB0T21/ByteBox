import { files } from '@/Types'
import Image from 'next/image';

interface UsersIDs{
    _id:string;
    name:string;
    email:string;
    picture:string;
    password:string;
}

const Sharefile = ({file,onInputChange, onRemove,shareUserid}:{file:files,onInputChange:React.Dispatch<React.SetStateAction<string[]>>, onRemove: (email: string) => void, shareUserid: UsersIDs[];}) => {


    return (
    <>
        <div className="space-y-2 mt-2 w-full">
            <p className="pl-1 text-light-100 subtitle-2">
            Share file with other users
            </p>
            <input
                type="email"
                placeholder="Enter email address"
                onChange={(e) => onInputChange(e.target.value.trim().split(","))}
                className="bg-zinc-700 shadow-drop-1 px-4 focus:border-2 focus:border-purple-700 rounded-full outline-none w-full h-[52px] body-2"
            /> 
             <div className="flex justify-between">
                <p className="text-light-100 subtitle-2">Shared with</p>
                <p className="text-light-200 subtitle-2">
                {file.shareuser.length} users
                </p>
            </div>
            <div className='flex flex-wrap gap-3 truncate'>
                {shareUserid.length===0?<>this file is not share with anyone</>:shareUserid.map((Ids)=>(
                    <div key={Ids._id} className='relative flex flex-col justify-center items-start gap-2 bg-zinc-800 w-16 h-18 truncate'>
                        <Image width={100} height={100} className='rounded-full size-15' src={Ids.picture} alt="shareuser" />
                        <div className='flex justify-center w-full text-xs truncate'>{Ids.name}</div>
                        <p onClick={() => onRemove(Ids._id)} className='-top-2 right-0 absolute'>x</p>
                    </div>))}
            </div>
        </div>
    </>
  )
}

export default Sharefile
