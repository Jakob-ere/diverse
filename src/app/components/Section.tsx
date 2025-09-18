import type { PropsWithChildren } from "react";
import clsx from "clsx";

export default function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={clsx("container py-10 sm:py-12", className)}>{children}</section>;
}
