'use client';

import React, { useState } from "react";
import { z } from "zod";
import { PulseLoader } from "react-spinners";
import {api} from "../utils/api"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Link from "next/link";
import Toasts from "./toasts/Toasts";
import GoogleForm from "./GoogleForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MAX_FILE_SIZE } from '@/utils'
import { convertFileToUrl } from "@/utils/utils";
import Image from "next/image";


type FormType = 'sign-in' | 'sign-up'

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    email: z.string().email("plese enter valid email"),
    password: z.string().min(3,"length 3"),
    confirm: z.string()
}).refine((data) => data.password === data.confirm,{
    message:"Password does not match",
    path:["confirm"]
})

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

const AuthForm = ({type}: {type: FormType}) => {
    const googleID = process.env.NEXT_PUBLIC_GOOGLE_ID || 'none'
    const [formData, setFormData] = useState<{
        name?: string;
        email?: string;
        picture?: string;
        password?: string;
        confirm?: string;
        file?: File
    }>({})
    const [error, setError] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirm?: string
    }>({})
    const router=useRouter()
    const [show,setShow] = useState(false)
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<File>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData, file: file})
        setShowToast(false)
        setLoading(true)
        let parserResult: any
        if(type === 'sign-up'){
            parserResult = formSchema.safeParse({
                name:formData.name,
                email: formData.email,
                password: formData.password,
                confirm: formData.confirm
            })
        }
        if(type === 'sign-in'){
            parserResult = signInSchema.safeParse({
                email: formData.email,
                password: formData.password
            })
        }
        if(!parserResult.success){
            const errorMessages = parserResult.error.flatten().fieldErrors
            if(type === 'sign-up'){
                setError({
                    name: errorMessages.name?.[0],
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.confirm?.[0]
                })
            }
            if(type === 'sign-in'){
                setError({
                    name: '',
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.password?.[0]
                })
            }
            setLoading(false)
            return
        }
        setError({
            name: '',
            email: '',
            password: '',
            confirm: ''
        })
        const form = new FormData();
            form.append('name', formData.name || '');
            form.append('email', formData.email || '');
            form.append('password', formData.password || '');
            form.append('confirm', formData.confirm || '');
            if (formData.file) {
            form.append('file', formData.file);
            }
        const response = await api.post(type === 'sign-in'? '/user/signin':'/user/signup',type === 'sign-in'? formData:form,{withCredentials: true})
        if(response.status !== 201){
            setResponseMsg(response.data.message)
            if(response.status === 202)setTostType('infoMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 6000);
              return
            }
            const token = response.data.token
            console.log(response.data.user)
            const raw = response.data.user;
            const user = {
            _id: raw._id,
            name: raw.name,
            email: raw.email,
            picture: raw.picture
            };
                
            Cookies.set('user', JSON.stringify(user), { expires: 1 });
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token',token)
            Cookies.set("token", token, {
                expires: 1, // days
                sameSite: "strict",
                secure: true
            });
        router.push('/')
        setLoading(false)
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-1 rounded-md w-full md:w-2/3 lg:w-full">
            {type === 'sign-up' && (
                <>
                    <div className="relative w-2/3 lg:w-1/2">
                        {error.name && <p className="mb-1 text-red-500 text-xs">{error.name}</p>}
                        <input name='name' type="text" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value})}}required 
                            className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>Name*</span>
                        </label>
                    </div>
                </>
            )}
            <div className="relative w-2/3 lg:w-1/2">
                {error.email && <p className="mb-1 text-red-500 text-xs">{error.email}</p>}
                <input name='email' type="email" value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}}required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Email*</span>
                </label>
            </div>
            <div className="relative w-2/3 lg:w-1/2">
                {error.password && <p className="mb-1 text-red-500 text-xs">{error.password}</p>}
                <input name='password' type={show?'text':'password'} value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}}required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Password*</span>
                </label>
                <div onClick={() =>setShow(!show)} className='right-4 z-1 absolute flex justify-end p-2 rounded-full text-gray-400 -translate-y-9'>
                    { show ? 'Show':'hide' }
                </div>
            </div>
            {type === 'sign-up' && (
                <>
                    <div className="relative w-2/3 lg:w-1/2">
                        {error.confirm && <p className="mb-1 text-red-500 text-xs">{error.confirm}</p>}
                        <input type={show?'text':'password'}  value={formData.confirm} onChange={(e) => {setFormData({...formData, confirm: e.target.value})}}required 
                            className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>Confirm</span>
                        </label>
                    </div>
                </>
            )}
            {type === 'sign-up' && (
                <>
                    <div className="flex gap-3 w-2/3 lg:w-1/2">
                        <div className="relative bg-purple-700 p-2 px-3 w-auto h-10">Upload Profile pic<input className='left-0 absolute opacity-0 w-full' type='file' onChange={(e)=>{
                            const file = e.target.files?.[0];
                            if (file) {
                                setFile(file);
                            }}} name='file' accept="image/*" required placeholder='Upload'/></div>
                        {file && 
                        <div className="size-15">
                            <Image width={100} height={100} className="w-full object-cover" src={convertFileToUrl(file)} alt="Profile" />
                        </div>}
                    </div>
                </>
            )}
            <div className="w-2/3 lg:w-1/2">
                {type === 'sign-up' && <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md w-full font-semibold text-md">{loading? <PulseLoader color="#fff"/>:'Sign-up'}</button>}
                {type === 'sign-in' && <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md w-full font-semibold text-md">{loading? <PulseLoader color="#fff"/>:'Sign-in'}</button>}
            </div>
        </form>
        <GoogleOAuthProvider clientId={googleID}>
            <GoogleForm/>
        </GoogleOAuthProvider>
        <Link href={type == 'sign-in' ? '/sign-up' : '/sign-in'} className='flex justify-end my-1 w-2/3 lg:w-1/2 text-blue-400 text-sm text-center hover:underline cursor-pointer'>
            <p>{type == 'sign-in' ? "Don't have an account?" : "Already have an account?"} <i className='text-blue-400'>{type == 'sign-in' ? 'Sign Up' : 'Sign In'}</i></p>
        </Link>
        {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default AuthForm
