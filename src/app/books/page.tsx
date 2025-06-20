'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string[];
  description: string;
  coverImage: string;
  averageRating: number;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
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
    <div className="p-6 min-h-screen bg-yellow-50 font-[Comic_Sans_MS]">
      <h1 className="text-5xl font-bold text-center text-purple-800 drop-shadow mb-10 underline decoration-wavy decoration-pink-500">
        Explore ReadRack 📚
      </h1>

      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g === "All" ? "" : g)}
            className={`px-4 py-2 text-lg font-semibold rounded-full border-2 shadow transition-all duration-300
              ${genre === g || (g === "All" && !genre)
                ? "bg-pink-400 text-white border-pink-700 shadow-lg scale-105"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"}
            `}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {books.map((book) => (
          <Link key={book._id} href={`/books/${book._id}`}>
            <div className="bg-white border-[3px] border-purple-300 rounded-xl p-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-56 object-cover rounded-lg border-2 border-dashed border-yellow-400 mb-4"
              />
              <h2 className="text-2xl font-bold text-purple-700 mb-1">{book.title}</h2>
              <p className="text-gray-600 italic mb-1">by {book.author}</p>
              <p className="text-sm text-gray-500 mb-2">{book.genre.join(", ")}</p>
              <p className="text-lg text-yellow-500 font-bold">★ {book.averageRating || "N/A"}</p>

              <div className="absolute top-[-10px] right-[-10px] bg-yellow-300 rounded-full px-3 py-1 border-2 border-black text-xs font-bold rotate-[-6deg] shadow">
                Read Me!
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
