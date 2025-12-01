"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  Plate,
  PlateStoreProvider,
  createPlateEditor,
  PlateContainer,
} from "platejs/react";


import BasicNodesPlugin from "@platejs/basic-nodes/react";

import { AiOutlineCloudUpload } from "react-icons/ai";

// Export helpers (your existing functions)
import {
  exportToHtml,
  exportToMarkdown,
  exportToPdf,
  exportToDocx,
} from "@/lib/exporters";

import AIActions from "./AIActions";
import { serializeHtml } from "platejs/static";

// Props
type EditorKitProps = {
  initialValue?: string;
  projectId?: string;
};

export default function EditorKit({
  initialValue = "",
  projectId,
}: EditorKitProps) {
  // Soft theme toggle
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Create editor instance
  const editor = useMemo(
    () =>
      createPlateEditor({
        id: "main-editor",
        plugins: [BasicNodesPlugin as any],
      }) as any,
    []
  );

  // Load saved content
  useEffect(() => {
    if (!initialValue) return;

    editor.reset();
    editor.setValue([{ type: "p", children: [{ text: "" }] }]);
    editor.insertHtml(initialValue);
  }, [initialValue, editor]);

  // Extract title from first text
  const extractTitle = () => {
    const plain = editor.children
      ?.map((node: any) =>
        node.children?.map((c: any) => c.text).join(" ")
      )
      .join(" ")
      .trim();

    return plain || "Untitled";
  };

  // Save locally
    const saveDraft = async () => {
      const html = await serializeHtml(editor);
      const id = projectId ?? `draft-${Date.now()}`;
      const title = extractTitle();
  
      const payload = {
        id,
        title,
        html,
        updatedAt: new Date().toISOString(),
      };
  
      const list = JSON.parse(localStorage.getItem("projects_v1") || "[]");
      const updated = list.filter((p: any) => p.id !== id);
  
      updated.unshift(payload);
      localStorage.setItem("projects_v1", JSON.stringify(updated));
  
      alert("Saved!");
    };

  // Export formats
  const handleExport = async (
    format: "html" | "md" | "pdf" | "docx"
  ) => {
    const html = await serializeHtml(editor);
    const name = `document-${projectId ?? "untitled"}`;

    if (format === "html") exportToHtml(html, `${name}.html`);
    if (format === "md") await exportToMarkdown(editor, `${name}.md`);
    if (format === "pdf") await exportToPdf(html, `${name}.pdf`);
    if (format === "docx") await exportToDocx(html, `${name}.docx`);
  };

  return (
    <div
      className={
        theme === "light"
          ? "bg-white text-slate-900"
          : "bg-slate-900 text-slate-100"
      }
    >
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-semibold">Workspace — Minimal Editor</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
              className="px-3 py-1 text-sm border rounded"
            >
              {theme === "light" ? "Light" : "Dark"}
            </button>

            {/* Exports */}
            <button
              onClick={() => handleExport("html")}
              className="px-3 py-1 border rounded text-sm"
            >
              HTML
            </button>
            <button
              onClick={() => handleExport("md")}
              className="px-3 py-1 border rounded text-sm"
            >
              MD
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="px-3 py-1 border rounded text-sm"
            >
              PDF
            </button>
            <button
              onClick={() => handleExport("docx")}
              className="px-3 py-1 border rounded text-sm"
            >
              DOCX
            </button>

            {/* Save */}
            <button
              onClick={saveDraft}
              className="px-3 py-1 border rounded text-sm flex items-center gap-1"
            >
              <AiOutlineCloudUpload size={16} /> Save
            </button>
          </div>
        </div>

        {/* Editor Box */}
        <div className="border rounded p-4 min-h-[400px] bg-white/50 dark:bg-slate-800/40">
          <PlateStoreProvider editor={editor}>
            <PlateContainer />
          </PlateStoreProvider>
        </div>

        {/* Floating AI menu */}
        <AIActions editor={editor} />
      </div>
    </div>
  );
}
