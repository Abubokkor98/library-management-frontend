# Library Management System 📚

A minimal library management system built with React, TypeScript, and Redux Toolkit Query. This application provides essential book management functionality including viewing, adding, editing, deleting, and borrowing books.

## 🚀 Live Demo

**[Visit LibraryHub](https://library-hub-iota.vercel.app/)**

## Features

- **Book Management**: View, add, edit, and delete books
- **Book Borrowing**: Borrow books with quantity and due date tracking
- **Borrow Summary**: View aggregated borrowing statistics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Optimistic UI updates for better user experience
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Redux Toolkit Query** - State management and API calls
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Installation

```bash
# Clone the repository
git clone <https://github.com/Abubokkor98/library-management-frontend>
cd library-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://library-management-backend-beta-nine.vercel.app/api
```


## Key Features

### Book Management
- View all books in a responsive table
- Add new books with form validation
- Edit existing books (opens in modal)
- Delete books with confirmation dialog
- Real-time availability updates

### Borrowing System
- Borrow books with quantity limits
- Set due dates for borrowed books
- Automatic availability updates
- Borrowing summary with aggregated data

### UI/UX
- Clean, minimalist design
- Responsive layout for all devices
- Toast notifications for user feedback
- Optimistic UI updates
- Type-safe forms with validation


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request
