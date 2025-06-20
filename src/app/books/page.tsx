'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
interface Book {
  _id: string;
  title: string;
  author: string
  genre: [string ],
  description: string,
  coverImage: string, // URL or base64
  averageRating: number
}
export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("");

  const genres = ["Fiction", "History", "Philosophy", "Self-help", "All"];

  const fetchBooks = async (selectedGenre = "") => {
    const res = await fetch(`/api/books${selectedGenre ? `?genre=${selectedGenre}` : ""}`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks(genre);
  }, [genre]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Books</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g === "All" ? "" : g)}
            className={`px-3 py-1 rounded border ${
              genre === g || (g === "All" && !genre)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book: Book) => (
          <Link key={book._id} href={`/books/${book._id}`}>
            <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
              <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
              <p className="text-sm text-gray-500 mt-1">{book.genre.join(", ")}</p>
              <p className="text-yellow-500 mt-1">★ {book.averageRating || "N/A"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
