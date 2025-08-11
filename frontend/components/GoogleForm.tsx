
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import Toasts from "./toasts/Toasts";
import { Google } from "./icon/Icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const GoogleForm = () => {

  const router=useRouter()
  const [showToast,setShowToast] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [tostType,setTostType] = useState('warningMsg')

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async(res) => {
      setShowToast(false)
      try {
        const responses = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
          headers:{
            Authorization: `Bearer ${res.access_token}`,
          }
        })
        if(responses.status === 200){
          localStorage.setItem('token',res.access_token)
          Cookies.set("token", res.access_token, {
            expires: 1, // days
            sameSite: "strict",
            secure: true
          });
          
        }
        const form = new FormData();
          form.append('name', responses.data.name || '');
          form.append('email', responses.data.email || '');
          form.append('password',responses.data.sub || '');
          form.append('picture', responses.data.picture || '');
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`,form,{withCredentials: true})
      if(response.status !== 201 || 202){
        setResponseMsg(response.data.message)
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 6000);
        const raw = response.data.user;
            const user = {
            _id: raw._id,
            name: raw.name,
            email: raw.email,
            picture: raw.picture
            }
        localStorage.setItem('user', JSON.stringify(user));
        Cookies.set('user', JSON.stringify(user), { expires: 1 });
        router.push('/')
        return
      }
      } catch (error) {
        setResponseMsg('Login Failed')
          setTostType('warningMsg');
          setShowToast(true)
          setTimeout(() => {
          setShowToast(false)
        }, 6000);
        return
      }
      return
    },
    onError: () => {
      setResponseMsg('Login Failed')
      setTostType('warningMsg');
      setShowToast(true)
      setTimeout(() => {
      setShowToast(false)
    }, 6000);
    return
    }
  })

  return (
    <>
    <div className="mt-5 w-2/3 lg:w-1/2">
      <button onClick={()=>handleGoogleLogin()} className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md w-full font-semibold text-md"><div className="flex justify-center gap-2 w-full h-6"><Google/>Google</div></button>
    </div>
    {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default GoogleForm
