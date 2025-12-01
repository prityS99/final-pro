"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Check, X, Loader2, Zap, Users, Shield, Package, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.config";

declare global {
interface Window {
Razorpay: any;
}
}

export default function Plan() {
const [plan, setPlan] = useState("free");
const [processing, setProcessing] = useState(false);
const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
const router = useRouter();

// Set 14-day trial on first login
useEffect(() => {
if (typeof window === "undefined") return;


const trialStart = localStorage.getItem("trial_start");
if (!trialStart) {
  localStorage.setItem("trial_start", Date.now().toString());
  setTrialDaysLeft(14);
} else {
  const diff = Math.floor((Date.now() - parseInt(trialStart)) / (1000 * 60 * 60 * 24));
  setTrialDaysLeft(diff < 14 ? 14 - diff : 0);
}


}, []);

// Razorpay payment verification
const handlePaymentVerification = useCallback(async (response: any) => {
try {
setProcessing(true);
const verify = await fetch("/api/razorpay/verify-payment", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
razorpay_order_id: response.razorpay_order_id,
razorpay_payment_id: response.razorpay_payment_id,
razorpay_signature: response.razorpay_signature,
user: { userId: "USER_ID", name: "Test User", email: "[user@example.com](mailto:user@example.com)", phone: "1234567890" },
plan: { planId: "pro001", planName: "Pro Plan", price: 499, billingCycle: "monthly", currency: "INR" }
}),
});
const result = await verify.json();
if (result.ok) {
toast.success("Pro Plan Activated 🎉");
setPlan("pro");
} else {
toast.error("Payment verification failed: " + (result.message || "Unknown error"));
}
} catch (err) {
toast.error("Verification error");
console.error(err);
} finally {
setProcessing(false);
}
}, []);

const handlePaymentFailed = useCallback((response: any) => {
toast.error(`Payment failed: ${response.error?.description || "Unknown error"}`);
setProcessing(false);
}, []);

const upgrade = useCallback(async () => {
try {
setProcessing(true);
try {
await account.get();
} catch {
toast.info("Please login to upgrade to Pro");
router.push("/login");
setProcessing(false);
return;
}

  const res = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 499 * 100, receipt: `pro_${Date.now()}` })
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.message || "Order creation failed");

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    currency: data.order.currency,
    name: "Workspace Pro",
    description: "Pro Plan Subscription - ₹499/month",
    order_id: data.order.id,
    theme: { color: "#4f46e5" },
    modal: {
      ondismiss: () => {
        toast.info("Payment cancelled");
        setProcessing(false);
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.success', handlePaymentVerification);
  rzp.on('payment.failed', handlePaymentFailed);
  rzp.open();
} catch (err: any) {
  toast.error(err.message || "Payment setup failed");
  setProcessing(false);
}


}, [handlePaymentVerification, handlePaymentFailed, router]);

const downgrade = () => {
toast.info("Switched back to Free plan");
setPlan("free");
};

// // Load Razorpay script
// useEffect(() => {
// if (typeof window === "undefined") return;
// const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
// if (!existingScript) {
//   const script = document.createElement("script");
//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.async = true;
//   document.body.appendChild(script);
//   script.onload = () => console.log("Razorpay script loaded");
//   return () => document.body.removeChild(script);
// }

// }, []);

useEffect(() => {
  if (typeof window === "undefined") return;

  const existingScript = document.querySelector(
    'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => console.log("Razorpay script loaded");

    // Proper cleanup return
    return () => {
      document.body.removeChild(script);
    };
  }
})



// Feature lists
const freeFeatures = [
{ label: "5 documents limit", available: true, icon: Package },
{ label: "No file uploads", available: false, icon: X },
{ label: "No version history", available: false, icon: X },
{ label: "Real-time editing", available: false, icon: X },
{ label: "Comments & Reactions", available: false, icon: X },
{ label: "File attachments", available: false, icon: X },
];
const proFeatures = [
{ label: "Unlimited documents", available: true, icon: Package },
{ label: "File uploads (1GB/month)", available: true, icon: Check },
{ label: "Full version history", available: true, icon: Check },
{ label: "Real-time editing", available: true, icon: Zap },
{ label: "Comments & Reactions", available: true, icon: Check },
{ label: "File attachments", available: true, icon: Check },
];
const enterpriseFeatures = [
{ label: "Custom usage limits", available: true, icon: DollarSign },
{ label: "Dedicated account support", available: true, icon: Users },
{ label: "Advanced team collaboration", available: true, icon: Users },
{ label: "Enhanced security controls", available: true, icon: Shield },
{ label: "Unlimited member seats", available: true, icon: Users },
{ label: "Custom billing & invoicing", available: true, icon: DollarSign },
];

function AnimatedCard({ title, price, sub, features, active = false, buttonLabel, onClick, disabled = false, loading = false }: any) {
return (
<div className={`group rounded-3xl p-8 shadow-xl relative transition-all duration-500 transform hover:scale-[1.03] ${active ? "border-4 border-indigo-600 bg-white dark:bg-gray-800 shadow-indigo-300/50 dark:shadow-indigo-900/50" : "border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400"}`}>
{active && ( <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-md shadow-indigo-500/50">
Active Plan </span>
)} <div className="mb-6"> <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3> <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-none">{price}</p> <p className="text-base text-gray-500 dark:text-gray-400 font-medium mt-1">{sub}</p> </div> <ul className="space-y-4 mb-10">
{features.map((item: any, i: number) => {
const Icon = item.icon;
return ( <li key={i} className="flex items-start gap-4">
<span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${item.available ? "bg-indigo-500 text-white shadow-sm" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}> <Icon className="w-4 h-4" /> </span> <span className="text-gray-700 dark:text-gray-300 font-medium text-base leading-snug">{item.label}</span> </li>
);
})} </ul>
<button onClick={onClick} disabled={disabled || loading} className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 ${disabled || loading ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none" : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:hover:shadow-indigo-400/30"}`}>
{loading ? <span className="flex items-center justify-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</span> : buttonLabel} </button> </div>
);
}

return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-12 font-sans" style={{ backgroundImage: "linear-gradient(rgba(245, 250, 255, 0.96), rgba(225, 240, 255, 0.92))" }}>
{/* Hero Section */} <section className="text-center max-w-6xl mx-auto mb-16 px-4"> <h1 className="mt-16 text-6xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">Find Your Perfect Plans</h1> <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Choose the perfect plan for your workflow.</p>
{trialDaysLeft !== null && trialDaysLeft > 0 && ( <p className="mt-4 text-md text-indigo-700 dark:text-indigo-400 font-semibold">
Your free trial ends in {trialDaysLeft} day{trialDaysLeft > 1 ? "s" : ""}. </p>
)} </section>


  {/* Pricing Cards */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
    <AnimatedCard title="Free" price="₹0" sub="Perfect for personal use" features={freeFeatures} active={plan === "free"} buttonLabel={plan === "free" ? "Current Plan" : "Switch to Free"} onClick={downgrade} disabled={plan === "free"} />
    <AnimatedCard title="Pro" price="₹499/mo" sub="For power users" features={proFeatures} active={plan === "pro"} buttonLabel={plan === "pro" ? "Current Plan" : "Upgrade to Pro"} onClick={upgrade} loading={processing} disabled={plan === "pro"} />
    <AnimatedCard title="Enterprise" price="Custom" sub="For large teams" features={enterpriseFeatures} active={false} buttonLabel="Contact Sales" onClick={() => toast.info("Our sales team will contact you soon")} />
  </div>
</div>

);
}



// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "sonner";
// import { Check, X, Loader2, Zap, Users, Shield, Package, DollarSign } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { account, databases } from "@/lib/appwrite.config";

// declare global {
// interface Window {
// Razorpay: any;
// }
// }

// export default function Plan() {
// const [plan, setPlan] = useState("free");
// const [processing, setProcessing] = useState(false);
// const router = useRouter();

// // Check user session
// // useEffect(() => {
// // async function checkSession() {
// // try {
// // await account.get();
// // } catch {
// // router.push("/login");
// // }
// // }
// // checkSession();
// // }, [router]);

// // Handle successful payment verification
// const handlePaymentVerification = useCallback(async (response: any) => {
// try {
// setProcessing(true);

// // await databases.updateDocument(
// //   DB_ID,
// //   SUBSCRIPTIONS_COLLECTION_ID,
// //   userId,
// //   {
// //     subscriptionStatus: "pro",
// //     proActivatedAt: Date.now()
// //   }
// // );


//   const verify = await fetch("/api/razorpay/verify-payment", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       razorpay_order_id: response.razorpay_order_id,
//       razorpay_payment_id: response.razorpay_payment_id,
//       razorpay_signature: response.razorpay_signature,
//       user: { 
//         userId: "USER_ID", // replace with logged-in user ID
//         name: "Test User",
//         email: "user@example.com",
//         phone: "1234567890"
//       },
//       plan: {
//         planId: "pro001",
//         planName: "Pro Plan",
//         price: 499,
//         billingCycle: "monthly",
//         currency: "INR"
//       }
//     }),
//   });

//   const result = await verify.json();

//   if (result.ok) {
//     toast.success("Pro Plan Activated 🎉");

//     // Save user plan to DB
//     await fetch("/api/user-plan/save", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ plan: "pro" }),
//     });

//     // Update frontend state
//     setPlan("pro");
//   } else {
//     toast.error("Payment verification failed: " + (result.message || "Unknown error"));
//   }
// } catch (err) {
//   toast.error("Verification error");
//   console.error("Verification failed:", err);
// } finally {
//   setProcessing(false);
// }


// }, []);

// // Handle payment failure
// const handlePaymentFailed = useCallback((response: any) => {
// toast.error(`Payment failed: ${response.error?.description || "Unknown error"}`);
// setProcessing(false);
// }, []);

// // Upgrade function to open Razorpay checkout
// const upgrade = useCallback(async () => {
// try {
// setProcessing(true);

  
//     try {
//       await account.get();
//     } catch {
//       toast.info("Please login to upgrade to Pro");
//       router.push("/login");
//       setProcessing(false);
//       return; // stop upgrade here
//     }
//   const res = await fetch("/api/razorpay/create-order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ amount: 499 * 100, receipt: `pro_${Date.now()}` })
//   });

//   const data = await res.json();
//   if (!data.ok) throw new Error(data.message || "Order creation failed");

//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
//     currency: data.order.currency,
//     name: "Workspace Pro",
//     description: "Pro Plan Subscription - ₹499/month",
//     order_id: data.order.id,
//     theme: { color: "#4f46e5" },
//     modal: {
//       ondismiss: () => {
//         toast.info("Payment cancelled");
//         setProcessing(false);
//       }
//     }
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.on('payment.success', handlePaymentVerification);
//   rzp.on('payment.failed', handlePaymentFailed);
//   rzp.open();
// } catch (err: any) {
//   toast.error(err.message || "Payment setup failed");
//   setProcessing(false);
// }


// }, [handlePaymentVerification, handlePaymentFailed]);

// const downgrade = () => {
// toast.info("Switched back to Free plan");
// setPlan("free");
// };

// // Load Razorpay script
// // useEffect(() => {
// // if (typeof window !== "undefined" && !document.querySelector('script[src="[https://checkout.razorpay.com/v1/checkout.js](https://checkout.razorpay.com/v1/checkout.js)"]')) {
// // const script = document.createElement("script");
// // script.src = "[https://checkout.razorpay.com/v1/checkout.js](https://checkout.razorpay.com/v1/checkout.js)";
// // script.async = true;
// // document.body.appendChild(script);
// // script.onload = () => console.log("Razorpay script loaded");
// // return () => document.body.removeChild(script);
// // }
// // }, []);
// useEffect(() => {
//   if (typeof window === "undefined") return;

//   const existingScript = document.querySelector(
//     'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
//   );

//   if (!existingScript) {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;

//     document.body.appendChild(script);

//     script.onload = () => console.log("Razorpay script loaded");

//     // Proper cleanup return
//     return () => {
//       document.body.removeChild(script);
//     };
//   }

//   return;
// }, []);



// // Feature lists
// const freeFeatures = [
// { label: "5 documents limit", available: true, icon: Package },
// { label: "No file uploads", available: false, icon: X },
// { label: "No version history", available: false, icon: X },
// { label: "Real-time editing", available: false, icon: X },
// { label: "Comments & Reactions", available: false, icon: X },
// { label: "File attachments", available: false, icon: X },
// ];

// const proFeatures = [
// { label: "Unlimited documents", available: true, icon: Package },
// { label: "File uploads (1GB/month)", available: true, icon: Check },
// { label: "Full version history", available: true, icon: Check },
// { label: "Real-time editing", available: true, icon: Zap },
// { label: "Comments & Reactions", available: true, icon: Check },
// { label: "File attachments", available: true, icon: Check },
// ];

// const enterpriseFeatures = [
// { label: "Custom usage limits", available: true, icon: DollarSign },
// { label: "Dedicated account support", available: true, icon: Users },
// { label: "Advanced team collaboration", available: true, icon: Users },
// { label: "Enhanced security controls", available: true, icon: Shield },
// { label: "Unlimited member seats", available: true, icon: Users },
// { label: "Custom billing & invoicing", available: true, icon: DollarSign },
// ];

// // AnimatedCard component (no changes)
// function AnimatedCard({ title, price, sub, features, active = false, buttonLabel, onClick, disabled = false, loading = false }: any) {
// return (
// <div className={`group rounded-3xl p-8 shadow-xl relative transition-all duration-500 transform hover:scale-[1.03] ${active ? "border-4 border-indigo-600 bg-white dark:bg-gray-800 shadow-indigo-300/50 dark:shadow-indigo-900/50" : "border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-400"}`}>
// {active && ( <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-wider shadow-md shadow-indigo-500/50">
// Active Plan </span>
// )} <div className="mb-6"> <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3> <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-none">{price}</p> <p className="text-base text-gray-500 dark:text-gray-400 font-medium mt-1">{sub}</p> </div> <ul className="space-y-4 mb-10">
// {features.map((item: any, i: number) => {
// const Icon = item.icon;
// return ( <li key={i} className="flex items-start gap-4">
// <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${item.available ? "bg-indigo-500 text-white shadow-sm" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}> <Icon className="w-4 h-4" /> </span> <span className="text-gray-700 dark:text-gray-300 font-medium text-base leading-snug">{item.label}</span> </li>
// );
// })} </ul>
// <button onClick={onClick} disabled={disabled || loading} className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 ${disabled || loading ? "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none" : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/40 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:hover:shadow-indigo-400/30"}`}>
// {loading ? <span className="flex items-center justify-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</span> : buttonLabel} </button> </div>
// );
// }

// return (
// <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-12 font-sans" style={{ backgroundImage: "linear-gradient(rgba(245, 250, 255, 0.96), rgba(225, 240, 255, 0.92))" }}>
// {/* Hero Section */} <section className="text-center max-w-6xl mx-auto mb-16 px-4"> <h1 className="mt-16 text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">Find Your Perfect Plans</h1> <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Choose the perfect plan for your workflow.</p> </section>

//   {/* Pricing Cards */}
//   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
//     <AnimatedCard title="Free" price="₹0" sub="Perfect for personal use" features={freeFeatures} active={plan === "free"} buttonLabel={plan === "free" ? "Current Plan" : "Switch to Free"} onClick={downgrade} disabled={plan === "free"} />
//     <AnimatedCard title="Pro" price="₹499/mo" sub="For power users" features={proFeatures} active={plan === "pro"} buttonLabel={plan === "pro" ? "Current Plan" : "Upgrade to Pro"} onClick={upgrade} loading={processing} disabled={plan === "pro"} />
//     <AnimatedCard title="Enterprise" price="Custom" sub="For large teams" features={enterpriseFeatures} active={false} buttonLabel="Contact Sales" onClick={() => toast.info("Our sales team will contact you soon")} />
//   </div>
//  <section className="mt-10 53max-w-6xl mx-auto mb-12 px-4">
//        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Plan Summary</h2>
//        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
//           <div className="grid grid-cols-2 md:grid-cols-4 text-sm md:text-base font-semibold text-center text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-700">
//              <div className="p-4 hidden md:block">Feature</div>
//              <div className="p-4 md:border-l border-gray-200 dark:border-gray-700">Free</div>
//              <div className="p-4 border-l border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">Pro</div>
//             <div className="p-4 border-l border-gray-200 dark:border-gray-700">Enterprise</div>
//            </div>
          
//            {[
//             { feature: "Document Limit", free: "5", pro: "Unlimited", enterprise: "Custom" },
//             { feature: "File Uploads", free: <X className="w-5 h-5 mx-auto text-red-500" />, pro: <Check className="w-5 h-5 mx-auto text-green-500" />, enterprise: <Check className="w-5 h-5 mx-auto text-green-500" /> },
//             { feature: "Real-time Editing", free: <X className="w-5 h-5 mx-auto text-red-500" />, pro: <Check className="w-5 h-5 mx-auto text-green-500" />, enterprise: <Check className="w-5 h-5 mx-auto text-green-500" /> },
//             { feature: "Version History", free: <X className="w-5 h-5 mx-auto text-red-500" />, pro: <Check className="w-5 h-5 mx-auto text-green-500" />, enterprise: <Check className="w-5 h-5 mx-auto text-green-500" /> },
//             { feature: "Dedicated Support", free: <X className="w-5 h-5 mx-auto text-red-500" />, pro: <X className="w-5 h-5 mx-auto text-red-500" />, enterprise: <Zap className="w-5 h-5 mx-auto text-indigo-500" /> },
//             { feature: "Advanced Security", free: <X className="w-5 h-5 mx-auto text-red-500" />, pro: <X className="w-5 h-5 mx-auto text-red-500" />, enterprise: <Shield className="w-5 h-5 mx-auto text-indigo-500" /> },
//           ].map((row, index) => (
//             <div key={index} className="grid grid-cols-2 md:grid-cols-4 text-center border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
//               <div className="p-4 font-medium text-left text-gray-800 dark:text-gray-200 hidden md:block">{row.feature}</div>
//               <div className="p-4 md:border-l border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
//                 <span className="md:hidden mr-2 font-medium">{row.feature}:</span> {row.free}
//               </div>
//               <div className="p-4 border-l border-gray-200 dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/50 font-semibold text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
//                 <span className="md:hidden mr-2 font-medium">{row.feature}:</span> {row.pro}
//               </div>
//               <div className="p-4 border-l border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center">
//                 <span className="md:hidden mr-2 font-medium">{row.feature}:</span> {row.enterprise}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
// </div>

// );
// }

