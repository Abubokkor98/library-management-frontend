import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateBookMutation } from "@/redux/api/booksApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { IBook, Genre } from "@/types";

interface EditBookModalProps {
  book: IBook;
  children: React.ReactNode;
}

type FormValues = {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  copies: number;
  price: number;
  description?: string;
  image: string;
};

const genreOptions: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function EditBookModal({ book, children }: EditBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      copies: book.copies,
      price: book.price,
      description: book.description || "",
      image: book.image,
    },
  });

  const onSubmit = async (formData: FormValues) => {
    try {
      await updateBook({ id: book._id, data: formData }).unwrap();
      toast.success("Book updated successfully!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to update book.");
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background border border-emerald-500/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-emerald-600 font-bold">
            Edit Book: {book.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Author */}
            <div className="space-y-1">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            {/* Genre */}
            <div className="space-y-1">
              <Label htmlFor="genre">Genre *</Label>
              <Select
                onValueChange={(value) => setValue("genre", value as Genre)}
                defaultValue={watch("genre")}
              >
                <SelectTrigger className="w-full focus:ring-emerald-500">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genreOptions.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.genre && (
                <p className="text-red-500 text-sm">Genre is required</p>
              )}
            </div>

            {/* ISBN */}
            <div className="space-y-1">
              <Label htmlFor="isbn">ISBN *</Label>
              <Input
                id="isbn"
                {...register("isbn", { required: "ISBN is required" })}
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm">{errors.isbn.message}</p>
              )}
            </div>

            {/* Copies */}
            <div className="space-y-1">
              <Label htmlFor="copies">Copies *</Label>
              <Input
                id="copies"
                type="number"
                min="0"
                {...register("copies", {
                  required: "Copies are required",
                  valueAsNumber: true,
                })}
              />
              {errors.copies && (
                <p className="text-red-500 text-sm">{errors.copies.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              {...register("image")}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              placeholder="Enter book description..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 transition"
            >
              {isLoading ? "Updating..." : "Update Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
