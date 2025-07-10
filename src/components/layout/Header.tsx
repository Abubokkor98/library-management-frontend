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

const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Books", href: "/books", icon: BookOpen },
    { name: "Add Book", href: "/create-book", icon: Plus },
    { name: "Borrow Summary", href: "/borrow-summary", icon: BarChart3 },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm">
           <WrapperContainer>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
              LibraryHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "flex items-center gap-2",
                          isActiveRoute(item.href) &&
                            "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
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

            {/* Desktop Mode Toggle */}
            <ModeToggle />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 mt-6">
                {/* Mobile Logo */}
                <Link to="/" className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    LibraryHub
                  </span>
                </Link>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300",
                      isActiveRoute(item.href) &&
                        "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}

                <div className="mt-6 pt-4 border-t">
                  <ModeToggle />
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
