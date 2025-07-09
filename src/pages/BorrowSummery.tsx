import React from 'react';
import { useGetBorrowSummaryQuery } from '@/redux/api/borrowApi';
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

interface BorrowedBook {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
    image: string;
    price: number;
  };
}

interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowedBook[];
}

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery({});
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Card>
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
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-red-600">
              Error loading borrow summary. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const borrowedBooks: BorrowedBook[] = data?.data || [];
  const totalBooks = borrowedBooks.reduce((sum, item) => sum + item.totalQuantity, 0);
  const totalValue = borrowedBooks.reduce((sum, item) => sum + (item.totalQuantity * item.book.price), 0);

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Borrow Summary</h1>
          <p className="text-gray-600">Overview of your borrowed books</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Total Books</div>
              <div className="text-2xl font-semibold">{totalBooks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Unique Titles</div>
              <div className="text-2xl font-semibold">{borrowedBooks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-semibold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            {borrowedBooks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No borrowed books found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borrowedBooks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.book.image}
                            alt={item.book.title}
                            className="h-12 w-8 object-cover rounded border"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/api/placeholder/32/48';
                            }}
                          />
                          <div>
                            <div className="font-medium">{item.book.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {item.book.isbn}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.totalQuantity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        ${item.book.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(item.totalQuantity * item.book.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}