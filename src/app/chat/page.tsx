"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Messages are handled by <code>/api/chat</code>.
          </p>
        </header>

        <div className="rounded-2xl border p-4 dark:border-neutral-800">
          <div className="mb-4 h-[52vh] overflow-y-auto rounded-xl bg-white p-3 dark:bg-neutral-950">
            <ul className="space-y-3">
              {messages.map((m, i) => (
                <li
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-2xl bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
                      : "mr-auto max-w-[85%] rounded-2xl bg-neutral-100 px-4 py-2 dark:bg-neutral-900"
                  }
                >
                  {m.content}
                </li>
              ))}
            </ul>
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a message…"
              className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 dark:border-neutral-800"
            />
            <button
              onClick={send}
              disabled={busy}
              className="rounded-xl bg-black px-4 py-2 font-medium text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}