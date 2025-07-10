import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { WrapperContainer } from "@/lib/WrapperContainer";

interface BorrowedBook {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
    image: string;
    price: number;
  };
}

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery({});

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-12" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-card/50 border-red-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-center text-red-500">
              Error loading borrow summary. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const borrowedBooks: BorrowedBook[] = data?.data || [];
  const totalBooks = borrowedBooks.reduce(
    (sum, item) => sum + item.totalQuantity,
    0
  );
  const totalValue = borrowedBooks.reduce(
    (sum, item) => sum + item.totalQuantity * item.book.price,
    0
  );

  return (
    <WrapperContainer>
      <BackgroundEffects>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10"
            >
              📚 Your Library Dashboard
            </Badge>
            <h1 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
                Borrow Summary
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Overview of your borrowed books and reading progress
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Books</div>
                    <div className="text-3xl font-bold text-emerald-400">{totalBooks}</div>
                  </div>
                  <div className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Unique Titles</div>
                    <div className="text-3xl font-bold text-emerald-400">
                      {borrowedBooks.length}
                    </div>
                  </div>
                  <div className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                    <div className="text-3xl font-bold text-emerald-400">
                      ${totalValue.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12 8c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm0 2c2.21 0 4 1.79 4 4v6H8v-6c0-2.21 1.79-4 4-4z" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Books Table */}
          <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm">
            <CardHeader className="border-b border-emerald-500/20">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <span className="text-emerald-400">📖</span>
                Borrowed Books
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {borrowedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-emerald-400 opacity-40 mb-4">📚</div>
                  <p className="text-lg text-muted-foreground font-light">
                    No borrowed books found
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start exploring our collection to borrow your first book!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-500/20">
                        <TableHead className="text-emerald-400 font-semibold">Book</TableHead>
                        <TableHead className="text-emerald-400 font-semibold">ISBN</TableHead>
                        <TableHead className="text-emerald-400 font-semibold">Quantity</TableHead>
                        <TableHead className="text-emerald-400 font-semibold">Price</TableHead>
                        <TableHead className="text-emerald-400 font-semibold">Total Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {borrowedBooks.map((item, index) => (
                        <TableRow key={index} className="border-emerald-500/10 hover:bg-emerald-500/5 transition-colors">
                          <TableCell>
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <img
                                  src={item.book.image}
                                  alt={item.book.title}
                                  className="h-16 w-12 object-cover rounded-lg border-2 border-emerald-500/20 shadow-sm"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/api/placeholder/32/48";
                                  }}
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                              </div>
                              <div>
                                <div className="font-semibold text-foreground hover:text-emerald-400 transition-colors">
                                  {item.book.title}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground font-mono text-sm">
                            {item.book.isbn}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/20"
                            >
                              {item.totalQuantity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-400">
                            ${item.book.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="font-bold text-emerald-400">
                            ${(item.totalQuantity * item.book.price).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </BackgroundEffects>
    </WrapperContainer>
  );
}