"use client";

import DashboardCard from "@/components/DashboardCard";
import { account } from "@/lib/appwrite.config";
import {
  FolderPlus,
  Users,
  Video,
  ListTodo,
  CalendarDays,
  Palette,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

const router = useRouter();
    useEffect(() => {
      async function checkSession() {
        try {
          await account.get(); 
        } catch {
          router.push("/login"); 
        }
      }
      checkSession();
    }, [router]);
    
    // useEffect(() => {
    //   const list = JSON.parse(localStorage.getItem("projects_v1") || "[]");
    //   setProjects(list);
    // }, []);

  const cards = [
    {
      title: "New Project",
      description:
        "Start shaping fresh ideas with PlateJS — your workshop for creation.",
      href: "/project",
      icon: <FolderPlus className="h-14 w-14" />,
    },
    {
      title: "Collaboration Work",
      description:
        "Step into a shared space where minds connect and build together.",
      href: "/collaboration",
      icon: <Users className="h-14 w-14" />,
    },
    {
      title: "Meeting Setup",
      description:
        "Plan your discussions, organize your thoughts, and stay aligned.",
      href: "/meetings",
      icon: <Video className="h-14 w-14" />,
    },
    {
      title: "To-Do List",
      description:
        "A clear path forward — track each task with quiet focus.",
      href: "/todolist",
      icon: <ListTodo className="h-14 w-14" />,
    },
    {
      title: "Calendar",
      description:
        "Set your schedule, and prepare with purpose and motivation.",
      href: "/calendar",
      icon: <CalendarDays className="h-14 w-14" />,
    },
    {
      title: "Themes",
      description:
        "Shape your workspace ambience — colors, glass.. all your way.",
      href: "/themes",
      icon: <Palette className="h-14 w-14" />,
    },
  ];

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(245, 250, 255, 0.96), rgba(225, 240, 255, 0.92))",
      }}
      className="mt-18 px-6 py-12 lg:px-16 fade-in"
    > <div className="max-w-[1200px] mx-auto"> <div className="mb-12"> <h1 className="text-4xl text-center lg:text-5xl font-bold tracking-tight">
      Workspace Dashboard </h1> <p className="text-black-600 text-center text-lg mt-2">
        Everything you need — organized, elegant, and ready for your touch. </p> </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {cards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>


  );
}


