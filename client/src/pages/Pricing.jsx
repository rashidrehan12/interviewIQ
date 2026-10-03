// import React, { useState } from 'react'
// import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
// import { useNavigate } from 'react-router-dom'
// import { motion } from "motion/react";
// import axios from 'axios';
// import { ServerUrl } from '../App';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function Pricing() {
//   const navigate = useNavigate()
//   const [selectedPlan, setSelectedPlan] = useState("free");
//   const [loadingPlan, setLoadingPlan] = useState(null);
//   const dispatch = useDispatch()

//   const plans = [
//     {
//       id: "free",
//       name: "Free",
//       price: "₹0",
//       credits: 100,
//       description: "Perfect for beginners starting interview preparation.",
//       features: [
//         "100 AI Interview Credits",
//         "Basic Performance Report",
//         "Voice Interview Access",
//         "Limited History Tracking",
//       ],
//       default: true,
//     },
//     {
//       id: "basic",
//       name: "Starter Pack",
//       price: "₹100",
//       credits: 150,
//       description: "Great for focused practice and skill improvement.",
//       features: [
//         "150 AI Interview Credits",
//         "Detailed Feedback",
//         "Performance Analytics",
//         "Full Interview History",
//       ],
//     },
//     {
//       id: "pro",
//       name: "Pro Pack",
//       price: "₹500",
//       credits: 650,
//       description: "Best value for serious job preparation.",
//       features: [
//         "650 AI Interview Credits",
//         "Advanced AI Feedback",
//         "Skill Trend Analysis",
//         "Priority AI Processing",
//       ],
//       badge: "Best Value",
//     },
//   ];



//   const handlePayment = async (plan) => {
//     try {
//       setLoadingPlan(plan.id)

//       const amount =  
//       plan.id === "basic" ? 100 :
//       plan.id === "pro" ? 500 : 0;

//       const result = await axios.post(ServerUrl + "/api/payment/order" , {
//         planId: plan.id,
//         amount: amount,
//         credits: plan.credits,
//       },{withCredentials:true})
      

//       const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: result.data.amount,
//       currency: "INR",
//       name: "InterviewIQ.AI",
//       description: `${plan.name} - ${plan.credits} Credits`,
//       order_id: result.data.id,

//       handler:async function (response) {
//         const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
//         dispatch(setUserData(verifypay.data.user))

//           alert("Payment Successful 🎉 Credits Added!");
//           navigate("/")

//       },
//       theme:{
//         color: "#10b981",
//       },

//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()

//       setLoadingPlan(null);
//     } catch (error) {
//      console.log(error)
//      setLoadingPlan(null);
//     }
//   }



//   return (
//     <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>

//       <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

//         <button onClick={() => navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
//           <FaArrowLeft className='text-gray-600' />
//         </button>

//         <div className="text-center w-full">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Choose Your Plan
//           </h1>
//           <p className="text-gray-500 mt-3 text-lg">
//             Flexible pricing to match your interview preparation goals.
//           </p>
//         </div>
//       </div>


//       <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

//         {plans.map((plan) => {
//           const isSelected = selectedPlan === plan.id

//           return (
//             <motion.div key={plan.id}
//               whileHover={!plan.default && { scale: 1.03 }}
//               onClick={() => !plan.default && setSelectedPlan(plan.id)}

//               className={`relative rounded-3xl p-8 transition-all duration-300 border 
//                 ${isSelected
//                   ? "border-emerald-600 shadow-2xl bg-white"
//                   : "border-gray-200 bg-white shadow-md"
//                 }
//                 ${plan.default ? "cursor-default" : "cursor-pointer"}
//               `}
//             >

//               {/* Badge */}
//               {plan.badge && (
//                 <div className="absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow">
//                   {plan.badge}
//                 </div>
//               )}

//               {/* Default Tag */}
//               {plan.default && (
//                 <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
//                   Default
//                 </div>
//               )}

//               {/* Plan Name */}
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {plan.name}
//               </h3>

//               {/* Price */}
//               <div className="mt-4">
//                 <span className="text-3xl font-bold text-emerald-600">
//                   {plan.price}
//                 </span>
//                 <p className="text-gray-500 mt-1">
//                   {plan.credits} Credits
//                 </p>
//               </div>

//               {/* Description */}
//               <p className="text-gray-500 mt-4 text-sm leading-relaxed">
//                 {plan.description}
//               </p>

//               {/* Features */}
//               <div className="mt-6 space-y-3 text-left">
//                 {plan.features.map((feature, i) => (
//                   <div key={i} className="flex items-center gap-3">
//                     <FaCheckCircle className="text-emerald-500 text-sm" />
//                     <span className="text-gray-700 text-sm">
//                       {feature}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {!plan.default &&
//                 <button
//                 disabled={loadingPlan === plan.id}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     if (!isSelected) {
//                       setSelectedPlan(plan.id)
//                     } else {
//                       handlePayment(plan)
//                     }
//                   }} className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${isSelected
//                     ? "bg-emerald-600 text-white hover:opacity-90"
//                     : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
//                     }`}>
//                   {loadingPlan === plan.id
//                     ? "Processing..."
//                     : isSelected
//                       ? "Proceed to Pay"
//                       : "Select Plan"}

//                 </button>
//               }
//             </motion.div>
//           )
//         })}
//       </div>

//     </div>
//   )
// }

// export default Pricing

import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { BsCoin, BsShieldCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      badge: "Free Plan",
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];



  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
          plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

        },
        theme: {
          color: "#10b981",
        },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  const selectPlan = (plan) => {
    if (!plan.default) setSelectedPlan(plan.id)
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 via-white to-emerald-50 py-14 px-5 sm:px-6'>

      {/* header */}
      <div className='max-w-6xl mx-auto mb-12 relative'>
        <button
          onClick={() => navigate("/")}
          aria-label='Back to home'
          className='absolute left-0 top-0 p-3 rounded-full bg-white shadow hover:shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'>
          <FaArrowLeft className='text-gray-600' />
        </button>

        <div className="text-center px-14">
          <div className='inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 text-sm px-4 py-1.5 rounded-full mb-5'>
            <BsCoin size={16} />
            Credits power every interview
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Choose your plan
          </h1>
          <p className="text-gray-500 mt-3 text-base sm:text-lg max-w-xl mx-auto">
            Pick the number of credits that fits your interview preparation. Pay once, use them whenever you like.
          </p>
        </div>
      </div>


      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id
          const highlighted = !!plan.badge

          return (
            <motion.div key={plan.id}
              role={plan.default ? undefined : 'button'}
              tabIndex={plan.default ? undefined : 0}
              onKeyDown={(e) => { if (e.key === 'Enter' && !plan.default) selectPlan(plan) }}
              onClick={() => selectPlan(plan)}

              className={`relative flex flex-col rounded-3xl p-7 sm:p-8 bg-white border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                ${isSelected
                  ? "border-emerald-600 ring-2 ring-emerald-600/20 shadow-2xl"
                  : "border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-200"
                }
                ${highlighted ? "lg:-translate-y-3" : ""}
                ${plan.default ? "cursor-default" : "cursor-pointer"}
              `}
            >

              {/* Tag */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-emerald-600 to-teal-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                  {plan.badge}
                </div>
              )}

              <div className='flex items-start justify-between gap-3'>
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>

                {plan.default && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Default
                  </span>
                )}
                {isSelected && !plan.default && (
                  <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                    <FaCheckCircle size={11} /> Selected
                  </span>
                )}
              </div>

              <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <div className='mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full'>
                  <BsCoin size={14} />
                  {plan.credits} credits
                </div>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-left flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {!plan.default &&
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }} className={`w-full mt-8 py-3.5 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500 ${isSelected
                    ? "bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-md hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}>
                  {loadingPlan === plan.id
                    ? "Processing..."
                    : isSelected
                      ? `Proceed to pay ${plan.price}`
                      : "Select plan"}

                </button>
              }
            </motion.div>
          )
        })}
      </div>

      {/* reassurance */}
      <div className='max-w-6xl mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500'>
        <span className='flex items-center gap-2'><BsShieldCheck className='text-emerald-600' /> Secure payment with Razorpay</span>
        <span className='flex items-center gap-2'><FaCheckCircle className='text-emerald-600' /> Credits are added right after payment</span>
      </div>

    </div>
  )
}

export default Pricing