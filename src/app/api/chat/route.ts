export const runtime = "edge";

type Out = { reply: string };
interface GroqChatCompletion {
  choices?: Array<{ message?: { content?: string } }>;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { message } = (await req.json()) as { message?: string };
    const user = (message ?? "").trim();
    if (!user) return Response.json({ reply: "Say something first." } satisfies Out, { status: 400 });

    const key = process.env.GROQ_API_KEY;
    if (!key) {
      const reply = user.endsWith("?")
        ? "Great question! Add GROQ_API_KEY to get real answers."
        : `You said: "${user}". Configure GROQ for a real model reply.`;
      return Response.json({ reply } satisfies Out);
    }

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a concise, helpful assistant." },
          { role: "user", content: user },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      return Response.json({ reply: `Upstream error ${r.status}: ${text}` } satisfies Out, { status: 502 });
    }

    const data = (await r.json()) as unknown as GroqChatCompletion;
    const reply = data?.choices?.[0]?.message?.content ?? "No reply.";
    return Response.json({ reply } satisfies Out);
  } catch {
    return Response.json({ reply: "Server error." } satisfies Out, { status: 500 });
  }
}
