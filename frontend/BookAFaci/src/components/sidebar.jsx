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
  const [expanded, setExpanded] = useState(false)
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
      autoClose: 1300,
    })
    setTimeout(() => navigate('/login', { replace: true }), 1300);
  }

  return (
    <>
    <aside className="fixed left-0 top-0 h-full z-40">
      <nav className={`h-full flex flex-col bg-gradient-to-b from-[#FFFEFF] to-[#D2EDFF] border-r shadow-sm transition-all ${expanded ? "w-64" : "w-16"}`}>
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
      </nav>
    </aside>

      {expanded && (
        <div
          aria-hidden="true"
          onClick={() => setExpanded(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}
    </>
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

      {!active && !expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[#63bbff] text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
        {text}
        </div>
      )}
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-[#63bbff] text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
        {text}
        </div>
      )}
      </button>
    </li>
  )
}
