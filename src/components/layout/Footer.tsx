import { Link } from 'react-router';
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LibraryHub</span>
            </Link>
            <p className="text-sm text-gray-400">
              Your modern digital library management system. Discover, borrow, and manage books effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-sm hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/create-book" className="text-sm hover:text-white transition-colors">
                  Add New Book
                </Link>
              </li>
              <li>
                <Link to="/borrow-summary" className="text-sm hover:text-white transition-colors">
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?filter=FICTION" className="text-sm hover:text-white transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?filter=SCIENCE" className="text-sm hover:text-white transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link to="/books?filter=HISTORY" className="text-sm hover:text-white transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link to="/books?filter=FANTASY" className="text-sm hover:text-white transition-colors">
                  Fantasy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              Built with React, TypeScript, and shadcn/ui
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © 2025 LibraryHub. All rights reserved. Built for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;