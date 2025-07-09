export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  image: string;
  price: number;
  description?: string;
  copies: number;
  available: boolean;
}

export interface CreateBookData {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  image: string;
  price: number;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface UpdateBookData {
  title?: string;
  author?: string;
  genre?: Genre;
  isbn?: string;
  image?: string;
  price?: number;
  description?: string;
  copies?: number;
  available?: boolean;
}

export interface Borrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBorrowData {
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
    image: string;
    price: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type BookQueryParams = {
  filter?: string;
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: number;
};
