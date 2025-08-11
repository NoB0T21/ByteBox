'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

type User = {
    _id: string;
    name?: string;
    email?: string;
    picture?: string;
  };

  type AppContextType = {
    user: User;
  };

  const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({children}:{children: React.ReactNode}){
    const [user, setUser] = useState<User>({
        _id: '',
        name: '',
        email: '',
        picture: ''
    })
    const path = usePathname();

    useEffect(() => {
    // Try to load user from cookie on first render
    let userCookie = localStorage.getItem('user')
    if(!userCookie)userCookie=Cookies.get('user')||''
    if (userCookie) {
      try {
        const parsedUser: User = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing user cookie', err);
      }
    }
  }, [path]);
    return (
        <AppContext.Provider value={{user}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(): AppContextType{
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppWrapper');
    }
    return context;
}