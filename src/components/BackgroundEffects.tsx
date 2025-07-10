import React from "react";

interface BackgroundEffectsProps {
  children: React.ReactNode;
  variant?: "default" | "alt";
}

export function BackgroundEffects({ children, variant = "default" }: BackgroundEffectsProps) {
  // Different positioning variants to avoid identical layouts
  const orbPositions = {
    default: {
      orb1: "top-0 right-1/4",
      orb2: "top-32 left-1/3", 
      orb3: "bottom-20 right-1/2",
      decorLeft: "top-1/4 left-8",
      decorRight: "top-1/4 right-8"
    },
    alt: {
      orb1: "top-0 left-1/4",
      orb2: "top-20 right-1/3",
      orb3: "bottom-0 left-1/2",
      decorLeft: "top-1/3 left-8",
      decorRight: "top-1/3 right-8"
    }
  };

  const positions = orbPositions[variant];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background orbs */}
      <div className={`absolute ${positions.orb1} w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl opacity-4 dark:opacity-6 animate-pulse`}></div>
      <div className={`absolute ${positions.orb2} w-80 h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-3 dark:opacity-5 animate-pulse delay-1000`}></div>
      <div className={`absolute ${positions.orb3} w-72 h-72 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full blur-3xl opacity-3 dark:opacity-5 animate-pulse delay-2000`}></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4">
        {children}
      </div>

      {/* Decorative elements */}
      <div className={`absolute ${positions.decorLeft} w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent opacity-40`}></div>
      <div className={`absolute ${positions.decorRight} w-1 h-20 bg-gradient-to-b from-green-500 to-transparent opacity-40`}></div>
    </section>
  );
}