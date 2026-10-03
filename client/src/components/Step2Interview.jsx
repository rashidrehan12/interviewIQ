// import React from 'react'
// import maleVideo from "../assets/videos/male-ai.mp4"
// import femaleVideo from"../assets/videos/female-ai.mp4"
// import Timer from './Timer'
// import { motion } from "motion/react"
// import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
// import { useState } from 'react'
// import { useRef } from 'react'
// import { useEffect } from 'react'
// import axios from "axios"
// import { ServerUrl } from '../App'
// import { BsArrowRight } from 'react-icons/bs'

// function Step2Interview({ interviewData, onFinish }) {
//   const { interviewId, questions, userName } = interviewData;
//   const [isIntroPhase, setIsIntroPhase] = useState(true);

//   const [isMicOn, setIsMicOn] = useState(true);
//   const recognitionRef = useRef(null);
//   const [isAIPlaying, setIsAIPlaying] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [timeLeft, setTimeLeft] = useState(
//     questions[0]?.timeLimit || 60
//   );
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [voiceGender, setVoiceGender] = useState("female");
//   const [subtitle, setSubtitle] = useState("");


//   const videoRef = useRef(null);

//   const currentQuestion = questions[currentIndex];


//   useEffect(() => {
//     const loadVoices = () => {
//       const voices = window.speechSynthesis.getVoices();
//       if (!voices.length) return;

//       // Try known female voices first
//       const femaleVoice =
//         voices.find(v =>
//           v.name.toLowerCase().includes("zira") ||
//           v.name.toLowerCase().includes("samantha") ||
//           v.name.toLowerCase().includes("female")
//         );

//       if (femaleVoice) {
//         setSelectedVoice(femaleVoice);
//         setVoiceGender("female");
//         return;
//       }

//       // Try known male voices
//       const maleVoice =
//         voices.find(v =>
//           v.name.toLowerCase().includes("david") ||
//           v.name.toLowerCase().includes("mark") ||
//           v.name.toLowerCase().includes("male")
//         );

//       if (maleVoice) {
//         setSelectedVoice(maleVoice);
//         setVoiceGender("male");
//         return;
//       }

//       // Fallback: first voice (assume female)
//       setSelectedVoice(voices[0]);
//       setVoiceGender("female");
//     };

//     loadVoices();
//     window.speechSynthesis.onvoiceschanged = loadVoices;

//   }, [])

//   const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


//   /* ---------------- SPEAK FUNCTION ---------------- */
//   const speakText = (text) => {
//     return new Promise((resolve) => {
//       if (!window.speechSynthesis || !selectedVoice) {
//         resolve();
//         return;
//       }

//       window.speechSynthesis.cancel();

//       // Add natural pauses after commas and periods
//       const humanText = text
//         .replace(/,/g, ", ... ")
//         .replace(/\./g, ". ... ");

//       const utterance = new SpeechSynthesisUtterance(humanText);

//       utterance.voice = selectedVoice;

//       // Human-like pacing
//       utterance.rate = 0.92;     // slightly slower than normal
//       utterance.pitch = 1.05;    // small warmth
//       utterance.volume = 1;

//       utterance.onstart = () => {
//         setIsAIPlaying(true);
//         stopMic()
//         videoRef.current?.play();
//       };


//       utterance.onend = () => {
//         videoRef.current?.pause();
//         videoRef.current.currentTime = 0;
//         setIsAIPlaying(false);



//         if (isMicOn) {
//           startMic();
//         }
//         setTimeout(() => {
//           setSubtitle("");
//           resolve();
//         }, 300);
//       };


//       setSubtitle(text);

//       window.speechSynthesis.speak(utterance);
//     });
//   };


//   useEffect(() => {
//     if (!selectedVoice) {
//       return;
//     }
//     const runIntro = async () => {
//       if (isIntroPhase) {
//         await speakText(
//           `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
//         );

//         await speakText(
//           "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
//         );

//         setIsIntroPhase(false)
//       } else if (currentQuestion) {
//         await new Promise(r => setTimeout(r, 800));

//         // If last question (hard level)
//         if (currentIndex === questions.length - 1) {
//           await speakText("Alright, this one might be a bit more challenging.");
//         }

//         await speakText(currentQuestion.question);

//         if (isMicOn) {
//           startMic();
//         }
//       }

//     }

//     runIntro()


//   }, [selectedVoice, isIntroPhase, currentIndex])



//   useEffect(() => {
//     if (isIntroPhase) return;
//     if (!currentQuestion) return;
    
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer)
//           return 0;
//         }
//         return prev - 1

//       })
//     }, 1000);

//     return () => clearInterval(timer)

//   }, [isIntroPhase, currentIndex])

//   useEffect(() => {
//   if (!isIntroPhase && currentQuestion) {
//     setTimeLeft(currentQuestion.timeLimit || 60);
//   }
// }, [currentIndex]);


//  useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) return;

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onresult = (event) => {
//       let finalTranscript = "";
      
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           finalTranscript += event.results[i][0].transcript;
//         }
//       }

//       if (finalTranscript.trim()) {
//         setAnswer((prev) => (prev + " " + finalTranscript.trim()).trim());
//       }
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const startMic = () => {
//     if (recognitionRef.current && !isAIPlaying) {
//       try {
//         recognitionRef.current.start();
//       } catch { }
//     }
//   };

//   const stopMic = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };
//   const toggleMic = () => {
//     if (isMicOn) {
//       stopMic();
//     } else {
//       startMic();
//     }
//     setIsMicOn(!isMicOn);
//   };


//   const submitAnswer = async () => {
//     if (isSubmitting) return;
//     stopMic()
//     setIsSubmitting(true)

//     try {
//       const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
//         interviewId,
//         questionIndex: currentIndex,
//         answer,
//         timeTaken:
//           currentQuestion.timeLimit - timeLeft,
//       } , {withCredentials:true})

//       setFeedback(result.data.feedback)
//       speakText(result.data.feedback)
//       setIsSubmitting(false)
//     } catch (error) {
// console.log(error)
// setIsSubmitting(false)
//     }
//   }

//   const handleNext =async () => {
//     setAnswer("");
//     setFeedback("");

//     if (currentIndex + 1 >= questions.length) {
//       finishInterview();
//       return;
//     }

//     await speakText("Alright, let's move to the next question.");

//     setCurrentIndex(currentIndex + 1);
//     setTimeout(() => {
//       if (isMicOn) startMic();
//     }, 500);

   
//   }

//   const finishInterview = async () => {
//     stopMic()
//     setIsMicOn(false)
//     try {
//       const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

//       console.log(result.data)
//       onFinish(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }


//    useEffect(() => {
//     if (isIntroPhase) return;
//     if (!currentQuestion) return;

//     if (timeLeft === 0 && !isSubmitting && !feedback) {
//       submitAnswer()
//     }
//   }, [timeLeft]);

//   // useEffect(() => {
//   //   return () => {
//   //     if (recognitionRef.current) {
//   //       recognitionRef.current.stop();
//   //       recognitionRef.current.abort();
//   //     }

//   //     window.speechSynthesis.cancel();
//   //   };
//   // }, []);

//   useEffect(() => {
//     return () => {
//       if (recognitionRef.current) {
//         // Use a try-catch to prevent errors if it's already stopped
//         try {
//           recognitionRef.current.stop();
//           recognitionRef.current.abort();
//         } catch (e) {
//           // Ignore abort errors on unmount
//         }
//       }
//       window.speechSynthesis.cancel();
//     };
//   }, []);







//   return (
//     <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
//       <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

//         {/* video section */}
//         <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
//           <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>
//             <video
//               src={videoSource}
//               key={videoSource}
//               ref={videoRef}
//               muted
//               playsInline
//               preload="auto"
//               className="w-full h-auto object-cover"
//             />
//           </div>

//           {/* subtitle */}
//           {subtitle && (
//             <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
//               <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
//             </div>
//           )}


//           {/* timer Area */}
//           <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
//             <div className='flex justify-between items-center'>
//               <span className='text-sm text-gray-500'>
//                 Interview Status
//               </span>
//               {isAIPlaying && <span className='text-sm font-semibold text-emerald-600'>
//                 {isAIPlaying ? "AI Speaking" : ""}
//               </span>}
//             </div>

//             <div className="h-px bg-gray-200"></div>

//             <div className='flex justify-center'>

//               <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
//             </div>

//             <div className="h-px bg-gray-200"></div>

//             <div className='grid grid-cols-2 gap-6 text-center'>
//               <div>
//                 <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
//                 <span className='text-xs text-gray-400'>Current Questions</span>
//               </div>

//               <div>
//                 <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
//                 <span className='text-xs text-gray-400'>Total Questions</span>
//               </div>
//             </div>


//           </div>
//         </div>

//         {/* Text section */}

//         <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
//           <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
//             AI Smart Interview
//           </h2>


//           {!isIntroPhase && (<div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
//             <p className='text-xs sm:text-sm text-gray-400 mb-2'>
//               Question {currentIndex + 1} of {questions.length}
//             </p>

//             <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed '>{currentQuestion?.question}</div>
//           </div>)
//           }
//           <textarea
//             placeholder="Type your answer here..."
//             onChange={(e) => setAnswer(e.target.value)}
//             value={answer}
//             className="flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800" />


//          {!feedback ? ( <div className='flex items-center gap-4 mt-6'>
//             <motion.button
//               onClick={toggleMic}
//               whileTap={{ scale: 0.9 }}
//               className='w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'>
//               {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}/>}
//             </motion.button>

//             <motion.button
//             onClick={submitAnswer}
//             disabled={isSubmitting}
//               whileTap={{ scale: 0.95 }}
//               className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:bg-gray-500'>
//               {isSubmitting?"Submitting...":"Submit Answer"}

//             </motion.button>

//           </div>):(
//             <motion.div 
//              initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'>
//               <p className='text-emerald-700 font-medium mb-4'>{feedback}</p>

//               <button
//               onClick={handleNext}

//                className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-1'>
//                 Next Question <BsArrowRight size={18}/>
//               </button>

//             </motion.div>
//           )}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Step2Interview

import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");


  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];


  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices
      const maleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback: first voice (assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92;     // slightly slower than normal
      utterance.pitch = 1.05;    // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };


      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);



        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };


      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };


  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }

    }

    runIntro()


  }, [selectedVoice, isIntroPhase, currentIndex])



  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1

      })
    }, 1000);

    return () => clearInterval(timer)

  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript.trim()) {
        setAnswer((prev) => (prev + " " + finalTranscript.trim()).trim());
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true })

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);


  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        // Use a try-catch to prevent errors if it's already stopped
        try {
          recognitionRef.current.stop();
          recognitionRef.current.abort();
        } catch (e) {
          // Ignore abort errors on unmount
        }
      }
      window.speechSynthesis.cancel();
    };
  }, []);


  /* ---------------- UI HELPERS (display only) ---------------- */
  const isLastQuestion = currentIndex + 1 >= questions.length
  const progress = isIntroPhase
    ? 0
    : ((currentIndex + (feedback ? 1 : 0)) / questions.length) * 100

  const status = isIntroPhase
    ? { label: 'Introduction', dot: 'bg-gray-400', text: 'text-gray-600' }
    : isAIPlaying
      ? { label: 'Interviewer speaking', dot: 'bg-emerald-500 animate-pulse', text: 'text-emerald-700' }
      : isSubmitting
        ? { label: 'Evaluating answer', dot: 'bg-amber-500 animate-pulse', text: 'text-amber-700' }
        : feedback
          ? { label: 'Feedback ready', dot: 'bg-teal-500', text: 'text-teal-700' }
          : isMicOn
            ? { label: 'Listening', dot: 'bg-rose-500 animate-pulse', text: 'text-rose-600' }
            : { label: 'Mic off, type your answer', dot: 'bg-gray-400', text: 'text-gray-600' }

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0


  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

        {/* LEFT: interviewer */}
        <div className='w-full lg:w-[35%] bg-gray-50/70 flex flex-col items-center p-6 gap-5 border-b lg:border-b-0 lg:border-r border-gray-200'>

          <div
            className={`w-full max-w-md rounded-2xl overflow-hidden shadow-xl ring-4 transition-all duration-300 ${isAIPlaying ? 'ring-emerald-400/70' : 'ring-transparent'}`}
          >
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* subtitle: fixed height so layout doesn't jump */}
          <div className='w-full max-w-md min-h-20 flex items-center justify-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm'>
            {subtitle ? (
              <p className='text-gray-700 text-sm sm:text-base text-center leading-relaxed'>{subtitle}</p>
            ) : (
              <p className='text-gray-400 text-sm text-center'>Captions appear here while the interviewer speaks.</p>
            )}
          </div>

          {/* status + timer */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4'>
            <div className='flex items-center gap-2'>
              <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
              <span className={`text-sm font-medium ${status.text}`}>{status.label}</span>
            </div>

            <div className='h-px bg-gray-100' />

            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>
          </div>
        </div>

        {/* RIGHT: question + answer */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 gap-5'>

          {/* header + progress */}
          <div>
            <div className='flex items-center justify-between mb-3'>
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>AI Smart Interview</h2>
              <span className='text-sm font-medium text-gray-500'>
                {isIntroPhase ? 'Getting started' : `Question ${currentIndex + 1} of ${questions.length}`}
              </span>
            </div>
            <div
              className='h-2 w-full rounded-full bg-gray-100 overflow-hidden'
              role='progressbar'
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className='h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-500'
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* question card */}
          <div className='bg-emerald-50/60 border border-emerald-100 p-5 sm:p-6 rounded-2xl'>
            {isIntroPhase ? (
              <p className='text-gray-600 leading-relaxed'>
                Your interviewer is introducing the session. The first question will appear in a moment.
              </p>
            ) : (
              <p className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed'>
                {currentQuestion?.question}
              </p>
            )}
          </div>

          {/* answer */}
          <div className='flex-1 flex flex-col min-h-52'>
            <label htmlFor='answer' className='text-sm font-medium text-gray-600 mb-2'>
              Your answer
            </label>
            <textarea
              id='answer'
              placeholder={isMicOn ? "Speak or type your answer here..." : "Type your answer here..."}
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="flex-1 bg-gray-50 p-4 sm:p-5 rounded-2xl resize-none outline-none border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition text-gray-800 leading-relaxed" />
            <p className='text-xs text-gray-400 mt-2 text-right'>{wordCount} {wordCount === 1 ? 'word' : 'words'}</p>
          </div>

          {/* actions */}
          {!feedback ? (
            <div className='flex items-center gap-4'>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                aria-label={isMicOn ? 'Turn microphone off' : 'Turn microphone on'}
                aria-pressed={isMicOn}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center rounded-full text-white shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 ${isMicOn ? 'bg-emerald-600' : 'bg-gray-500'}`}>
                {isMicOn && !isAIPlaying && (
                  <span className='absolute inset-0 rounded-full bg-emerald-500/40 animate-ping' />
                )}
                <span className='relative'>
                  {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
                </span>
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                className='flex-1 bg-linear-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500'>
                {isSubmitting ? "Submitting..." : "Submit answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white border border-emerald-200 border-l-4 border-l-emerald-500 p-5 rounded-2xl shadow-sm'>
              <p className='text-sm font-semibold text-emerald-700 mb-1'>Feedback</p>
              <p className='text-gray-700 leading-relaxed mb-5'>{feedback}</p>

              <button
                onClick={handleNext}
                className='w-full bg-linear-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500'>
                {isLastQuestion ? 'Finish interview' : 'Next question'} <BsArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Step2Interview