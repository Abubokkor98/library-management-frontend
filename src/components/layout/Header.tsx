import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Menu, Plus, BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { WrapperContainer } from "@/lib/WrapperContainer";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Books", href: "/books", icon: BookOpen },
    { name: "Add Book", href: "/create-book", icon: Plus },
    { name: "Borrow Summary", href: "/borrow-summary", icon: BarChart3 },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-200/30 dark:border-emerald-800/30 bg-background/80 backdrop-blur-xl shadow-lg">
      <WrapperContainer>
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              LibraryHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md",
                          isActiveRoute(item.href)
                            ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-600/50 shadow-md"
                            : "hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Enhanced Mode Toggle */}
            <div className="ml-2 p-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/30 dark:border-emerald-600/30">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 hover:scale-105 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-emerald-200/30 dark:border-emerald-800/30"
            >
              <div className="flex flex-col gap-6 mt-6">
                {/* Mobile Logo */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex items-center space-x-3 group"
                    onClick={handleLinkClick}
                  >
                    <div className="relative">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                      LibraryHub
                    </span>
                  </Link>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md",
                        isActiveRoute(item.href)
                          ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-600/50 shadow-md"
                          : "hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 border border-transparent hover:border-emerald-300/30 dark:hover:border-emerald-600/30"
                      )}
                    >
                      <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20">
                        <item.icon className="h-5 w-5" />
                      </div>
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Mode Toggle */}
                <div className="mt-6 pt-6 border-t border-emerald-200/30 dark:border-emerald-800/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Theme
                    </span>
                    <div className="p-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-300/30 dark:border-emerald-600/30">
                      <ModeToggle />
                    </div>
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="mt-auto pt-6 border-t border-emerald-200/30 dark:border-emerald-800/30">
                  <p className="text-xs text-muted-foreground text-center font-mono">
                    Trusted by readers worldwide
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </WrapperContainer>
    </header>
  );
};

export default Header;
