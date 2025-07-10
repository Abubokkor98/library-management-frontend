import { useParams, useNavigate } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/booksApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Heart } from "lucide-react";
import BorrowBookModal from "@/components/BorrowBookModal";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetBookByIdQuery(id as string);

  if (isLoading) return <Loader />;

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
        className="mb-6 text-emerald-600 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Library
      </Button>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-md border border-emerald-500/20"
          />
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <Card className="bg-card/50 border border-emerald-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-emerald-600">
                {book.title}
              </CardTitle>
              <p className="text-lg text-muted-foreground">{book.author}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Book Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Genre:</span>
                  <Badge className="ml-2 bg-emerald-500/20 text-emerald-700 border border-emerald-500/30">
                    {book.genre}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">ISBN:</span>
                  <span className="ml-2 text-muted-foreground">
                    {book.isbn}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Price:</span>
                  <span className="ml-2 text-muted-foreground">
                    ${book.price.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Copies:</span>
                  <span className="ml-2 text-muted-foreground">
                    {book.copies}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge
                  className={
                    book.copies > 0
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </Badge>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-medium mb-2 text-emerald-600">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <BorrowBookModal book={book}>
                  <Button
                    disabled={book.copies <= 0}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold transition-all"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {book.copies > 0 ? "Borrow Book" : "Unavailable"}
                  </Button>
                </BorrowBookModal>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.info("Add to favorites functionality coming soon!")
                  }
                  className="flex-1 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
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
