// pages/api/ai.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  action?: string;
  html?: string;
  lang?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const body: Body = req.body;
  const { action, html, lang } = body;

  if (!process.env.OPEN_AI_API_KEY) {
    return res.status(500).json({ error: "OPEN_AI_API_KEY not configured on server." });
  }

  // A simple prompt mapping. You can expand and tune this.
  let prompt = `You are a helpful editor. Perform the action: ${action}\n\nHTML CONTENT:\n${html}\n\nReturn only HTML for the edited document.`;

  if (action === "summarize") {
    prompt = `Summarize the content into a short paragraph, keep as HTML <p>...</p>. HTML CONTENT:\n${html}`;
  } else if (action === "translate") {
    prompt = `Translate the content to ${lang || "en"} and return only HTML. CONTENT:\n${html}`;
  } else if (action === "fix") {
    prompt = `Fix grammar and spelling. Preserve HTML structure. CONTENT:\n${html}`;
  } else if (action === "expand") {
    prompt = `Expand the content with more detail while keeping tone neutral. Return HTML only. CONTENT:\n${html}`;
  } else if (action === "rewrite") {
    prompt = `Rewrite the content to be clearer and more concise. Return HTML only.`;
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // choose appropriate model you have access to
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 1500,
      }),
    });

    const data = await openaiRes.json();
    const text = data?.choices?.[0]?.message?.content ?? "";

    // naive: return the text as HTML. In production sanitize this!
    return res.status(200).json({ resultHtml: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI call failed" });
  }
}
