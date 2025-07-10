import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/booksApi";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { Genre } from "@/types";
import { BackgroundEffects } from "@/components/BackgroundEffects";

interface BookFormData {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  image: string;
  price: number;
}

const genres: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function CreateBook() {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const form = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "" as Genre,
      isbn: "",
      description: "",
      copies: 1,
      available: true,
      image: "",
      price: 0,
    },
  });

  const onSubmit = async (data: BookFormData) => {
    try {
      await createBook(data).unwrap();
      toast.success("Book created successfully!");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to create book. Please try again.");
    }
  };

  return (
    <BackgroundEffects>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-500/20 dark:bg-emerald-500/10"
          >
            ✨ Add to Collection
          </Badge>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
              Create New Book
            </span>
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Add a new book to expand your library collection
          </p>
        </div>

        <Card className="bg-card/50 border-emerald-500/20 backdrop-blur-sm">
          <CardHeader className="border-b border-emerald-500/20">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <span className="text-emerald-400">📚</span>
              Book Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-emerald-400">Basic Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      rules={{ required: "Title is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter book title" 
                              {...field}
                              className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Author */}
                    <FormField
                      control={form.control}
                      name="author"
                      rules={{ required: "Author is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">Author</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter author name" 
                              {...field}
                              className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Genre */}
                    <FormField
                      control={form.control}
                      name="genre"
                      rules={{ required: "Genre is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">Genre</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20">
                                <SelectValue placeholder="Select a genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>
                                  {genre.replace("_", " ")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* ISBN */}
                    <FormField
                      control={form.control}
                      name="isbn"
                      rules={{ required: "ISBN is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">ISBN</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter ISBN" 
                              {...field}
                              className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    rules={{ required: "Description is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-400 font-semibold">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter book description"
                            className="resize-none border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20 min-h-[120px]"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="image"
                    rules={{ required: "Image URL is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-emerald-400 font-semibold">Image URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter image URL" 
                            {...field}
                            className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-emerald-400">Pricing & Availability</h3>
                  </div>

                  {/* Price and Copies Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      rules={{
                        required: "Price is required",
                        min: {
                          value: 0,
                          message: "Price must be greater than 0",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">Price ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                              className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="copies"
                      rules={{
                        required: "Number of copies is required",
                        min: { value: 1, message: "At least 1 copy is required" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-emerald-400 font-semibold">Copies</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                              className="border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Available Checkbox */}
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-emerald-500/20 rounded-lg bg-emerald-500/5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-emerald-400 font-semibold">Available for borrowing</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Check this if the book should be available for users to borrow
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-emerald-500/20">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">✨</span>
                        Create Book
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/books")}
                    className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </BackgroundEffects>
  );
}