// lib/exporters.ts
export const exportToHtml = (html: string, filename = "document.html") => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToMarkdown = async (editor: any, filename = "document.md") => {
  // If you use @platejs/markdown you may have a serializer. For demo: fallback to HTML -> plain markdown using a minimal approach.
  const html = editor ? (window as any).serializeHtml?.(editor) : "<p></p>";
  // naive conversion: strip tags (not great). Replace with turndown or dedicated serializer.
  const md = html.replace(/<\/?[^>]+(>|$)/g, "");
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToPdf = async (html: string, filename = "document.pdf") => {
  // Quick approach: open printable page in new tab and let user print -> Save as PDF.
  const w = window.open();
  if (!w) return;
  w.document.write(html);
  w.document.close();
  // User prints manually, or you can use html2canvas + pdf-lib to create PDF programmatically.
};

export const exportToDocx = async (html: string, filename = "document.docx") => {
  // Quick approach: wrap as .docx by sending HTML with right MIME — many word processors accept .docx renamed HTML.
  const blob = new Blob([html], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
