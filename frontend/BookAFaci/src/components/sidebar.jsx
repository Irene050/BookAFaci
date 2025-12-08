import React, { useContext, createContext, useState, useEffect } from "react"
import { LogOutIcon, ChevronLast, ChevronFirst } from "lucide-react"
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showBottomNav, setShowBottomNav] = useState(true)

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

   useEffect(() => {
     const handleScroll = () => {
       const currentScrollY = window.scrollY
       
       // Show nav when scrolling up, hide when scrolling down
       if (currentScrollY < lastScrollY || currentScrollY < 10) {
         setShowBottomNav(true)
       } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
         setShowBottomNav(false)
       }
       
       setLastScrollY(currentScrollY)
     }

     window.addEventListener('scroll', handleScroll, { passive: true })
     
     return () => {
       window.removeEventListener('scroll', handleScroll)
     }
   }, [lastScrollY])

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
    {/* Desktop Sidebar - hidden on mobile */}
    <aside className="fixed left-0 top-0 h-full z-[40] font-inter hidden md:block">
      <nav className={`h-full flex flex-col bg-gradient-to-b from-[#FFFEFF] to-[#D2EDFF] border-r shadow-sm transition-all ${expanded ? "w-64" : "w-16"}`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/Bookafaci.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-[10%]" : "hidden"
            }`}
            alt="BookAFaci Logo"
          />
          <span className={`italic font-bold text-[1.3rem] mr-4 text-[#356d9a] whitespace-nowrap ${expanded ? 'inline-block' : 'hidden'}`}>
            BOOKAFACI
          </span>
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

    {/* Mobile Bottom Navigation - shown only on mobile with auto-hide */}
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-[40] bg-gradient-to-r from-[#FFFEFF] to-[#D2EDFF] border-t shadow-lg font-inter transition-transform duration-300 ${
      showBottomNav ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <SidebarContext.Provider value={{ expanded: false }}>
        <ul className="flex justify-around items-center py-2 px-2">
          {children}
        </ul>
      </SidebarContext.Provider>
    </nav>

    {/* Mobile Logout Button - floating with auto-hide */}
    <button
      onClick={handleLogout}
      aria-label="Logout"
      className={`md:hidden fixed bottom-20 right-4 z-[41] flex items-center justify-center bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-all duration-300 ${
        showBottomNav ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
      }`}
    >
      <LogOutIcon size={20} />
    </button>

      {expanded && (
        <div
          aria-hidden="true"
          onClick={() => setExpanded(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 hidden md:block"
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