import { useParams, useNavigate } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Heart } from "lucide-react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookByIdQuery(id as string);

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  
  if (error || !data?.data) {
    return (
      <div className="text-center mt-8 text-red-500">
        Book not found!
        <div className="mt-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Library
      </Button>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <img
            src={book.image || "https://via.placeholder.com/400x600/e5e7eb/6b7280?text=No+Image+Available"}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x600/e5e7eb/6b7280?text=No+Image+Available";
            }}
          />
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{book.title}</CardTitle>
              <p className="text-lg text-muted-foreground">{book.author}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Book Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Genre:</span>
                  <Badge variant="secondary" className="ml-2">
                    {book.genre}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">ISBN:</span>
                  <span className="ml-2 text-muted-foreground">{book.isbn}</span>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="ml-2 text-muted-foreground">${book.price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="font-medium">Copies:</span>
                  <span className="ml-2 text-muted-foreground">{book.copies}</span>
                </div>
              </div>

              <Separator />

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={book.copies > 0 ? "default" : "destructive"}
                  className={book.copies > 0 ? "bg-green-600" : ""}
                >
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </Badge>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => alert("Borrow logic coming soon!")}
                  disabled={book.copies <= 0}
                  className="flex-1"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {book.copies > 0 ? "Borrow Book" : "Unavailable"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => alert("Add to favorites functionality coming soon!")}
                  className="flex-1"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}