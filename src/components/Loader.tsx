"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../public/Logo/logo.svg";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image src={logo} alt="Loading..." width={140} height={140} />
      </motion.div>
    </div>
  );
};

export default Loader;
