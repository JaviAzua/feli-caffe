"use client";

import { cn } from "@/lib/utils";

interface TextProps {
  /**
   * Text to display
   */
  text: string;
  className?: string;
}

export default function TextBorderAnimation({
  text = "Programming",
  className,
}: TextProps) {
  return (
    <div className="overflow-hidden">
      <span
        className={cn(
          "text-5xl font-light text-white md:text-foreground group-hover:text-white",
          className
        )}
      >
        {text}
      </span>
      <div className="relative mt-1 h-1 w-full">
        {/* Line that slides in on group hover */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full -translate-x-full transform bg-white opacity-0 transition-transform duration-300",
            "group-hover:translate-x-0 group-hover:opacity-100"
          )}
        ></div>

        {/* Line that slides out when group hover ends */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full translate-x-0 transform bg-white opacity-0 transition-transform duration-300 delay-0",
            "group-hover:opacity-0",
            "group-hover:delay-300",
            "group-active:opacity-0",
            "group-[:not(:hover)]:translate-x-full group-[:not(:hover)]:opacity-100 group-[:not(:hover)]:delay-0"
          )}
        ></div>
      </div>
    </div>
  );
}
