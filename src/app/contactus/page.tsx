"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contactus() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 2600);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="mt-14 min-h-screen py-14 px-4 bg-cover bg-fixed bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(245, 250, 255, 0.96), rgba(225, 240, 255, 0.92))",
      }}
    >
      <div className="max-w-5xl mx-auto">

        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-black">
            Contact Our Workspace Team
          </h1>
                <p className="mt-4 text-black-600 sm:text-lg md:text-xl max-w-xl mx-auto">
           Please contact us without any hesitations
          </p>
        </motion.div>

        
        <div className="relative w-full min-h-screen flex items-center justify-center"
          style={{

            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>



          
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="
      bg-white/25 
      backdrop-blur-xl 
      border 
      border-white/40 
      shadow-xl 
      p-10 
      rounded-2xl 
      w-full 
      max-w-xl
    "
          >
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center flex-1"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4"
                  >
                    <span className="text-white text-4xl">✓</span>
                  </motion.div>

                  <p className="text-2xl text-green-600 font-bold">Message Sent</p>
                  <p className="text-gray-700 mt-2">We’ll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 flex flex-col justify-center"
              >
                
                <motion.div variants={item} className="mb-6">
                  <label className="block mb-1 font-semibold text-gray-800">
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-500 text-lg" />
                    <input
                      {...register("name", { required: true })}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white/60"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">Name is required</p>
                  )}
                </motion.div>

                
                <motion.div variants={item} className="mb-6">
                  <label className="block mb-1 font-semibold text-gray-800">
                    Your Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-500 text-lg" />
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white/60"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">Email is required</p>
                  )}
                </motion.div>


                <motion.div variants={item} className="mb-6">
                  <label className="block mb-1 font-semibold text-gray-800">
                    Your Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-500 text-lg" />
                    <textarea
                      rows={5}
                      {...register("message", { required: true })}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white/60"
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">Message is required</p>
                  )}
                </motion.div>

                
                <motion.div variants={item}>
                  <button
                    type="submit"
                    className="w-full py-3 font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white
                    transition-all duration-300 rounded-lg px-4 py-1.5 text-sm rounded-lg text-lg"
                  >
                    Send Message
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </div>

        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 rounded-2xl shadow-xl overflow-hidden h-[450px] border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
