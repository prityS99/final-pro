"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AskHelp() {
  const [loading, setLoading] = useState(false);


  const handleMainSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Your issue has been submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white dark:bg-black pt-36 px-6 lg:px-24">

      {/* ------ HEADING ------*/}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          Need Help?
        </h1>
        <p className="mt-4 text-lg text-black-600 dark:text-black-400">
          Share your issue or question — we’ll reach back with clarity and care.
        </p>
      </div>

      {/* --------- CONTACT BOXES -------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">

        <InfoCard
          icon={<Mail className="w-8 h-8 text-indigo-600" />}
          title="Email Support"
          desc="Get fast support from our team within 12–24 hours."
        />

        <InfoCard
          icon={<MessageCircle className="w-8 h-8 text-indigo-600" />}
          title="Quick Response"
          desc="Ask anything related to your workspace or projects."
        />

        <InfoCard
          icon={<Send className="w-8 h-8 text-indigo-600" />}
          title="Get Resolution"
          desc="We provide simple, practical steps to solve your issue."
        />

      </div>

      {/* --------- FORM SECTION --------*/}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border rounded-2xl shadow-sm p-10">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Share Your Issue
        </h2>

        <form onSubmit={handleMainSubmit} className="space-y-6">

          {/* ------ NAME ----- */}
          <FormField label="Your Name">
            <input
              type="text"
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white focus:ring-2 ring-indigo-600 outline-none"
              placeholder="Enter your name"
              required
            />
          </FormField>

          {/* ----- EMAIL ----- */}
          <FormField label="Your Email">
            <input
              type="email"
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white focus:ring-2 ring-indigo-600 outline-none"
              placeholder="email@example.com"
              required
            />
          </FormField>

          {/* ------- MESSAGE ----- */}
          <FormField label="Describe Your Issue">
            <textarea
              rows={5}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 
              text-gray-900 dark:text-white focus:ring-2 ring-indigo-600 outline-none"
              placeholder="Write your question or problem here..."
              required
            ></textarea>
          </FormField>

          {/* ------ SUBMIT BUTTON -----*/}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold 
            py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Submit <Send className="w-5 h-5" />
              </>
            )}
          </motion.button>

        </form>
      </div>

      {/* ------- MORE QUERIES  ------- */}
      <div className="max-w-3xl mx-auto mt-16 bg-white dark:bg-gray-900 border rounded-2xl shadow-sm p-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Any More Queries?
        </h2>
        <MoreQueriesForm />
      </div>

    </div>
  );
}

function InfoCard({ icon, title, desc }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded-2xl p-6 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {desc}
      </p>
    </motion.div>
  );
}

/* ----- FORM FIELD WRAPPER ----*/
function FormField({ label, children }: any) {
  return (
    <div>
      <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ------ MORE QUERIES -------*/
function MoreQueriesForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Your query has been submitted!");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">


      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1 font-semibold">
          Ask Anything
        </label>
        <textarea
          rows={4}
          {...register("query", { required: "Please type your query" })}
          className="w-full border rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 
          text-gray-900 dark:text-white focus:ring-2 ring-indigo-600 outline-none"
          placeholder="Write your query here..."
        />
        {errors.query?.message && typeof errors.query.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.query.message}</p>
        )}
      </div>

      {/* ----- SUBMIT BUTTON ----- */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white dark:text-black font-semibold 
        py-3 rounded-xl transition-all hover:opacity-90 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 bg-indigo-600 hover:bg-indigo-700 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit Query <MessageCircle className="w-5  h-5" />
          </>
        )}
      </button>

    </form>
  );
}
