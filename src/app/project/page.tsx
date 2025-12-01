"use client";

import { PlateEditor } from '@/components/plate-editor';
import { account } from '@/lib/appwrite.config';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';


type Project = { id: string; title: string; html: string; updatedAt: string };

export default function Projects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  //PROTOCTED//
  
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
  
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("projects_v1") || "[]");
    setProjects(list);
  }, []);


  return (
    <>
      <div    
      style={{
          backgroundImage:
            "linear-gradient(rgba(245, 250, 255, 0.96), rgba(225, 240, 255, 0.92))",
        }} className=" mt-10 h-screen w-full pt-20">

     <h1 className="text-2xl text-center font-semibold mb-4">Create New Project</h1>
      <PlateEditor />

      <Toaster />

    </div>    
    </>

  );
}


