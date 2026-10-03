// import React from 'react'
// import { FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { motion } from "motion/react"
// import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';

// function Step3Report({ report }) {
//   if (!report) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Loading Report...</p>
//       </div>
//     );
//   }
//   const navigate = useNavigate()
//   const {
//     finalScore = 0,
//     confidence = 0,
//     communication = 0,
//     correctness = 0,
//     questionWiseScore = [],
//   } = report;

//   const questionScoreData = questionWiseScore.map((score, index) => ({
//     name: `Q${index + 1}`,
//     score: score.score || 0
//   }))

//   const skills = [
//     { label: "Confidence", value: confidence },
//     { label: "Communication", value: communication },
//     { label: "Correctness", value: correctness },
//   ];

//   let performanceText = "";
//   let shortTagline = "";

//   if (finalScore >= 8) {
//     performanceText = "Ready for job opportunities.";
//     shortTagline = "Excellent clarity and structured responses.";
//   } else if (finalScore >= 5) {
//     performanceText = "Needs minor improvement before interviews.";
//     shortTagline = "Good foundation, refine articulation.";
//   } else {
//     performanceText = "Significant improvement required.";
//     shortTagline = "Work on clarity and confidence.";
//   }

//   const score = finalScore;
//   const percentage = (score / 10) * 100;


//   const downloadPDF = () => {
//   const doc = new jsPDF("p", "mm", "a4");

//   const pageWidth = doc.internal.pageSize.getWidth();
//   const margin = 20;
//   const contentWidth = pageWidth - margin * 2;

//   let currentY = 25;

//   // ================= TITLE =================
//   doc.setFont("helvetica", "bold");
//   doc.setFontSize(20);
//   doc.setTextColor(34, 197, 94);
//   doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
//     align: "center",
//   });

//   currentY += 5;

//   // underline
//   doc.setDrawColor(34, 197, 94);
//   doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

//   currentY += 15;

//   // ================= FINAL SCORE BOX =================
//   doc.setFillColor(240, 253, 244);
//   doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

//   doc.setFontSize(14);
//   doc.setTextColor(0, 0, 0);
//   doc.text(
//     `Final Score: ${finalScore}/10`,
//     pageWidth / 2,
//     currentY + 12,
//     { align: "center" }
//   );

//   currentY += 30;

//   // ================= SKILLS BOX =================
//   doc.setFillColor(249, 250, 251);
//   doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

//   doc.setFontSize(12);

//   doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
//   doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
//   doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

//   currentY += 45;

//   // ================= ADVICE =================
//   let advice = "";

//   if (finalScore >= 8) {
//     advice =
//       "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
//   } else if (finalScore >= 5) {
//     advice =
//       "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
//   } else {
//     advice =
//       "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
//   }

//   doc.setFillColor(255, 255, 255);
//   doc.setDrawColor(220);
//   doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

//   doc.setFont("helvetica", "bold");
//   doc.text("Professional Advice", margin + 10, currentY + 10);

//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(11);

//   const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
//   doc.text(splitAdvice, margin + 10, currentY + 20);

//   currentY += 50;

//   // ================= QUESTION TABLE =================
//   autoTable(doc, {
//   startY: currentY,
//   margin: { left: margin, right: margin },
//   head: [["#", "Question", "Score", "Feedback"]],
//   body: questionWiseScore.map((q, i) => [
//     `${i + 1}`,
//     q.question,
//     `${q.score}/10`,
//     q.feedback,
//   ]),
//   styles: {
//     fontSize: 9,
//     cellPadding: 5,
//     valign: "top",
//   },
//   headStyles: {
//     fillColor: [34, 197, 94],
//     textColor: 255,
//     halign: "center",
//   },
//   columnStyles: {
//     0: { cellWidth: 10, halign: "center" }, // index
//     1: { cellWidth: 55 }, // question
//     2: { cellWidth: 20, halign: "center" }, // score
//     3: { cellWidth: "auto" }, // feedback
//   },
//   alternateRowStyles: {
//     fillColor: [249, 250, 251],
//   },
// });


//   doc.save("AI_Interview_Report.pdf");
// };

//   return (
//     <div className='min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8'>
//       <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
//         <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
//           <button
//             onClick={() => navigate("/history")}
//             className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

//           <div>
//             <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
//               Interview Analytics Dashboard
//             </h1>
//             <p className='text-gray-500 mt-2'>
//               AI-powered performance insights
//             </p>

//           </div>
//         </div>

//         <button onClick={downloadPDF} className='bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap'>Download PDF</button>
//       </div>


//       <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

//         <div className='space-y-6'>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center">

//             <h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
//               Overall Performance
//             </h3>
//             <div className='relative w-20 h-20 sm:w-25 sm:h-25 mx-auto'>
//               <CircularProgressbar
//                 value={percentage}
//                 text={`${score}/10`}
//                 styles={buildStyles({
//                   textSize: "18px",
//                   pathColor: "#10b981",
//                   textColor: "#ef4444",
//                   trailColor: "#e5e7eb",
//                 })}
//               />
//             </div>

//             <p className="text-gray-400 mt-3 text-xs sm:text-sm">
//               Out of 10
//             </p>

//             <div className="mt-4">
//               <p className="font-semibold text-gray-800 text-sm sm:text-base">
//                 {performanceText}
//               </p>
//               <p className="text-gray-500 text-xs sm:text-sm mt-1">
//                 {shortTagline}
//               </p>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'>
//             <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
//               Skill Evaluation
//             </h3>

//             <div className='space-y-5'>
//               {
//                 skills.map((s, i) => (
//                   <div key={i}>
//                     <div className='flex justify-between mb-2 text-sm sm:text-base'>

//                       <span>{s.label}</span>
//                       <span className='font-semibold text-green-600'>{s.value}</span>
//                     </div>

//                     <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
//                       <div className='bg-green-500 h-full rounded-full'
//                         style={{ width: `${s.value * 10}%` }}

//                       ></div>

//                     </div>


//                   </div>
//                 ))
//               }
//             </div>

//           </motion.div>


//         </div>

//         <div className='lg:col-span-2 space-y-6'>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
//             <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
//               Performance Trend
//             </h3>

//             <div className='h-64 sm:h-72'>

//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={questionScoreData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis domain={[0, 10]} />
//                   <Tooltip />
//                   <Area type="monotone"
//                     dataKey="score"
//                     stroke="#22c55e"
//                     fill="#bbf7d0"
//                     strokeWidth={3} />


//                 </AreaChart>

//               </ResponsiveContainer>


//             </div>


//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
//             <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
//               Question Breakdown
//             </h3>
//             <div className='space-y-6'>
//               {questionWiseScore.map((q, i) => (
//                 <div key={i} className='bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200'>

//                   <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
//                     <div>
//                       <p className="text-xs text-gray-400">
//                         Question {i + 1}
//                       </p>

//                       <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
//                         {q.question || "Question not available"}
//                       </p>
//                     </div>


//                     <div className='bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
//                       {q.score ?? 0}/10
//                     </div>
//                   </div>

//                   <div className='bg-green-50 border border-green-200 p-4 rounded-lg'>
//                     <p className='text-xs text-green-600 font-semibold mb-1'>
//                       AI Feedback
//                     </p>
//                     <p className='text-sm text-gray-700 leading-relaxed'>

//                       {q.feedback && q.feedback.trim() !== ""
//                         ? q.feedback
//                         : "No feedback available for this question."}
//                     </p>
//                   </div>

//                 </div>
//               ))}
//             </div>

//           </motion.div>





//         </div>
//       </div>

//     </div>
//   )
// }

// export default Step3Report
import React from 'react'
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

// Same thresholds as the verdict text: 8+ strong, 5-7 fair, below 5 weak
const getTone = (value) => {
  if (value >= 8) return { hex: '#10b981', fill: '#a7f3d0', text: 'text-emerald-600', bg: 'bg-emerald-100', bar: 'bg-emerald-500' }
  if (value >= 5) return { hex: '#f59e0b', fill: '#fde68a', text: 'text-amber-600', bg: 'bg-amber-100', bar: 'bg-amber-500' }
  return { hex: '#f43f5e', fill: '#fecdd3', text: 'text-rose-600', bg: 'bg-rose-100', bar: 'bg-rose-500' }
}

function Step3Report({ report }) {
  // hooks must run before any early return
  const navigate = useNavigate()

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className='flex items-center gap-3 text-gray-500 text-lg'>
          <span className='h-5 w-5 rounded-full border-2 border-gray-300 border-t-emerald-500 animate-spin' />
          Loading report...
        </div>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;
  const tone = getTone(score)


  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let currentY = 25;

    // ================= TITLE =================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });

    currentY += 5;

    // underline
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

    currentY += 15;

    // ================= FINAL SCORE BOX =================
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currentY + 12,
      { align: "center" }
    );

    currentY += 30;

    // ================= SKILLS BOX =================
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

    currentY += 45;

    // ================= ADVICE =================
    let advice = "";

    if (finalScore >= 8) {
      advice =
        "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice =
        "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice =
        "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);

    currentY += 50;

    // ================= QUESTION TABLE =================
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" }, // index
        1: { cellWidth: 55 }, // question
        2: { cellWidth: 20, halign: "center" }, // score
        3: { cellWidth: "auto" }, // feedback
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
    });


    doc.save("AI_Interview_Report.pdf");
  };

  const card = 'bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7'

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 px-4 sm:px-6 lg:px-10 py-8'>
      <div className='max-w-7xl mx-auto'>

        {/* header */}
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div className='flex items-start gap-4'>
            <button
              onClick={() => navigate("/history")}
              aria-label='Back to history'
              className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'>
              <FaArrowLeft className='text-gray-600' />
            </button>

            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>Interview report</h1>
              <p className='text-gray-500 mt-1'>Your scores, skill ratings and feedback on every answer.</p>
            </div>
          </div>

          <button
            onClick={downloadPDF}
            className='inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md transition font-semibold text-sm sm:text-base whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500'>
            <FaDownload /> Download PDF
          </button>
        </div>


        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

          {/* LEFT column */}
          <div className='space-y-6'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${card} text-center`}>

              <h3 className="text-gray-500 mb-5 text-sm">Overall score</h3>

              <div className='w-36 h-36 mx-auto'>
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "20px",
                    pathColor: tone.hex,
                    textColor: tone.hex,
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>

              <div className="mt-6">
                <p className={`font-semibold ${tone.text}`}>{performanceText}</p>
                <p className="text-gray-500 text-sm mt-1">{shortTagline}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={card}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-6">Skill ratings</h3>

              <div className='space-y-5'>
                {skills.map((s) => {
                  const t = getTone(s.value)
                  return (
                    <div key={s.label}>
                      <div className='flex justify-between mb-2 text-sm'>
                        <span className='text-gray-700'>{s.label}</span>
                        <span className={`font-semibold ${t.text}`}>{s.value}/10</span>
                      </div>

                      <div className='bg-gray-100 h-2.5 rounded-full overflow-hidden'>
                        <div
                          className={`${t.bar} h-full rounded-full transition-all duration-700`}
                          style={{ width: `${Math.min(s.value, 10) * 10}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT column */}
          <div className='lg:col-span-2 space-y-6'>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={card}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">Score by question</h3>
              <p className='text-sm text-gray-500 mb-5'>See which answers lifted or lowered your result.</p>

              <div className='h-64 sm:h-72'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id='scoreFill' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#10b981' stopOpacity={0.35} />
                        <stop offset='100%' stopColor='#10b981' stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#e5e7eb' />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                      formatter={(v) => [`${v}/10`, 'Score']}
                      contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: 'none' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      fill="url(#scoreFill)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={card}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-6">Question breakdown</h3>

              <div className='space-y-5'>
                {questionWiseScore.map((q, i) => {
                  const qScore = q.score ?? 0
                  const t = getTone(qScore)
                  return (
                    <div key={i} className='rounded-2xl border border-gray-200 overflow-hidden'>

                      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 sm:p-5 bg-gray-50'>
                        <div className='min-w-0'>
                          <p className="text-xs text-gray-400 mb-1">Question {i + 1}</p>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                            {q.question || "Question not available"}
                          </p>
                        </div>

                        <span className={`${t.bg} ${t.text} px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit shrink-0`}>
                          {qScore}/10
                        </span>
                      </div>

                      <div className='p-4 sm:p-5 border-t border-gray-200 bg-white'>
                        <p className='text-sm font-semibold text-emerald-700 mb-1'>Feedback</p>
                        <p className='text-sm text-gray-700 leading-relaxed'>
                          {q.feedback && q.feedback.trim() !== ""
                            ? q.feedback
                            : "No feedback available for this question."}
                        </p>
                      </div>

                    </div>
                  )
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report