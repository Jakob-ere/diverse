import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

export default function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("container py-12 sm:py-16", className)}>{children}</section>;
}
