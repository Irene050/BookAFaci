import React, { useContext, createContext, useState, useEffect } from "react"
import { LogOutIcon, ChevronLast, ChevronFirst } from "lucide-react"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import logo from '../assets/logoipsum-406.svg';

const SidebarContext = createContext()
const raw = localStorage.getItem('user');
let user = {};
try {
  user = raw ? JSON.parse(raw) : {};
} catch (e) {
  user = {};
}

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  const navigate = useNavigate()

    const [user, setUser] = useState(() => {
      try {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : {}
      } catch {
        return {}
      }
    })

   useEffect(() => {
     const onStorage = (e) => {
       if (e.key === 'user') {
         try {
           setUser(e.newValue ? JSON.parse(e.newValue) : {})
         } catch {
           setUser({})
         }
       }
     }
     const onAuthChange = () => {
       try {
         const raw = localStorage.getItem('user')
         setUser(raw ? JSON.parse(raw) : {})
       } catch {
         setUser({})
       }
     }
     window.addEventListener('storage', onStorage)
     window.addEventListener('authChange', onAuthChange)
     return () => {
       window.removeEventListener('storage', onStorage)
       window.removeEventListener('authChange', onAuthChange)
     }
   }, [])


  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    toast.info('You have been logged out', {
      position: 'top-right',
      autoClose: 1000,
    })
    navigate('/')
  }

  return (
    <aside className="h-screen w-fit">
      <nav className="h-full flex flex-col bg-gradient-to-b from-[#FFFEFF] to-[#D2EDFF] border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="flex items-center justify-center text-[1rem] bg-red-50 rounded-[5px] text-red-600 hover:bg-red-100 mb-[15px] p-2 w-[65%] transition-all"
          >
            <LogOutIcon size={16} className="mr-[2.5px] flex-shrink-0" />
            <span className={`overflow-hidden transition-all ${expanded ? 'inline-block' : 'w-[0] invisible '}`}>
              Logout
            </span>
          </button>
        </div>
        <div className="border-t flex p-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || '')}&background=c7d2fe&color=3730a3&bold=true`}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.name}</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, onClick}) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    
    <li
      className={`
        relative flex items-center py-2 px-3 my-3
        font-medium rounded-md cursor-pointer
      transition-colors group ${
          active
            ? 'bg-gradient-to-r from-[#346D9A] to-[#83C9FF] text-[#FFFFFF]'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
    >
    <button onClick={onClick} className="flex items-center w-full text-left">
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? 'w-51 ml-5' : 'w-0'}`}>
        {text}
      </span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
      </button>
    </li>
  )
}
