// import React from 'react'
// import { BsRobot } from 'react-icons/bs'

// function Footer() {
//   return (
//     <div className='bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-10'>
//       <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-8 px-3 text-center'>
//         <div className='flex justify-center items-center gap-3 mb-3'>
//             <div className='bg-black text-white p-2 rounded-lg'><BsRobot size={16}/></div>
//             <h2 className='font-semibold'>InterviewIQ.AI</h2>
//         </div>
//         <p className='text-gray-500 text-sm max-w-xl mx-auto'>
//   AI-powered interview preparation platform designed to improve
//           communication skills, technical depth and professional confidence.
//         </p>


//       </div>
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const EXPLORE = [
  { label: "How it works", to: "/#how-it-works" },
  { label: "Features", to: "/#features" },
  { label: "Interview modes", to: "/#modes" },
]

const ACCOUNT = [
  { label: "Pricing and credits", to: "/pricing" },
  { label: "Home", to: "/" },
]

function FooterLinks({ title, links, onNavigate }) {
  return (
    <div>
      <h3 className='text-sm font-semibold text-white mb-4'>{title}</h3>
      <ul className='space-y-3'>
        {links.map((l) => (
          <li key={l.label}>
            <button
              onClick={() => onNavigate(l.to)}
              className='text-sm text-emerald-100/70 hover:text-white transition focus:outline-none focus-visible:underline'>
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  const navigate = useNavigate()

  const go = (to) => {
    navigate(to)
    // plain links (no hash) should start at the top of the page
    if (!to.includes('#')) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='mt-8 bg-emerald-950 text-white'>
      <div className='max-w-6xl mx-auto px-6 pt-14 pb-8'>
        <div className='grid gap-10 md:grid-cols-5'>

          <div className='md:col-span-3 max-w-md'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='bg-linear-to-br from-emerald-500 to-teal-400 text-white p-2 rounded-lg shadow-sm'>
                <BsRobot size={18} />
              </div>
              <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
            </div>

            <p className='text-emerald-100/70 text-sm leading-relaxed'>
              AI-powered interview preparation platform designed to improve
              communication skills, technical depth and professional confidence.
            </p>
          </div>

          <FooterLinks title='Explore' links={EXPLORE} onNavigate={go} />
          <FooterLinks title='Account' links={ACCOUNT} onNavigate={go} />
        </div>

        <div className='mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-100/50'>
          <p>© {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.</p>
          <p>Practice today, interview with confidence.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer