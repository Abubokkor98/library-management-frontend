import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { toast } from "sonner";
import type { IBook } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { booksApi } from "@/redux/api/booksApi";

interface BorrowBookModalProps {
  book: IBook;
  children: React.ReactNode;
}

interface BorrowFormData {
  quantity: number;
  dueDate: string;
}

export default function BorrowBookModal({ book, children }: BorrowBookModalProps) {
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BorrowFormData>();

  const onSubmit = async (data: BorrowFormData) => {
    if (data.quantity > book.copies) {
      toast.error(`Only ${book.copies} copies available`);
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity: data.quantity,
        dueDate: data.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully");
       dispatch(booksApi.util.invalidateTags(['Book']));
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="border border-emerald-500/30 shadow-xl bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl text-emerald-600 font-semibold">
            Borrow Book
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Quantity */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="quantity" className="text-emerald-700">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={book.copies}
              {...register("quantity", { required: true })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">Quantity is required</p>
            )}
          </div>

          {/* Due Date */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="dueDate" className="text-emerald-700">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate", { required: true })}
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500">Due date is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold"
            >
              {isLoading ? "Processing..." : "Confirm Borrow"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
