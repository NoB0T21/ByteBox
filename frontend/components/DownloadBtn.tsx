'use client'

import { useState } from "react"

const DownloadBtn = ({url, name}:{url: string,name: string}) => {
    const [progress, setprogress] = useState(0)
    const [downloading, setDownloading] = useState(false)
    const [error,setError] = useState('')

    const HandleDownload = () => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'

        xhr.onprogress = (event) => {
            if(event.lengthComputable){
                const percent = Math.round((event.loaded/event.total)*100)
                setprogress(percent)
            }
        }

        xhr.onloadstart =() =>{ 
            setDownloading(true)
            setprogress(0)
            setError('')
        }

        xhr.onload =() =>{
            if(xhr.status>=200 && xhr.status<300){
                const url = window.URL.createObjectURL(xhr.response)
                const a = document.createElement("a")

                a.href=url
                a.download=name
                a.click()
                window.URL.revokeObjectURL(url)
            }else{
                setError('error occoyes')
            }
        }
        
        xhr.onloadend =() => {
            setDownloading(false)
            setprogress(0)
        }

        xhr.open("GET", url , true)
        xhr.send();
    }
  return (
    <>
        <button onClick={HandleDownload} disabled={downloading}>{downloading?`${progress} %`:'Download'}</button>
    </>
  )
}

export default DownloadBtn
