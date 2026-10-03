// import React from "react";
// import Navbar from "../components/Navbar";
// import { useSelector } from "react-redux";
// import { motion } from "motion/react";
// import {
//   BsRobot,
//   BsMic,
//   BsClock,
//   BsBarChart,
//   BsFileEarmarkText,
// } from "react-icons/bs";
// import { HiSparkles } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import AuthModel from "../components/AuthModel";
// import hrImg from "../assets/HR.png";
// import techImg from "../assets/tech.png";
// import confidenceImg from "../assets/confi.png";
// import creditImg from "../assets/credit.png";
// import evalImg from "../assets/ai-ans.png";
// import resumeImg from "../assets/resume.png";
// import pdfImg from "../assets/pdf.png";
// import analyticsImg from "../assets/history.png";
// import Footer from "../components/Footer";

// function Home() {
//   const { userData } = useSelector((state) => state.user);
//   const [showAuth, setShowAuth] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
//       <Navbar />

//       <div className="flex-1 px-6 py-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex justify-center mb-6">
//             <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
//               <HiSparkles size={16} className="bg-green-50 text-green-600" />
//               AI Powered Smart Interview Platform
//             </div>
//           </div>
//           <div className="text-center mb-28">
//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
//             >
//               Practice Interviews with
//               <span className="relative inline-block">
//                 <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
//                   AI Intelligence
//                 </span>
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8 }}
//               className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
//             >
//               Role-based mock interviews with smart follow-ups, adaptive
//               difficulty and real-time performance evaluation.
//             </motion.p>

//             <div className="flex flex-wrap justify-center gap-4 mt-10">
//               <motion.button
//                 onClick={() => {
//                   if (!userData) {
//                     setShowAuth(true);
//                     return;
//                   }
//                   navigate("/interview");
//                 }}
//                 whileHover={{ opacity: 0.9, scale: 1.03 }}
//                 whileTap={{ opacity: 1, scale: 0.98 }}
//                 className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
//               >
//                 Start Interview
//               </motion.button>

//               <motion.button
//                 onClick={() => {
//                   if (!userData) {
//                     setShowAuth(true);
//                     return;
//                   }
//                   navigate("/history");
//                 }}
//                 whileHover={{ opacity: 0.9, scale: 1.03 }}
//                 whileTap={{ opacity: 1, scale: 0.98 }}
//                 className="border border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition"
//               >
//                 View History
//               </motion.button>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
//             {[
//               {
//                 icon: <BsRobot size={24} />,
//                 step: "STEP 1",
//                 title: "Role & Experience Selection",
//                 desc: "AI adjusts difficulty based on selected job role.",
//               },
//               {
//                 icon: <BsMic size={24} />,
//                 step: "STEP 2",
//                 title: "Smart Voice Interview",
//                 desc: "Dynamic follow-up questions based on your answers.",
//               },
//               {
//                 icon: <BsClock size={24} />,
//                 step: "STEP 3",
//                 title: "Timer Based Simulation",
//                 desc: "Real interview pressure with time tracking.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 + index * 0.2 }}
//                 whileHover={{ rotate: 0, scale: 1.06 }}
//                 className={`
//         relative bg-white rounded-3xl border-2 border-green-100 
//         hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl 
//         transition-all duration-300
//         ${index === 0 ? "rotate-[-4deg]" : ""}
//         ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""}
//         ${index === 2 ? "rotate-[-3deg]" : ""}
//       `}
//               >
//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
//                   {item.icon}
//                 </div>
//                 <div className="pt-10 text-center">
//                   <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
//                     {item.step}
//                   </div>
//                   <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
//                   <p className="text-sm text-gray-500 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl font-semibold text-center mb-16"
//             >
//               Advanced AI <span className="text-green-600">Capabilities</span>
//             </motion.h2>

//             <div className="grid md:grid-cols-2 gap-10">
//               {[
//                 {
//                   image: evalImg,
//                   icon: <BsBarChart size={20} />,
//                   title: "AI Answer Evaluation",
//                   desc: "Scores communication, technical accuracy and confidence.",
//                 },
//                 {
//                   image: resumeImg,
//                   icon: <BsFileEarmarkText size={20} />,
//                   title: "Resume Based Interview",
//                   desc: "Project-specific questions based on uploaded resume.",
//                 },
//                 {
//                   image: pdfImg,
//                   icon: <BsFileEarmarkText size={20} />,
//                   title: "Downloadable PDF Report",
//                   desc: "Detailed strengths, weaknesses and improvement insights.",
//                 },
//                 {
//                   image: analyticsImg,
//                   icon: <BsBarChart size={20} />,
//                   title: "History & Analytics",
//                   desc: "Track progress with performance graphs and topic analysis.",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
//                 >
//                   <div className="flex flex-col md:flex-row items-center gap-8">
//                     <div className="w-full md:w-1/2 flex justify-center">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-auto object-contain max-h-64"
//                       />
//                     </div>

//                     <div className="w-full md:w-1/2">
//                       <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
//                         {item.icon}
//                       </div>
//                       <h3 className="font-semibold mb-3 text-xl">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-500 text-sm leading-relaxed">
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           <div className="mb-32">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-4xl font-semibold text-center mb-16"
//             >
//               Multiple Interview <span className="text-green-600">Modes</span>
//             </motion.h2>

//             <div className="grid md:grid-cols-2 gap-10">
//               {[
//                 {
//                   img: hrImg,
//                   title: "HR Interview Mode",
//                   desc: "Behavioral and communication based evaluation.",
//                 },
//                 {
//                   img: techImg,
//                   title: "Technical Mode",
//                   desc: "Deep technical questioning based on selected role.",
//                 },

//                 {
//                   img: confidenceImg,
//                   title: "Confidence Detection",
//                   desc: "Basic tone and voice analysis insights.",
//                 },
//                 {
//                   img: creditImg,
//                   title: "Credits System",
//                   desc: "Unlock premium interview sessions easily.",
//                 },
//               ].map((mode, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ y: -6 }}
//                   className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
//                 >
//                   <div className="flex items-center justify-between gap-6">
//                     <div className="w-1/2">
//                       <h3 className="font-semibold text-xl mb-3">
//                         {mode.title}
//                       </h3>

//                       <p className="text-gray-500 text-sm leading-relaxed">
//                         {mode.desc}
//                       </p>
//                     </div>

//                     {/* RIGHT IMAGE */}
//                     <div className="w-1/2 flex justify-end">
//                       <img
//                         src={mode.img}
//                         alt={mode.title}
//                         className="w-28 h-28 object-contain"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsCheck2,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import AuthModel from "../components/AuthModel";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from "../components/Footer";

const STEPS = [
  { icon: <BsRobot size={22} />, title: "Choose role and experience", desc: "Pick the job you're preparing for. Difficulty adjusts to your level." },
  { icon: <BsMic size={22} />, title: "Take a voice interview", desc: "Answer out loud and get follow-up questions based on what you say." },
  { icon: <BsClock size={22} />, title: "Answer against the clock", desc: "Every question has a timer, so practice feels like the real thing." },
];

// span = how many columns the card takes on large screens
const CAPABILITIES = [
  { image: evalImg, icon: <BsBarChart size={20} />, title: "AI answer evaluation", desc: "Scores communication, technical accuracy and confidence.", span: "lg:col-span-2" },
  { image: resumeImg, icon: <BsFileEarmarkText size={20} />, title: "Resume-based interview", desc: "Project-specific questions based on your uploaded resume.", span: "" },
  { image: pdfImg, icon: <BsFileEarmarkText size={20} />, title: "Downloadable PDF report", desc: "Detailed strengths, weaknesses and improvement insights.", span: "" },
  { image: analyticsImg, icon: <BsBarChart size={20} />, title: "History and analytics", desc: "Track progress with performance graphs and topic analysis.", span: "lg:col-span-2" },
];

const MODES = [
  { img: hrImg, title: "HR interview", desc: "Behavioral and communication-based evaluation." },
  { img: techImg, title: "Technical interview", desc: "Deep technical questioning based on your selected role." },
  { img: confidenceImg, title: "Confidence detection", desc: "Basic tone and voice analysis insights." },
  { img: creditImg, title: "Credits system", desc: "Unlock premium interview sessions easily." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

/* A small, clearly-labelled sample of the interview screen */
function InterviewPreview() {
  const bars = [10, 22, 14, 30, 18, 26, 12, 24, 16, 28, 11, 20];
  return (
    <div className="relative">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl shadow-emerald-900/10 p-5 sm:p-6 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">Interviewer speaking</span>
          </div>
          <span className="text-xs text-gray-400">Sample session</span>
        </div>

        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 mb-4">
          <p className="text-xs text-gray-500 mb-1">Question 2 of 5</p>
          <p className="font-semibold text-gray-900 leading-snug">
            How would you debug a REST endpoint that suddenly became slow?
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 mb-4">
          <div className="flex items-end gap-1 h-9 mb-3" aria-hidden="true">
            {bars.map((h, i) => (
              <span
                key={i}
                className="wave-bar w-1.5 rounded-full bg-emerald-500/80"
                style={{ height: h, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            "I would start by checking the logs and response times, then look at the database queries..."
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <BsClock /> 00:42 left
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            <BsCheck2 /> Clear structure
          </div>
        </div>
      </div>

      {/* floating score card */}
      <div className="hidden sm:flex absolute -bottom-6 -left-4 lg:-left-10 bg-white rounded-2xl border border-gray-200 shadow-xl px-4 py-3 items-center gap-3">
        <div className="h-11 w-11 rounded-full border-4 border-emerald-500 flex items-center justify-center text-sm font-bold text-emerald-600">
          8.4
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Overall score</p>
          <p className="text-xs text-gray-500">Report ready after the last question</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { hash } = useLocation();

  // scroll to a section when the URL has a hash (used by navbar and footer links)
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  // same behaviour as before: ask to sign in first, otherwise go to the page
  const goTo = (path) => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-gray-50 flex flex-col">
      <style>{`
        @keyframes wave { 0%,100% { transform: scaleY(.45); } 50% { transform: scaleY(1); } }
        .wave-bar { transform-origin: bottom; animation: wave 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .wave-bar { animation: none; } }
      `}</style>

      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section
          className="relative px-5 sm:px-6"
          style={{
            backgroundImage: "radial-gradient(#10b98126 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center pt-14 sm:pt-20 pb-24 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 text-emerald-700 text-sm px-4 py-1.5 rounded-full shadow-sm mb-6">
                <HiSparkles size={16} />
                AI-powered mock interviews
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.08]">
                Practice interviews with an AI that answers back
              </h1>

              <p className="text-gray-600 mt-6 max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed">
                Role-based mock interviews with smart follow-ups, adaptive
                difficulty and a scored report for every session.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-9">
                <motion.button
                  onClick={() => goTo("/interview")}
                  whileTap={{ scale: 0.98 }}
                  className="bg-linear-to-r from-emerald-600 to-teal-500 text-white px-9 py-3.5 rounded-full font-semibold shadow-lg shadow-emerald-600/25 hover:opacity-95 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                >
                  Start interview
                </motion.button>

                <motion.button
                  onClick={() => goTo("/history")}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-gray-300 text-gray-800 px-9 py-3.5 rounded-full font-semibold hover:border-emerald-400 hover:bg-emerald-50/50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                >
                  View history
                </motion.button>
              </div>

              <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                {["HR and technical modes", "Voice or typed answers", "PDF report"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <BsCheck2 className="text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <InterviewPreview />
            </motion.div>
          </div>
        </section>

        <div className="px-5 sm:px-6">
          <div className="max-w-6xl mx-auto">

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="scroll-mt-28 mb-28">
              <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
                How it works
              </motion.h2>
              <motion.p {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="text-gray-500 text-center max-w-xl mx-auto mb-14">
                From setup to report in three steps.
              </motion.p>

              <div className="relative grid md:grid-cols-3 gap-6">
                <div className="hidden md:block absolute top-11 left-[16%] right-[16%] h-px bg-emerald-200" />
                {STEPS.map((item, index) => (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    className="relative bg-white rounded-3xl border border-gray-200 p-8 text-center shadow-sm"
                  >
                    <div className="relative mx-auto mb-5 w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      {item.icon}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-emerald-600 text-emerald-700 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* FEATURES (bento) */}
            <section id="features" className="scroll-mt-28 mb-28">
              <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14">
                What you get after every interview
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CAPABILITIES.map((item, index) => (
                  <motion.div
                    key={item.title}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                    className={`${item.span} group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-200 transition flex flex-col`}
                  >
                    <div className="bg-emerald-50/70 px-8 pt-8 flex justify-center items-end h-56">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-7 flex items-start gap-4">
                      <div className="shrink-0 bg-emerald-100 text-emerald-700 w-11 h-11 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* MODES */}
            <section id="modes" className="scroll-mt-28 mb-28">
              <motion.h2 {...fadeUp} transition={{ duration: 0.5 }} className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-14">
                Interview modes and features
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MODES.map((mode, index) => (
                  <motion.div
                    key={mode.title}
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition text-center"
                  >
                    <div className="mx-auto mb-5 w-28 h-28 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <img src={mode.img} alt={mode.title} className="w-20 h-20 object-contain" />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{mode.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{mode.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CLOSING CTA */}
            <motion.section
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-24 rounded-3xl bg-linear-to-br from-emerald-600 to-teal-600 text-white px-6 py-14 sm:py-16 text-center shadow-xl"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Run your first mock interview</h2>
              <p className="text-emerald-50/90 max-w-xl mx-auto mb-8">
                Upload a resume or enter your role, then start talking. Your report is ready when you finish.
              </p>
              <motion.button
                onClick={() => goTo("/interview")}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-emerald-700 px-10 py-3.5 rounded-full font-semibold shadow-md hover:bg-emerald-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600 focus-visible:ring-white"
              >
                Start interview
              </motion.button>
            </motion.section>
          </div>
        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <Footer />
    </div>
  );
}

export default Home;