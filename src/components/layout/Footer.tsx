import { Link } from "react-router";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WrapperContainer } from "@/lib/WrapperContainer";

const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-emerald-500/20 overflow-hidden">
      {/* Background orbs - matching banner style */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full blur-3xl opacity-4 dark:opacity-6 animate-pulse"></div>
      <div className="absolute -top-10 right-1/3 w-48 h-48 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-3 dark:opacity-5 animate-pulse delay-1000"></div>
      <div className="absolute bottom-0 left-1/2 w-56 h-56 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full blur-3xl opacity-3 dark:opacity-5 animate-pulse delay-2000"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>

      <div className="relative z-10 py-12">
        <WrapperContainer>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                  LibraryHub
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your modern digital library management system. Discover, borrow,
                and manage books effortlessly.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/books"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Browse Books
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-book"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Add New Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="/borrow-summary"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Borrow Summary
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Categories
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/books?filter=FICTION"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Fiction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books?filter=SCIENCE"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Science
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books?filter=HISTORY"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/books?filter=FANTASY"
                    className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors duration-200"
                  >
                    Fantasy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Connect</h3>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-200"
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-200"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-200"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Built with React, TypeScript, and shadcn/ui
              </p>
            </div>
          </div>

          {/* Bottom section with glassmorphism effect */}
          <div className="mt-8 pt-8 border-t border-emerald-500/20 text-center">
            <div className="backdrop-blur-sm bg-card/30 rounded-lg p-4 border border-emerald-500/10">
              <p className="text-sm text-muted-foreground font-mono">
                © 2025 LibraryHub. All rights reserved. Built for educational
                purposes.
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                Trusted by readers and librarians worldwide
              </p>
            </div>
          </div>
        </WrapperContainer>
      </div>

      {/* Decorative elements*/}
      <div className="absolute bottom-0 left-8 w-1 h-16 bg-gradient-to-t from-emerald-400 to-transparent opacity-40"></div>
      <div className="absolute bottom-0 right-8 w-1 h-16 bg-gradient-to-t from-green-500 to-transparent opacity-40"></div>
    </footer>
  );
};

export default Footer;
