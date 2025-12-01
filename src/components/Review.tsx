"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { FiStar } from "react-icons/fi";

export default function ReviewSection() {
  const reviews = [
    {
      name: "Aisha Verma",
      role: "Product Designer",
        rating: 4.2,
      review:
        "This workspace completely changed how I organize my projects. Clean, fast, and beautifully designed — love using it every day!",
      image: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Rohit Sharma",
      role: "Frontend Developer",
      rating: 4,
      review:
        "Feels modern yet reliable. The collaboration features helped my team stay synced without any chaos.",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Meera Kapoor",
      role: "Content Strategist",
      rating: 4.5,
      review:
        "Export options and clean writing space make it perfect for documentation. Highly recommended!",
      image: "https://i.pravatar.cc/150?img=33",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4500);
    return () => clearInterval(autoplay);
  }, [emblaApi]);
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl sm:text-4xl font-extrabold text-slate-900 mb-10"
        >
          What people are saying
        </motion.h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {reviews.map((r, i) => (
              <div key={i} className="flex-[0_0_100%] p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 rounded-2xl p-8 shadow-md max-w-3xl mx-auto"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="h-20 w-20 rounded-full object-cover shadow"
                    />

                      <div className="text-indigo-600 text-xl font-bold">
                      {r.rating}/5
                    </div>

                    <p className="text-slate-700 text-lg leading-relaxed max-w-xl">
                      {r.review}
                    </p>

                    <div>
                      <div className="text-slate-900 font-semibold text-base">{r.name}</div>
                      <div className="text-slate-500 text-sm">{r.role}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
