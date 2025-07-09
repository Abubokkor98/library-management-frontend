import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { toast } from "sonner";
import type { IBook } from "@/types";

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
      reset();
    } catch (error) {
      toast.error("Failed to borrow book");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Quantity */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
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
            <Label htmlFor="dueDate">Due Date</Label>
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
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Borrow"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
