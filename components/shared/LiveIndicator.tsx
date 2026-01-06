"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({ size = "md", className }) => {
  const dotSize = "h-2 w-2"; // 8px for both mobile and desktop as per design.json
  const mobileTextSize = "text-[12px]"; // 12px
  const desktopTextSize = "lg:text-[14px]"; // 14px
  const mobilePadding = "px-3 py-1"; // 4px 12px
  const desktopPadding = "lg:px-4 lg:py-[6px]"; // 6px 16px

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full uppercase font-bold tracking-wider",
        "bg-red-100 text-red-600", // #FEE2E2 background, #EF4444 text
        mobilePadding,
        mobileTextSize,
        desktopPadding,
        desktopTextSize,
        className
      )}
    >
      <span className={cn(dotSize, "relative flex h-2 w-2")}>
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75 animate-pulse" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
      </span>
      LIVE
    </span>
  );
};
