"use client";

import { useReducer, useEffect } from "react";

type Op = "+" | "-" | "×" | "÷" | null;
type State = { display: string; operand: number | null; op: Op; overwrite: boolean };
type Act =
  | { type: "digit"; ch: string }
  | { type: "dot" }
  | { type: "op"; op: Exclude<Op, null> }
  | { type: "eq" }
  | { type: "clear" };
 
const initial: State = { display: "0", operand: null, op: null, overwrite: true };

const parse = (s: string) => (s === "." ? 0 : Number(s));
const fmt = (n: number) =>
  !Number.isFinite(n) ? "Error" : (n.toString().length <= 12 ? n.toString() : n.toPrecision(12).replace(/\.?0+$/,""));
const calc = (a: number, b: number, op: Exclude<Op, null>) =>
  op === "+" ? a + b : op === "-" ? a - b : op === "×" ? a * b : (b === 0 ? NaN : a / b);

function reducer(s: State, a: Act): State {
  switch (a.type) {
    case "digit":
      return s.overwrite
        ? { ...s, display: a.ch, overwrite: false }
        : { ...s, display: s.display === "0" ? a.ch : s.display + a.ch };
    case "dot":
      return s.overwrite
        ? { ...s, display: "0.", overwrite: false }
        : s.display.includes(".")
        ? s
        : { ...s, display: s.display + "." };
    case "clear":
      return initial;
    case "op": {
      if (s.op && !s.overwrite && s.operand !== null) {
        const res = calc(s.operand, parse(s.display), s.op);
        return { display: fmt(res), operand: Number.isFinite(res) ? res : null, op: a.op, overwrite: true };
      }
      return { ...s, operand: parse(s.display), op: a.op, overwrite: true };
    }
    case "eq": {
      if (s.op === null || s.operand === null) return s;
      const res = calc(s.operand, parse(s.display), s.op);
      return { display: fmt(res), operand: Number.isFinite(res) ? res : null, op: null, overwrite: true };
    }
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initial);

  // minimal keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (/^\d$/.test(k)) return void (dispatch({ type: "digit", ch: k }), e.preventDefault());
      if (k === "." || k === ",") return void (dispatch({ type: "dot" }), e.preventDefault());
      if (k === "+") return void (dispatch({ type: "op", op: "+" }), e.preventDefault());
      if (k === "-") return void (dispatch({ type: "op", op: "-" }), e.preventDefault());
      if (k === "*") return void (dispatch({ type: "op", op: "×" }), e.preventDefault());
      if (k === "/") return void (dispatch({ type: "op", op: "÷" }), e.preventDefault());
      if (k === "Enter" || k === "=") return void (dispatch({ type: "eq" }), e.preventDefault());
      if (k === "Escape") return void (dispatch({ type: "clear" }), e.preventDefault());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Btn = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className={`rounded-xl px-4 py-3 text-lg font-medium transition active:scale-[0.98]
      bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 ${props.className ?? ""}`}
    />
  );

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 rounded-xl bg-white px-4 py-6 text-right text-4xl font-semibold tracking-tight dark:bg-neutral-950">
        {state.display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Btn onClick={() => dispatch({ type: "clear" })} className="bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50">AC</Btn>
        <span />
        <span />
        <Btn onClick={() => dispatch({ type: "op", op: "÷" })} className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700">÷</Btn>

        <Btn onClick={() => dispatch({ type: "digit", ch: "7" })}>7</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "8" })}>8</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "9" })}>9</Btn>
        <Btn onClick={() => dispatch({ type: "op", op: "×" })} className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700">×</Btn>

        <Btn onClick={() => dispatch({ type: "digit", ch: "4" })}>4</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "5" })}>5</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "6" })}>6</Btn>
        <Btn onClick={() => dispatch({ type: "op", op: "-" })} className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700">−</Btn>

        <Btn onClick={() => dispatch({ type: "digit", ch: "1" })}>1</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "2" })}>2</Btn>
        <Btn onClick={() => dispatch({ type: "digit", ch: "3" })}>3</Btn>
        <Btn onClick={() => dispatch({ type: "op", op: "+" })} className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700">+</Btn>

        <Btn onClick={() => dispatch({ type: "digit", ch: "0" })} className="col-span-2">0</Btn>
        <Btn onClick={() => dispatch({ type: "dot" })}>.</Btn>
        <Btn onClick={() => dispatch({ type: "eq" })} className="bg-black text-white hover:opacity-90 dark:bg-white dark:text-black">=</Btn>
      </div>
    </div>
  );
}
