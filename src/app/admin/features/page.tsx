'use client';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Wrench, Layers } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Rocket size={32} />,
      title: "Advanced Analytics Dashboard",
      desc: "A richer dashboard with user insights, charts, and real-time stats.",
    },
    {
      icon: <Layers size={32} />,
      title: "Multi‑Role Permissions",
      desc: "Granular access controls for Admin, Manager, and Staff roles.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "AI Assistant Tools",
      desc: "Smart suggestions, task automation, and quick‑action prompts.",
    },
  ];

  return (
    <div className="mt-12 min-h-screen w-full px-6 py-12 flex flex-col items-center bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Coming Soon
      </motion.h1>

      <p className="text-gray-600 max-w-xl text-center mb-12">
        We're working behind the scenes to bring powerful new features to your admin workspace.
        These additions are designed to make your journey smoother, faster, and more intuitive.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card className="rounded-2xl shadow hover:shadow-lg transition border border-gray-200 bg-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-primary">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-gray-500 mt-12 text-sm"
      >
        More features are on the way… 
      </motion.p>
    </div>
  );
}
