"use client";

import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export default function Dashboard({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href}>
      <div
     
        className="
          group fade-in
          relative
          p-[2px]
          rounded-2xl
          bg-gradient-to-br from-blue-400/40 via-purple-400/40 to-pink-400/40
          animate-[glowBorder_6s_ease-in-out_infinite]
          transition-all cursor-pointer
        "
      >
       
        <div
          className="
            p-7
            bg-white/40 backdrop-blur-xl
            border border-white/20
            rounded-2xl shadow-sm
            transition-all duration-500
            group-hover:shadow-2xl
            group-hover:-translate-y-1
            hover:[transform:rotateX(6deg)_rotateY(-6deg)]
          "
        >

          {/* INNER CONTENT */}
          <div
            className="
              p-8 rounded-2xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              transition-all duration-450
              hover:bg-white/20 hover:scale-[1.03]
              shadow-xl shadow-black/10
            "
          >
            <div className="text-gray-700 group-hover:text-blue-500 transition">
              {icon}
            </div>

            <h2 className="text-2xl font-semibold mt-4 mb-2 group-hover:text-blue-700 transition">
              {title}
            </h2>

            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition">
              {description}
            </p>
          </div>
        </div>

        {/* OUTER HOVER GLOW */}
        <div
          className="
            absolute inset-0 rounded-2xl
            group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
            transition pointer-events-none
          "
        ></div>
      </div>
    </Link>
  );
}
