import type { IBook } from "@/types";
import { BookCard } from "./BookCard";
import { BookSkeleton } from "./BookSkeleton";
import { Badge } from "@/components/ui/badge";
import { BackgroundEffects } from "../BackgroundEffects";

export function FeaturedBooks({
  books,
  isLoading,
}: {
  books: IBook[];
  isLoading: boolean;
}) {
  return (
    <BackgroundEffects>
      <div className="text-center mb-12">
        {/* Badge */}
        <Badge
          variant="outline"
          className="mb-6 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10 hover:bg-emerald-500/30 dark:hover:bg-emerald-500/20 transition-colors"
        >
          ✨ Handpicked Collection
        </Badge>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Featured{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
            Books
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover the latest additions to our collection and explore trending titles
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(8)].map((_, index) => <BookSkeleton key={index} />)
          : books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-12">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
      </div>
    </BackgroundEffects>
  );
}