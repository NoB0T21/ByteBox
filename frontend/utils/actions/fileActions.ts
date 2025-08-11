
import { api } from "../api"

export const getFiles = async ({ token }: { token: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/file/getfile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        next: {
            tags: ['files'], 
            },
    })
    const files = await res.json()
    return files.file
}

export const getShareuser = async ({ token }: { token: string}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/file/getfile`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        next: {
            tags: ['Share'], 
            },
    })
    const files = await res.json()
    return files.file
}

export const SearchFiles = async ({token,query}:{token:string,query:string}) => {
    const files = await api.get(`/file/getfile?q=${query}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
        withCredentials:true
    })
    return files.data.file
}

export const SortFiles = async ({token,query}:{token:string,query:string}) => {
    const files = await api.get(`/file/getfile?sort=${query}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
        withCredentials:true
    })
    return files.data.file
}

export const getuser = async ({token}:{token:string}) => {
    const files = await api.get(`/user/getuser`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
        withCredentials:true
    })
    return files.data.file
}