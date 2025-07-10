import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { BookCard } from "./BookCard";
import { BookSkeleton } from "./BookSkeleton";
import type { IBook } from "@/types";
import { BackgroundEffects } from "../BackgroundEffects";

interface BookCategoriesProps {
  categories: { value: IBook["genre"]; label: string }[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  filteredBooks: IBook[];
  isLoading: boolean;
  error: unknown;
}

export function BookCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
  filteredBooks,
  isLoading,
  error,
}: BookCategoriesProps) {
  return (
    <BackgroundEffects  variant="alt">
      <div className="text-center mb-12">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10 hover:bg-emerald-500/30 dark:hover:bg-emerald-500/20 transition-colors"
        >
          📚 Organized Collections
        </Badge>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Browse by{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
            Category
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Explore books organized by your favorite subjects and discover new genres
        </p>
      </div>

      <Tabs
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        {/* Enhanced TabsList with glassmorphism */}
        <div className="flex justify-center mb-12">
          <TabsList className="inline-flex w-auto bg-card/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-2 shadow-lg">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:shadow-md hover:bg-emerald-500/10 text-muted-foreground data-[state=active]:text-white whitespace-nowrap"
              >
                <span className="text-sm">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="mt-8">
            {/* Category header with glassmorphism */}
            <div className="text-center mb-8">
              <div className="backdrop-blur-sm bg-card/30 rounded-xl p-6 border border-emerald-500/10 max-w-md mx-auto">
                <h3 className="text-2xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">
                  {category.label}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {filteredBooks.length}{" "}
                  {filteredBooks.length === 1 ? "book" : "books"} available
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(12)].map((_, index) => (
                  <BookSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="backdrop-blur-sm bg-card/50 rounded-xl p-8 border border-red-500/20 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
                    Error loading books
                  </h3>
                  <p className="text-muted-foreground">
                    Please try again later or check your connection
                  </p>
                </div>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-16">
                <div className="backdrop-blur-sm bg-card/50 rounded-xl p-8 border border-emerald-500/10 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-green-200 dark:from-emerald-900 dark:to-green-800 rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600 dark:text-emerald-400">
                    No books found
                  </h3>
                  <p className="text-muted-foreground">
                    No books available in this category yet. Check back soon!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-16">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
      </div>
    </BackgroundEffects>
  );
}
