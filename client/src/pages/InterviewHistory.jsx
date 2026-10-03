// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from "axios"
// import { ServerUrl } from '../App'
// import { FaArrowLeft } from 'react-icons/fa'
// function InterviewHistory() {
//     const [interviews, setInterviews] = useState([])
//     const navigate = useNavigate()

//     useEffect(() => {
//         const getMyInterviews = async () => {
//             try {
//                 const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })


//                 setInterviews(result.data)
                

//             } catch (error) {
//                 console.log(error)
//             }

//         }

//         getMyInterviews()

//     }, [])


//     return (
//         <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-10' >
//             <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

//                 <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
//                     <button
//                         onClick={() => navigate("/")}
//                         className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

//                     <div>
//                         <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
//                             Interview History
//                         </h1>
//                         <p className='text-gray-500 mt-2'>
//                             Track your past interviews and performance reports
//                         </p>

//                     </div>
//                 </div>


//                 {interviews.length === 0 ?
//                     <div className='bg-white p-10 rounded-2xl shadow text-center'>
//                         <p className='text-gray-500'>
//                             No interviews found. Start your first interview.
//                         </p>

//                     </div>

//                     :

//                     <div className='grid gap-6'>
//                         {interviews.map((item, index) => (
//                             <div key={index}
//                             onClick={()=>navigate(`/report/${item._id}`)}
//                              className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>
//                                 <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//                                     <div>
//                                         <h3 className="text-lg font-semibold text-gray-800">
//                                             {item.role}
//                                         </h3>

//                                         <p className="text-gray-500 text-sm mt-1">
//                                             {item.experience} • {item.mode}
//                                         </p>

//                                         <p className="text-xs text-gray-400 mt-2">
//                                             {new Date(item.createdAt).toLocaleDateString()}
//                                         </p>
//                                     </div>

//                                     <div className='flex items-center gap-6'>

//                                         {/* SCORE */}
//                                         <div className="text-right">
//                                             <p className="text-xl font-bold text-emerald-600">
//                                                 {item.finalScore || 0}/10
//                                             </p>
//                                             <p className="text-xs text-gray-400">
//                                                 Overall Score
//                                             </p>
//                                         </div>

//                                         {/* STATUS BADGE */}
//                                         <span
//                                             className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
//                                                     ? "bg-emerald-100 text-emerald-700"
//                                                     : "bg-yellow-100 text-yellow-700"
//                                                 }`}
//                                         >
//                                             {item.status}
//                                         </span>


//                                     </div>
//                                 </div>

//                             </div>

//                         ))
//                         }

//                     </div>
//                 }
//             </div>

//         </div>
//     )
// }

// export default InterviewHistory

import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaSearch, FaChevronRight, FaRegCalendarAlt } from 'react-icons/fa'

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'incomplete', label: 'In progress' },
]

const scoreTone = (score) => {
    if (score >= 7) return { ring: 'stroke-emerald-500', text: 'text-emerald-600' }
    if (score >= 4) return { ring: 'stroke-amber-500', text: 'text-amber-600' }
    return { ring: 'stroke-rose-500', text: 'text-rose-600' }
}

function ScoreRing({ score = 0 }) {
    const radius = 24
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (Math.min(score, 10) / 10) * circumference
    const tone = scoreTone(score)

    return (
        <div className='relative h-16 w-16 shrink-0' aria-label={`Score ${score} out of 10`}>
            <svg viewBox='0 0 60 60' className='h-full w-full -rotate-90'>
                <circle cx='30' cy='30' r={radius} fill='none' strokeWidth='5' className='stroke-gray-100' />
                <circle
                    cx='30' cy='30' r={radius} fill='none' strokeWidth='5' strokeLinecap='round'
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    className={`${tone.ring} transition-[stroke-dashoffset] duration-700`}
                />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center leading-none'>
                <span className={`text-base font-bold ${tone.text}`}>{score}</span>
                <span className='text-[10px] text-gray-400 mt-0.5'>/10</span>
            </div>
        </div>
    )
}

function SkeletonCard() {
    return (
        <div className='bg-white p-6 rounded-2xl border border-gray-100 animate-pulse flex items-center gap-5'>
            <div className='h-16 w-16 rounded-full bg-gray-100' />
            <div className='flex-1 space-y-3'>
                <div className='h-4 w-1/3 rounded bg-gray-100' />
                <div className='h-3 w-1/2 rounded bg-gray-100' />
            </div>
            <div className='h-6 w-20 rounded-full bg-gray-100' />
        </div>
    )
}

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState('newest')
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (err) {
                console.log(err)
                setError("We couldn't load your interviews. Check your connection and try again.")
            } finally {
                setLoading(false)
            }
        }

        getMyInterviews()
    }, [])

    const stats = useMemo(() => {
        const completed = interviews.filter(i => i.status === 'completed')
        const scored = completed.filter(i => Number(i.finalScore) > 0)
        const avg = scored.length
            ? (scored.reduce((sum, i) => sum + Number(i.finalScore), 0) / scored.length).toFixed(1)
            : '–'
        const best = scored.length ? Math.max(...scored.map(i => Number(i.finalScore))) : '–'
        return { total: interviews.length, completed: completed.length, avg, best }
    }, [interviews])

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        const list = interviews.filter(i => {
            const matchesFilter =
                filter === 'all' ||
                (filter === 'completed' ? i.status === 'completed' : i.status !== 'completed')
            const matchesQuery = !q || [i.role, i.experience, i.mode].some(v => String(v || '').toLowerCase().includes(q))
            return matchesFilter && matchesQuery
        })

        return [...list].sort((a, b) => {
            if (sort === 'score') return (Number(b.finalScore) || 0) - (Number(a.finalScore) || 0)
            const diff = new Date(b.createdAt) - new Date(a.createdAt)
            return sort === 'oldest' ? -diff : diff
        })
    }, [interviews, filter, query, sort])

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-10'>
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                {/* Header */}
                <div className='mb-8 flex items-start gap-4'>
                    <button
                        onClick={() => navigate("/")}
                        aria-label='Back to home'
                        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
                    >
                        <FaArrowLeft className='text-gray-600' />
                    </button>

                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>Interview history</h1>
                        <p className='text-gray-500 mt-2'>Review past interviews and open any report.</p>
                    </div>
                </div>

                {/* Summary */}
                {!loading && !error && interviews.length > 0 && (
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-8'>
                        {[
                            { label: 'Interviews', value: stats.total },
                            { label: 'Completed', value: stats.completed },
                            { label: 'Average score', value: stats.avg },
                            { label: 'Best score', value: stats.best },
                        ].map(s => (
                            <div key={s.label} className='bg-white/80 backdrop-blur rounded-xl border border-gray-100 px-5 py-4'>
                                <p className='text-2xl font-bold text-gray-800'>{s.value}</p>
                                <p className='text-xs text-gray-500 mt-1'>{s.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Controls */}
                {!loading && !error && interviews.length > 0 && (
                    <div className='flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6'>
                        <div className='inline-flex rounded-full bg-white p-1 border border-gray-100 self-start'>
                            {FILTERS.map(f => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${filter === f.key
                                        ? 'bg-emerald-600 text-white'
                                        : 'text-gray-600 hover:text-gray-800'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        <div className='flex gap-3'>
                            <div className='relative flex-1 md:w-64'>
                                <FaSearch className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm' />
                                <input
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder='Search by role or level'
                                    aria-label='Search interviews'
                                    className='w-full pl-9 pr-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                                />
                            </div>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                aria-label='Sort interviews'
                                className='px-4 py-2 rounded-full bg-white border border-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                            >
                                <option value='newest'>Newest first</option>
                                <option value='oldest'>Oldest first</option>
                                <option value='score'>Highest score</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Content */}
                {loading ? (
                    <div className='grid gap-4'>
                        {[0, 1, 2].map(i => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <div className='bg-white p-10 rounded-2xl border border-rose-100 text-center'>
                        <p className='text-gray-700 font-medium'>{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className='mt-5 px-5 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition'
                        >
                            Try again
                        </button>
                    </div>
                ) : interviews.length === 0 ? (
                    <div className='bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center'>
                        <p className='text-gray-800 font-semibold text-lg'>No interviews yet</p>
                        <p className='text-gray-500 mt-2'>Complete a practice interview and its report will show up here.</p>
                        <button
                            onClick={() => navigate("/")}
                            className='mt-6 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition'
                        >
                            Start an interview
                        </button>
                    </div>
                ) : visible.length === 0 ? (
                    <div className='bg-white p-10 rounded-2xl border border-gray-100 text-center'>
                        <p className='text-gray-700 font-medium'>No interviews match your filters</p>
                        <button
                            onClick={() => { setFilter('all'); setQuery('') }}
                            className='mt-4 text-sm text-emerald-700 font-medium hover:underline'
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className='grid gap-4'>
                        {visible.map(item => {
                            const done = item.status === 'completed'
                            return (
                                <div
                                    key={item._id}
                                    role='link'
                                    tabIndex={0}
                                    onClick={() => navigate(`/report/${item._id}`)}
                                    onKeyDown={e => e.key === 'Enter' && navigate(`/report/${item._id}`)}
                                    className='group bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
                                >
                                    <div className='flex items-center gap-5'>
                                        {done ? (
                                            <ScoreRing score={Number(item.finalScore) || 0} />
                                        ) : (
                                            <div className='h-16 w-16 shrink-0 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs font-medium text-center leading-tight'>
                                                No score
                                            </div>
                                        )}

                                        <div className='min-w-0 flex-1'>
                                            <h3 className='text-lg font-semibold text-gray-800 truncate'>{item.role}</h3>
                                            <p className='text-gray-500 text-sm mt-1 capitalize'>
                                                {item.experience} · {item.mode}
                                            </p>
                                            <p className='flex items-center gap-1.5 text-xs text-gray-400 mt-2'>
                                                <FaRegCalendarAlt />
                                                {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>

                                        <div className='flex items-center gap-4'>
                                            <span
                                                className={`hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${done
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-yellow-100 text-yellow-700'}`}
                                            >
                                                {done ? 'Completed' : 'In progress'}
                                            </span>
                                            <FaChevronRight className='text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory