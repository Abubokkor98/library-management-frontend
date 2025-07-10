import { useNavigate } from "react-router";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";

export function BookCard({ book }: { book: IBook }) {
  const navigate = useNavigate();

  return (
    <Card className="group relative h-full transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:scale-105 overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <div className="aspect-[2/3] relative mb-3 overflow-hidden rounded-lg shadow-md">
          <img
            src={book.image || "/api/placeholder/150/225"}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Availability badge */}
          <Badge
            className={`absolute top-2 right-2 text-xs px-2 py-1 font-medium shadow-lg ${
              book.available 
                ? "bg-emerald-500 text-white border-emerald-400 hover:bg-emerald-600" 
                : "bg-gray-500 text-white border-gray-400"
            }`}
          >
            {book.available ? "Available" : "Out of Stock"}
          </Badge>
        </div>
        
        <CardTitle className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {book.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground font-medium">
          by {book.author}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 pb-2 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <Badge 
            variant="outline" 
            className="text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
          >
            {book.genre}
          </Badge>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            ${book.price}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 relative z-10">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-muted-foreground font-medium">
            {book.copies} copies
          </span>
          <Button
            size="sm"
            onClick={() => navigate(`/books/${book._id}`)}
            className="text-xs h-8 px-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}