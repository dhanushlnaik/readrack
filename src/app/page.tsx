'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string
  genre: [string ],
  description: string,
  coverImage: string, // URL or base64
  averageRating: number
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then(res => res.json())
      .then(data => {
        const topRated: Book[] = (data as Book[]).sort((a: Book, b: Book) => (b.averageRating || 0) - (a.averageRating || 0));
        setBooks(topRated.slice(0, 3)); // Top 3 books
      });
  }, []);

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto font-sans">
      
      {/* 🟡 Hero Section */}
      <div className="text-center bg-pink-100 p-10 rounded-xl border-4 border-black shadow-lg">
        <h1 className="text-5xl font-extrabold text-purple-800 underline decoration-wavy">📚 ReadRack</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Your colorful corner of the internet for book lovers, reviewers, and readers with ✨opinions✨.
        </p>
        <Link href="/books">
          <button className="mt-6 px-6 py-3 bg-yellow-300 hover:bg-yellow-400 border-2 border-black rounded-lg text-black font-bold transition">
            Explore Books 💫
          </button>
        </Link>
      </div>

      {/* 🌟 Featured Books */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-blue-700 underline decoration-wavy mb-6">🌟 Featured Reads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book: Book) => (
            <Link href={`/books/${book._id}`} key={book._id}>
              <div className="bg-white border-4 border-black p-4 rounded-xl shadow hover:shadow-xl transition transform hover:scale-105">
                <img src={book.coverImage} alt={book.title} className="w-full h-52 object-cover rounded border-2 border-black mb-3" />
                <h3 className="text-xl font-bold text-purple-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">by {book.author}</p>
                <p className="text-yellow-500 font-semibold">★ {book.averageRating || "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 🧮 How It Works */}
      <div className="mt-16 bg-blue-100 p-8 rounded-xl border-4 border-black shadow-xl">
        <h2 className="text-2xl font-bold text-red-700 underline decoration-wavy mb-6">🛠 How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-white border-2 border-black rounded-xl">
            <h3 className="text-lg font-bold mb-2">📖 Read</h3>
            <p className="text-sm text-gray-600">Browse books across all genres, from classics to modern gems.</p>
          </div>
          <div className="p-4 bg-white border-2 border-black rounded-xl">
            <h3 className="text-lg font-bold mb-2">📝 Review</h3>
            <p className="text-sm text-gray-600">Share your thoughts and rate what you’ve read — anonymously or not.</p>
          </div>
          <div className="p-4 bg-white border-2 border-black rounded-xl">
            <h3 className="text-lg font-bold mb-2">👤 Connect</h3>
            <p className="text-sm text-gray-600">Discover other readers and follow their reviews on your profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
