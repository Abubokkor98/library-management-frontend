import { useState } from "react";
import { useDeleteBookMutation } from "@/redux/api/booksApi";
import { toast } from "sonner";
import type { IBook } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteBookModalProps {
  book: IBook;
  children: React.ReactNode;
}

export default function DeleteBookModal({
  book,
  children,
}: DeleteBookModalProps) {
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteBook(book._id).unwrap();
      toast.success("Book deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete book");
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="border border-emerald-500/30 shadow-xl bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-emerald-600 font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-emerald-500 font-medium">"{book.title}"</span>{" "}
            from the library database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="hover:bg-emerald-100 text-emerald-600 border-emerald-300"
          >
            No, Keep It.
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90 text-white font-semibold"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete!"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
