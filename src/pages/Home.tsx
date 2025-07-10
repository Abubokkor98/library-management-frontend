// Home.tsx (Updated after splitting)
import { useState } from "react";
import { useGetBooksQuery } from "@/redux/api/booksApi";
import { FeaturedBooks } from "@/components/books/FeaturedBooks";
import { BookCategories } from "@/components/books/BookCategories";
import type { IBook } from "@/types";
import { Banner } from "@/components/Banner";
import { WrapperContainer } from "@/lib/WrapperContainer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("SCIENCE");

  const {
    data: allBooksData,
    isLoading: allBooksLoading,
    error: allBooksError,
  } = useGetBooksQuery({});

  const { data: featuredBooksData, isLoading: featuredLoading } =
    useGetBooksQuery({});

  const getFilteredBooks = () => {
    if (!allBooksData?.data) return [];
    return allBooksData.data.filter(
      (book: IBook) => book.genre === selectedCategory
    );
  };

  const filteredBooks = getFilteredBooks();

  return (
    <WrapperContainer>
      <div className="min-h-screen bg-background">
        <Banner totalBooks={allBooksData?.data?.length || 0} />

        <div className="">
          <FeaturedBooks
            books={featuredBooksData?.data.slice(0, 4) || []}
            isLoading={featuredLoading}
          />
          <BookCategories
            categories={[
              { value: "SCIENCE", label: "Science" },
              { value: "FICTION", label: "Fiction" },
              { value: "NON_FICTION", label: "Non-Fiction" },
              { value: "HISTORY", label: "History" },
              { value: "BIOGRAPHY", label: "Biography" },
              { value: "FANTASY", label: "Fantasy" },
            ]}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredBooks={filteredBooks}
            isLoading={allBooksLoading}
            error={allBooksError}
          />
        </div>
      </div>
    </WrapperContainer>
  );
}
