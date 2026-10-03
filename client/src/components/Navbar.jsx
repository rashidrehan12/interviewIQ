// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { motion } from "motion/react"
// import { BsRobot, BsCoin } from "react-icons/bs";
// import { HiOutlineLogout } from "react-icons/hi";
// import { FaUserAstronaut } from "react-icons/fa";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { setUserData } from '../redux/userSlice';
// import AuthModel from './AuthModel';
// function Navbar() {
//     const {userData} = useSelector((state)=>state.user)
//     const [showCreditPopup,setShowCreditPopup] = useState(false)
//     const [showUserPopup,setShowUserPopup] = useState(false)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [showAuth, setShowAuth] = useState(false);

//     const handleLogout = async () => {
//         try {
//             await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
//             dispatch(setUserData(null))
//             setShowCreditPopup(false)
//             setShowUserPopup(false)
//             navigate("/")

//         } catch (error) {
//             console.log(error)
//         }
//     }
//   return (
//     <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
//         <motion.div 
//         initial={{opacity:0 , y:-40}}
//         animate={{opacity:1 , y:0}}
//         transition={{duration: 0.3}}
//         className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative'>
//             <div className='flex items-center gap-3 cursor-pointer'>
//                 <div className='bg-black text-white p-2 rounded-lg'>
//                     <BsRobot size={18}/>

//                 </div>
//                 <h1 className='font-semibold hidden md:block text-lg'>InterviewIQ.AI</h1>
//             </div>

//             <div className='flex items-center gap-6  relative'>
//                 <div className='relative'>
//                     <button onClick={()=>{
//                         if(!userData){
//                             setShowAuth(true)
//                             return;
//                         }
//                         setShowCreditPopup(!showCreditPopup);
//                         setShowUserPopup(false)
//                     }} className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition'>
//                         <BsCoin size={20}/>
//                         {userData?.credits || 0}
//                     </button>

//                     {showCreditPopup && (
//                         <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
//                             <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
//                             <button onClick={()=>navigate("/pricing")} className='w-full bg-black text-white py-2 rounded-lg text-sm'>Buy more credits</button>

//                         </div>
//                     )}
//                 </div>

//                 <div className='relative'>
//                     <button
//                     onClick={()=>{
//                          if(!userData){
//                             setShowAuth(true)
//                             return;
//                         }
//                         setShowUserPopup(!showUserPopup);
//                         setShowCreditPopup(false)
//                     }} className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold'>
//                         {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                        
//                     </button>

//                     {showUserPopup && (
//                         <div className='absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
//                             <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>

//                             <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>InterView History</button>
//                             <button onClick={handleLogout} 
//                             className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
//                                 <HiOutlineLogout size={16}/>
//                                 Logout</button>
//                         </div>
//                     )}
//                 </div>

//             </div>



//         </motion.div>

//         {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
      
//     </div>
//   )
// }

// export default Navbar

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBars, FaTimes, FaHistory } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

// section links live on the home page (Home scrolls to the hash)
const LINKS = [
    { label: "How it works", to: "/#how-it-works" },
    { label: "Features", to: "/#features" },
    { label: "Modes", to: "/#modes" },
    { label: "Pricing", to: "/pricing" },
]

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);
    const menuRef = useRef(null)

    const closeAll = () => {
        setShowCreditPopup(false)
        setShowUserPopup(false)
        setShowMobileMenu(false)
    }

    // UI only: shadow after scrolling, close popups on outside click / Escape
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) closeAll()
        }
        const onKey = (e) => { if (e.key === 'Escape') closeAll() }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        document.addEventListener('mousedown', onClick)
        document.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('scroll', onScroll)
            document.removeEventListener('mousedown', onClick)
            document.removeEventListener('keydown', onKey)
        }
    }, [])

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }

    const go = (to) => {
        closeAll()
        navigate(to)
    }

    const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'

    return (
        <header className='sticky top-0 z-40 flex justify-center px-4 pt-4' ref={menuRef}>
            <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-full max-w-6xl bg-white/85 backdrop-blur-md rounded-[24px] border px-4 sm:px-6 py-3 transition-shadow ${scrolled ? 'shadow-lg border-gray-200' : 'shadow-sm border-gray-200/80'}`}>

                <div className='flex items-center justify-between gap-4'>
                    {/* brand */}
                    <button
                        onClick={() => go("/")}
                        aria-label='InterviewIQ.AI home'
                        className={`flex items-center gap-3 rounded-lg ${focusRing}`}>
                        <div className='bg-linear-to-br from-emerald-600 to-teal-500 text-white p-2 rounded-lg shadow-sm'>
                            <BsRobot size={18} />
                        </div>
                        <span className='font-semibold text-lg text-gray-900'>InterviewIQ.AI</span>
                    </button>

                    {/* desktop links */}
                    <nav className='hidden md:flex items-center gap-1' aria-label='Main'>
                        {LINKS.map((l) => (
                            <button
                                key={l.label}
                                onClick={() => go(l.to)}
                                className={`px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition ${focusRing}`}>
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    <div className='flex items-center gap-2 sm:gap-3'>

                        {!userData ? (
                            <button
                                onClick={() => setShowAuth(true)}
                                className={`bg-linear-to-r from-emerald-600 to-teal-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:opacity-90 transition ${focusRing}`}>
                                Sign in
                            </button>
                        ) : (
                            <>
                                {/* credits */}
                                <div className='relative'>
                                    <button
                                        onClick={() => {
                                            setShowCreditPopup(!showCreditPopup);
                                            setShowUserPopup(false)
                                            setShowMobileMenu(false)
                                        }}
                                        aria-haspopup='true'
                                        aria-expanded={showCreditPopup}
                                        aria-label={`${userData?.credits || 0} credits`}
                                        className={`flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-3.5 py-2 rounded-full text-sm font-semibold hover:bg-amber-100 transition ${focusRing}`}>
                                        <BsCoin size={18} />
                                        {userData?.credits || 0}
                                    </button>

                                    {showCreditPopup && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className='absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-2xl p-5 z-50'>
                                            <p className='text-2xl font-bold text-gray-900'>{userData?.credits || 0}</p>
                                            <p className='text-sm text-gray-500 mb-4'>credits left</p>
                                            <p className='text-sm text-gray-600 mb-4'>Need more credits to continue interviews?</p>
                                            <button
                                                onClick={() => go("/pricing")}
                                                className={`w-full bg-linear-to-r from-emerald-600 to-teal-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition ${focusRing}`}>
                                                Buy more credits
                                            </button>
                                        </motion.div>
                                    )}
                                </div>

                                {/* user */}
                                <div className='relative'>
                                    <button
                                        onClick={() => {
                                            setShowUserPopup(!showUserPopup);
                                            setShowCreditPopup(false)
                                            setShowMobileMenu(false)
                                        }}
                                        aria-haspopup='true'
                                        aria-expanded={showUserPopup}
                                        aria-label='Account menu'
                                        className={`w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold hover:bg-emerald-700 transition ${focusRing}`}>
                                        {userData?.name.slice(0, 1).toUpperCase()}
                                    </button>

                                    {showUserPopup && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className='absolute right-0 mt-3 w-56 bg-white shadow-xl border border-gray-200 rounded-2xl p-2 z-50'>
                                            <div className='px-3 py-2 border-b border-gray-100 mb-1'>
                                                <p className='text-xs text-gray-400'>Signed in as</p>
                                                <p className='text-sm text-gray-900 font-semibold truncate'>{userData?.name}</p>
                                            </div>

                                            <button
                                                onClick={() => go("/history")}
                                                className={`w-full text-left text-sm px-3 py-2.5 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition ${focusRing}`}>
                                                <FaHistory size={14} />
                                                Interview history
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className={`w-full text-left text-sm px-3 py-2.5 rounded-lg flex items-center gap-2 text-rose-600 hover:bg-rose-50 transition ${focusRing}`}>
                                                <HiOutlineLogout size={16} />
                                                Log out
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* mobile menu toggle */}
                        <button
                            onClick={() => {
                                setShowMobileMenu(!showMobileMenu)
                                setShowCreditPopup(false)
                                setShowUserPopup(false)
                            }}
                            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
                            aria-expanded={showMobileMenu}
                            className={`md:hidden w-10 h-10 rounded-full border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-50 transition ${focusRing}`}>
                            {showMobileMenu ? <FaTimes size={16} /> : <FaBars size={16} />}
                        </button>
                    </div>
                </div>

                {/* mobile links */}
                {showMobileMenu && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.2 }}
                        className='md:hidden overflow-hidden'
                        aria-label='Mobile'>
                        <div className='pt-3 mt-3 border-t border-gray-100 flex flex-col'>
                            {LINKS.map((l) => (
                                <button
                                    key={l.label}
                                    onClick={() => go(l.to)}
                                    className={`text-left px-3 py-3 rounded-xl text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition ${focusRing}`}>
                                    {l.label}
                                </button>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        </header>
    )
}

export default Navbar