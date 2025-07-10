"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card} from "@/components/ui/card";

export function Banner({ totalBooks }: { totalBooks: number }) {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl opacity-8 dark:opacity-12 animate-pulse"></div>
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-6 dark:opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full blur-3xl opacity-7 dark:opacity-10 animate-pulse delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mb-6 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10 hover:bg-emerald-500/30 dark:hover:bg-emerald-500/20 transition-colors"
          >
            ✨ New: Advanced Search & AI Recommendations
          </Badge>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              LibraryHub
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Discover your next favorite book from our carefully curated
            collection
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Badge
              variant="secondary"
              className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/20"
            >
              50,000+ Books
            </Badge>
            <Badge
              variant="secondary"
              className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/20"
            >
              Digital & Physical
            </Badge>
            <Badge
              variant="secondary"
              className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/20"
            >
              Smart Recommendations
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Browse Books
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              Join Today
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm p-6 hover:bg-card/80 transition-all duration-300">
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                {totalBooks}
              </div>
              <div className="text-sm text-muted-foreground">Total Books</div>
            </Card>
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm p-6 hover:bg-card/80 transition-all duration-300">
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                1,234
              </div>
              <div className="text-sm text-muted-foreground">
                Active Members
              </div>
            </Card>
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm p-6 hover:bg-card/80 transition-all duration-300">
              <div className="text-2xl font-bold text-emerald-400 mb-2">
                567
              </div>
              <div className="text-sm text-muted-foreground">
                Books Borrowed
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-muted-foreground text-sm font-mono">
            Trusted by readers and librarians worldwide
          </p>
        </div>
      </div>

      {/* Overlay and Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60"></div>
      <div className="absolute top-1/2 left-8 w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent opacity-40 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-8 w-1 h-20 bg-gradient-to-b from-green-500 to-transparent opacity-40 transform -translate-y-1/2"></div>
    </div>
  );
}
