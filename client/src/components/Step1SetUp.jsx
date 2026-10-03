// import React from 'react'
// import { motion } from "motion/react"
// import {
//     FaUserTie,
//     FaBriefcase,
//     FaFileUpload,
//     FaMicrophoneAlt,
//     FaChartLine,
// } from "react-icons/fa";
// import { useState } from 'react';
// import axios from "axios"
// import { ServerUrl } from '../App';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function Step1SetUp({ onStart }) {
//     const {userData}= useSelector((state)=>state.user)
//     const dispatch = useDispatch()
//     const [role, setRole] = useState("");
//     const [experience, setExperience] = useState("");
//     const [mode, setMode] = useState("Technical");
//     const [resumeFile, setResumeFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [projects, setProjects] = useState([]);
//     const [skills, setSkills] = useState([]);
//     const [resumeText, setResumeText] = useState("");
//     const [analysisDone, setAnalysisDone] = useState(false);
//     const [analyzing, setAnalyzing] = useState(false);


//     const handleUploadResume = async () => {
//         if (!resumeFile || analyzing) return;
//         setAnalyzing(true)

//         const formdata = new FormData()
//         formdata.append("resume", resumeFile)

//         try {
//             const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

//             console.log(result.data)

//             setRole(result.data.role || "");
//             setExperience(result.data.experience || "");
//             setProjects(result.data.projects || []);
//             setSkills(result.data.skills || []);
//             setResumeText(result.data.resumeText || "");
//             setAnalysisDone(true);

//             setAnalyzing(false);

//         } catch (error) {
//             console.log(error)
//             setAnalyzing(false);
//         }
//     }

//     const handleStart = async () => {
//         setLoading(true)
//         try {
//            const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
//            console.log(result.data)
//            if(userData){
//             dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
//            }
//            setLoading(false)
//            onStart(result.data)

//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>

//             <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

//                 <motion.div
//                     initial={{ x: -80, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.7 }}
//                     className='relative bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center'>

//                     <h2 className="text-4xl font-bold text-gray-800 mb-6">
//                         Start Your AI Interview
//                     </h2>

//                     <p className="text-gray-600 mb-10">
//                         Practice real interview scenarios powered by AI.
//                         Improve communication, technical skills, and confidence.
//                     </p>

//                     <div className='space-y-5'>

//                         {
//                             [
//                                 {
//                                     icon: <FaUserTie className="text-green-600 text-xl" />,
//                                     text: "Choose Role & Experience",
//                                 },
//                                 {
//                                     icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
//                                     text: "Smart Voice Interview",
//                                 },
//                                 {
//                                     icon: <FaChartLine className="text-green-600 text-xl" />,
//                                     text: "Performance Analytics",
//                                 },
//                             ].map((item, index) => (
//                                 <motion.div key={index}
//                                     initial={{ y: 30, opacity: 0 }}
//                                     animate={{ y: 0, opacity: 1 }}
//                                     transition={{ delay: 0.3 + index * 0.15 }}
//                                     whileHover={{ scale: 1.03 }}
//                                     className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer'>
//                                     {item.icon}
//                                     <span className='text-gray-700 font-medium'>{item.text}</span>

//                                 </motion.div>
//                             ))
//                         }
//                     </div>



//                 </motion.div>



//                 <motion.div
//                     initial={{ x: 80, opacity: 0 }}
//                     animate={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.7 }}
//                     className="p-12 bg-white">

//                     <h2 className='text-3xl font-bold text-gray-800 mb-8'>
//                         Interview SetUp
//                     </h2>


//                     <div className='space-y-6'>

//                         <div className='relative'>
//                             <FaUserTie className='absolute top-4 left-4 text-gray-400' />

//                             <input type='text' placeholder='Enter role'
//                                 className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
//                                 onChange={(e) => setRole(e.target.value)} value={role} />
//                         </div>


//                         <div className='relative'>
//                             <FaBriefcase className='absolute top-4 left-4 text-gray-400' />

//                             <input type='text' placeholder='Experience (e.g. 2 years)'
//                                 className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'
//                                 onChange={(e) => setExperience(e.target.value)} value={experience} />



//                         </div>

//                         <select value={mode}
//                             onChange={(e) => setMode(e.target.value)}
//                             className='w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition'>

//                             <option value="Technical">Technical Interview</option>
//                             <option value="HR">HR Interview</option>

//                         </select>

//                         {!analysisDone && (
//                             <motion.div
//                                 whileHover={{ scale: 1.02 }}
//                                 onClick={() => document.getElementById("resumeUpload").click()}
//                                 className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition'>

//                                 <FaFileUpload className='text-4xl mx-auto text-green-600 mb-3' />

//                                 <input type="file"
//                                     accept="application/pdf"
//                                     id="resumeUpload"
//                                     className='hidden'
//                                     onChange={(e) => setResumeFile(e.target.files[0])} />

//                                 <p className='text-gray-600 font-medium'>
//                                     {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
//                                 </p>

//                                 {resumeFile && (
//                                     <motion.button
//                                         whileHover={{ scale: 1.02 }}
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleUploadResume()
//                                         }}

//                                         className='mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition'>
//                                         {analyzing ? "Analyzing..." : "Analyze Resume"}



//                                     </motion.button>)}

//                             </motion.div>


//                         )}

//                         {analysisDone && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4'>
//                                 <h3 className='text-lg font-semibold text-gray-800'>
//                                     Resume Analysis Result</h3>

//                                 {projects.length > 0 && (
//                                     <div>
//                                         <p className='font-medium text-gray-700 mb-1'>
//                                             Projects:</p>

//                                         <ul className='list-disc list-inside text-gray-600 space-y-1'>
//                                             {projects.map((p, i) => (
//                                                 <li key={i}>{p}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}

//                                 {skills.length > 0 && (
//                                     <div>
//                                         <p className='font-medium text-gray-700 mb-1'>
//                                             Skills:</p>

//                                         <div className='flex flex-wrap gap-2'>
//                                             {skills.map((s, i) => (
//                                                 <span key={i} className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm'>{s}</span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                             </motion.div>
//                         )}


//                         <motion.button
//                         onClick={handleStart}
//                             disabled={!role || !experience || loading}
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.95 }}
//                             className='w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'>
//                             {loading ? "Starting...":"Start Interview"}


//                         </motion.button>
//                     </div>

//                 </motion.div>
//             </div>

//         </motion.div>
//     )
// }

// export default Step1SetUp
import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaCheckCircle,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const MODES = [
    { value: "Technical", label: "Technical", hint: "Role skills and problem solving" },
    { value: "HR", label: "HR", hint: "Behaviour and communication" },
]

const FEATURES = [
    {
        icon: FaUserTie,
        title: "Tailored to your role",
        text: "Questions match the role and experience level you enter.",
    },
    {
        icon: FaMicrophoneAlt,
        title: "Voice interview",
        text: "Hear each question and answer by speaking or typing.",
    },
    {
        icon: FaChartLine,
        title: "Detailed report",
        text: "Get a score and feedback for every answer.",
    },
]

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [dragging, setDragging] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
             console.log(error.response?.data || error.message)
    setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            console.log(result.data)
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    /* ---------- UI-only helpers ---------- */
    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type === "application/pdf") setResumeFile(file)
    }

    const resetResume = () => {
        setAnalysisDone(false)
        setResumeFile(null)
        setProjects([])
        setSkills([])
        setResumeText("")
    }

    const openPicker = () => document.getElementById("resumeUpload").click()

    const inputClass = 'w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition'
    const canStart = role && experience && !loading

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-teal-100 px-4 py-8'>

            <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-200 grid md:grid-cols-5 overflow-hidden'>

                {/* LEFT: intro */}
                <div className='md:col-span-2 bg-linear-to-br from-emerald-600 to-teal-600 text-white p-8 sm:p-10 flex flex-col justify-center'>

                    <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                        Practice your next interview
                    </h2>

                    <p className="text-emerald-50/90 mb-10 leading-relaxed">
                        Answer realistic questions from an AI interviewer and see where to improve.
                    </p>

                    <ul className='space-y-6'>
                        {FEATURES.map((item, index) => (
                            <motion.li
                                key={item.title}
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 + index * 0.12 }}
                                className='flex items-start gap-4'>
                                <span className='shrink-0 h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center'>
                                    <item.icon className='text-lg' />
                                </span>
                                <div>
                                    <p className='font-semibold'>{item.title}</p>
                                    <p className='text-sm text-emerald-50/80 mt-0.5'>{item.text}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT: form */}
                <div className="md:col-span-3 p-6 sm:p-10 bg-white">

                    <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-1'>
                        Interview setup
                    </h2>
                    <p className='text-gray-500 mb-8'>
                        Upload a resume to fill this in automatically, or enter the details yourself.
                    </p>

                    <div className='space-y-6'>

                        {/* resume */}
                        {!analysisDone ? (
                            <div>
                                <p className='text-sm font-medium text-gray-700 mb-2'>
                                    Resume <span className='text-gray-400 font-normal'>(optional, PDF)</span>
                                </p>

                                <div
                                    role='button'
                                    tabIndex={0}
                                    onClick={openPicker}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${dragging || resumeFile
                                        ? 'border-emerald-500 bg-emerald-50'
                                        : 'border-gray-300 hover:border-emerald-500 hover:bg-emerald-50/50'}`}>

                                    <FaFileUpload className='text-3xl mx-auto text-emerald-600 mb-2' />

                                    <input type="file"
                                        accept="application/pdf"
                                        id="resumeUpload"
                                        className='hidden'
                                        onChange={(e) => setResumeFile(e.target.files[0])} />

                                    <p className='text-gray-700 font-medium break-all'>
                                        {resumeFile ? resumeFile.name : "Click to upload or drag a PDF here"}
                                    </p>

                                    {resumeFile && (
                                        <button
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUploadResume()
                                            }}
                                            disabled={analyzing}
                                            className='mt-4 inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60'>
                                            {analyzing && <span className='h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin' />}
                                            {analyzing ? "Analyzing..." : "Analyze resume"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-4'>

                                <div className='flex items-start justify-between gap-3'>
                                    <div className='flex items-center gap-2'>
                                        <FaCheckCircle className='text-emerald-600' />
                                        <h3 className='font-semibold text-gray-800'>Resume analyzed</h3>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={resetResume}
                                        className='text-sm text-emerald-700 font-medium hover:underline'>
                                        Use a different resume
                                    </button>
                                </div>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='text-sm font-medium text-gray-700 mb-1'>Projects</p>
                                        <ul className='list-disc list-inside text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto'>
                                            {projects.map((p, i) => (
                                                <li key={i}>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-sm font-medium text-gray-700 mb-2'>Skills</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-white border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-sm'>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* role + experience */}
                        <div className='grid sm:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='role' className='block text-sm font-medium text-gray-700 mb-2'>Role</label>
                                <div className='relative'>
                                    <FaUserTie className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400' />
                                    <input id='role' type='text' placeholder='e.g. Frontend Developer'
                                        className={inputClass}
                                        onChange={(e) => setRole(e.target.value)} value={role} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='experience' className='block text-sm font-medium text-gray-700 mb-2'>Experience</label>
                                <div className='relative'>
                                    <FaBriefcase className='absolute top-1/2 -translate-y-1/2 left-4 text-gray-400' />
                                    <input id='experience' type='text' placeholder='e.g. 2 years'
                                        className={inputClass}
                                        onChange={(e) => setExperience(e.target.value)} value={experience} />
                                </div>
                            </div>
                        </div>

                        {/* mode */}
                        <div>
                            <p className='text-sm font-medium text-gray-700 mb-2'>Interview type</p>
                            <div className='grid grid-cols-2 gap-3' role='radiogroup' aria-label='Interview type'>
                                {MODES.map((m) => {
                                    const active = mode === m.value
                                    return (
                                        <button
                                            key={m.value}
                                            type='button'
                                            role='radio'
                                            aria-checked={active}
                                            onClick={() => setMode(m.value)}
                                            className={`text-left p-4 rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${active
                                                ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                                                : 'border-gray-200 bg-white hover:border-emerald-300'}`}>
                                            <p className={`font-semibold ${active ? 'text-emerald-700' : 'text-gray-800'}`}>{m.label}</p>
                                            <p className='text-xs text-gray-500 mt-1'>{m.hint}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* start */}
                        <div>
                            <motion.button
                                onClick={handleStart}
                                disabled={!canStart}
                                whileTap={canStart ? { scale: 0.97 } : undefined}
                                className='w-full inline-flex items-center justify-center gap-2 bg-linear-to-r from-emerald-600 to-teal-500 text-white py-3.5 rounded-full text-lg font-semibold shadow-md transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500'>
                                {loading && <span className='h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin' />}
                                {loading ? "Preparing your questions..." : "Start interview"}
                            </motion.button>

                            <p className='text-xs text-gray-400 text-center mt-3'>
                                {!role || !experience
                                    ? "Enter a role and experience to continue."
                                    : userData?.credits !== undefined
                                        ? `Credits available: ${userData.credits}`
                                        : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Step1SetUp
