"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import projects from "../../public/Categories/projects.jpg";
import presentation from "../../public/Categories/presentation.jpg";
import todolist from "../../public/Categories/todolist.jpg";
import meeting from "../../public/Categories/meeting.jpg";

const creations = [
  {
    title: "🛠️ Projects",
    description: "Explore full-stack applications and technical repositories.",
    href: "/login",
    delay: 0.1,
    image: projects,
  },
  {
    title: "📢 Presentations",
    description: "View slide decks, talks, and technical communication material.",
    href: "/login",
    delay: 0.2,
    image: presentation,
  },
  {
    title: "📅 Meeting Setup",
    description: "Templates and guides for your efficient meeting and documentation.",
    href: "/login",
    delay: 0.3,
    image: meeting,
  },
  {
    title: "✅ To-Do List",
    description: "A high-level view of current development priorities and focus tasks.",
    href: "/login",
    delay: 0.4,
    image: todolist,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i, duration: 1.0, ease: [0.42, 0, 0.58, 1] },
  }),
};

const contentVariants: Variants = {
  initial: { y: 30, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const overlayBgClasses =
  "bg-white/40 backdrop-blur-xl border-t border-white/50 rounded-b-lg";

const Creation = () => {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center px-4 md:px-8">
      <div className="max-w-[1200px] w-full">

        <div className="text-center mb-14 mt-4">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Add Your Projects
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Explore your latest projects, tools, and shared resources for
            collaboration and learning.
          </p>
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {creations.map((creation) => (
            <Link href={creation.href} key={creation.title}>
              <motion.div
                custom={creation.delay}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={cardVariants}
                whileHover="hover"
                className="relative h-full block cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-600 transition-all"
              >

                <motion.div
                  className="relative w-full h-64 sm:h-72 md:h-80 lg:h-64 overflow-hidden rounded-lg"
                  variants={{
                    hover: { scale: 1.05, transition: { duration: 0.5 } },
                    initial: { scale: 1 },
                  }}
                >
                  <Image
                    src={creation.image}
                    alt={creation.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </motion.div>

                
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center bg-white/30 backdrop-blur-md rounded-lg px-6 text-center opacity-0 pointer-events-none"
                  variants={{
                    hover: { opacity: 1, pointerEvents: "auto", transition: { duration: 0.4 } },
                    initial: { opacity: 0, pointerEvents: "none" },
                  }}
                >
                  <CardTitle className="text-gray-900 dark:text-white text-2xl mb-2">
                    {creation.title}
                  </CardTitle>
                  <CardDescription className="text-gray-800 dark:text-gray-200 max-w-xs mb-4">
                    {creation.description}
                  </CardDescription>

                  <Button
                    variant="outline"
                    size="sm"
                    className="font-semibold border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 rounded-lg px-4 py-1.5"
                    onClick={() => router.push('/login')}
                  >
                    See More →
                  </Button>

                </motion.div>


              </motion.div>



            </Link>
          ))}
        </div>

        
        <div className="mt-16 text-center">

          <Button
            size="lg"
            className="bg-white dark:bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white 
            transition-all duration-300 rounded-lg px-4 py-1.5 text-sm"
            onClick={() => router.push('/login')}>
            Let's Explore →
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Creation;
