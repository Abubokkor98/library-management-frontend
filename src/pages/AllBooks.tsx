import  { useState } from "react";
import { useNavigate } from "react-router";
import { useGetBooksQuery, useDeleteBookMutation } from "@/redux/api/booksApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { toast } from "sonner";
import type { IBook } from "@/types";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Book List</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((book: IBook) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.copies > 0 ? (
                  <span className="text-green-600 font-semibold">Available</span>
                ) : (
                  <span className="text-red-500 font-semibold">Unavailable</span>
                )}
              </TableCell>
              <TableCell className="space-x-2">
                {/* View Details */}
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  View
                </Button>

                {/* Edit Book Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBook(book)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>
                    <p>Form for editing: <strong>{selectedBook?.title}</strong></p>
                    {/* Later, you will replace this with your EditBookForm */}
                  </DialogContent>
                </Dialog>

                {/* Delete Confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete "{book.title}"?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button
                        variant="destructive"
                        onClick={async () => {
                          await deleteBook(book._id);
                          toast.success("Book deleted");
                        }}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* Borrow Button */}
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/borrow/${book._id}`)}
                >
                  Borrow
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
