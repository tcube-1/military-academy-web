"use client";


import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "bg-secondary hover:bg-secondary-hover text-accent-2   relative flex items-center justify-center rounded-sm p-3 transition-colors duration-300",
      )}
      aria-label="Toggle Theme"
    >
      {/* 
        * UI: have to add animation switch type
        */}
        
      <Sun
        className={cn(
          "absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0",
        )}
      />

      <Moon
        className={cn(
          "absolute h-4 w-4 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90",
        )}
      />
    </button>
  );
}
