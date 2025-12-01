
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import EditorAI from "@/components/EditorAI";

// const EditorAIComponent = EditorAI as unknown as React.ComponentType<{ initialValue?: string | undefined; projectId: string }>;

// export default function ProjectEditorPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [initialHtml, setInitialHtml] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     if (!id) return;

//     const list = JSON.parse(localStorage.getItem("projects_v1") || "[]");
//     const found = list.find((p: any) => p.id === id);

//     setInitialHtml(found?.html || "");
//   }, [id]);

//   if (!id) return null; // wait until router is ready
//   return <EditorAIComponent initialValue={initialHtml} projectId={id as string} />;
// }

import React from 'react'

const IdBase = () =>{
  return (
    <div>page</div>
  )
}

export default IdBase