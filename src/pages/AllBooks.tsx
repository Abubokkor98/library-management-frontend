import { useNavigate } from "react-router";
import { useGetBooksQuery } from "@/redux/api/booksApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";
import EditBookModal from "@/components/EditBookModal";
import DeleteBookModal from "@/components/DeleteBookModal";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery({});
  const navigate = useNavigate();

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
                  <span className="text-green-600 font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Unavailable
                  </span>
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

                {/* Edit Book Modal with pre-filled values */}
                <EditBookModal book={book}>
                  <Button variant="outline">Edit</Button>
                </EditBookModal>

                {/* Delete Confirmation Modal */}
                <DeleteBookModal book={book}>
                  <Button variant="destructive">Delete</Button>
                </DeleteBookModal>

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