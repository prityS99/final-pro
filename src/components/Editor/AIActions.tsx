// components/editor/AIActions.tsx
"use client";

import React, { useState } from "react";
import { PlateEditor } from "platejs/react";
import  serializeHtml from "@platejs/ai";

type Props = { editor: PlateEditor };

export default function AIActions({ editor }: Props) {
  const [loading, setLoading] = useState(false);

  const runAI = async (action: "rewrite" | "summarize" | "expand" | "fix" | "translate") => {
    try {
      setLoading(true);
      const html = (serializeHtml as any)(editor);
      const payload = { action, html, lang: action === "translate" ? "en" : undefined };

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.resultHtml) {
        // For demo: replace entire editor content with result HTML.
        // Plate provides editor.api.html.deserialize to set content
        await editor.api.html.deserialize(data.resultHtml);
      } else {
        alert("No result returned from AI.");
      }
    } catch (err) {
      console.error(err);
      alert("AI call failed — check console and server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-6 bottom-8 z-40">
      <div className="bg-white/95 border rounded-lg shadow p-2 flex flex-col gap-2 w-44">
        <button onClick={() => runAI("rewrite")} disabled={loading} className="text-left px-2 py-1 hover:bg-slate-100 rounded">
          Rewrite
        </button>
        <button onClick={() => runAI("summarize")} disabled={loading} className="text-left px-2 py-1 hover:bg-slate-100 rounded">
          Summarize
        </button>
        <button onClick={() => runAI("expand")} disabled={loading} className="text-left px-2 py-1 hover:bg-slate-100 rounded">
          Expand
        </button>
        <button onClick={() => runAI("fix")} disabled={loading} className="text-left px-2 py-1 hover:bg-slate-100 rounded">
          Fix grammar
        </button>
        <button onClick={() => runAI("translate")} disabled={loading} className="text-left px-2 py-1 hover:bg-slate-100 rounded">
          Translate
        </button>
      </div>
    </div>
  );
}
