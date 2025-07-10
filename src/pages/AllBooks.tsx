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
import BorrowBookModal from "@/components/BorrowBookModal";
import { WrapperContainer } from "@/lib/WrapperContainer";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/Loader";

export default function AllBooks() {
  const { data, isLoading } = useGetBooksQuery({});
  const navigate = useNavigate();

  if (isLoading)
    return <Loader/>

  return (
    <WrapperContainer>
      <div className="p-6 ">
        <h2 className="text-3xl font-bold mb-6 text-emerald-600 flex items-center gap-2">
          📚 Book List
        </h2>

        <div className="overflow-x-auto rounded-lg border border-muted">
          <Table>
            <TableHeader className="bg-emerald-50 dark:bg-emerald-900/10">
              <TableRow>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Title</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Author</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Genre</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">ISBN</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Copies</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Availability</TableHead>
                <TableHead className="text-emerald-700 dark:text-emerald-300">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((book: IBook) => (
                <TableRow key={book._id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-300/30">
                      {book.genre}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{book.isbn}</TableCell>
                  <TableCell>{book.copies}</TableCell>
                  <TableCell>
                    {book.copies > 0 ? (
                      <Badge className="bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-white">Unavailable</Badge>
                    )}
                  </TableCell>

                  <TableCell className="space-x-2 whitespace-nowrap">
                    {/* View Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/books/${book._id}`)}
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition"
                    >
                      View
                    </Button>

                    {/* Edit Book Modal */}
                    <EditBookModal book={book}>
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white transition">
                        Edit
                      </Button>
                    </EditBookModal>

                    {/* Delete Modal */}
                    <DeleteBookModal book={book}>
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </DeleteBookModal>

                    {/* Borrow Modal */}
                    <BorrowBookModal book={book}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition"
                      >
                        Borrow
                      </Button>
                    </BorrowBookModal>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </WrapperContainer>
  );
}
