'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
interface Book {
  _id: string;
  title: string;
  author: string
  genre: [string ],
  description: string,
  coverImage: string, // URL or base64
  averageRating: number
}
interface Review {
  _id: string;
  userId: { username: string };
  rating: number;
  comment: string;
}
export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      const b = await fetch(`/api/books/${id}`).then((res) => res.json());
      const r = await fetch(`/api/reviews?bookId=${id}`).then((res) => res.json());
      setBook(b);
      setReviews(r);
    };
    fetchBookAndReviews();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ bookId: id, comment, rating }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setComment("");
      setRating(5);
    } else {
      alert("You need to log in to post a review.");
    }
  };

  if (!book) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-sans">
      <div className="bg-yellow-200 border-4 border-black rounded-xl p-6 shadow-xl relative">
        <h1 className="text-4xl font-bold mb-2 text-purple-800 underline decoration-wavy">{book.title}</h1>
        <h2 className="text-xl text-gray-700">by <span className="font-semibold text-pink-600">{book.author}</span></h2>
        <Image src={book.coverImage} alt="cover" width={300} height={400} className="my-4 rounded border-4 border-black" />
        <p className="bg-white text-black border-2 border-dashed border-black p-4 rounded mt-2">
          {book.description}
        </p>
        <p className="mt-2 text-md">Genres: <span className="italic text-blue-700">{book.genre.join(", ")}</span></p>
        <p className="text-yellow-600 text-xl mt-2 font-bold">★ {book.averageRating || "N/A"}</p>
      </div>

      <div className="mt-10 bg-pink-100 p-6 rounded-xl border-4 border-black shadow-lg">
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Write a Review ✍️</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border-2 border-black rounded p-3 resize-none bg-yellow-50 font-mono"
            placeholder="Leave your thoughts..."
            rows={4}
          />
          <div>
            <label className="mr-2 font-semibold">Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border-2 border-black rounded px-2 py-1 bg-white">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button className="bg-green-400 border-2 border-black px-4 py-2 rounded text-black hover:bg-green-500 transition">Submit</button>
        </form>
      </div>

      <div className="mt-10 bg-blue-100 p-6 rounded-xl border-4 border-black shadow-lg">
        <h3 className="text-2xl font-bold text-red-700 mb-4">Reviews ✨</h3>
        {reviews.length === 0 ? (
          <p className="italic">No reviews yet!</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="bg-white border-2 border-black p-4 rounded-xl shadow-sm">
                <p className="font-bold">{review.userId?.username || "Anonymous"}</p>
                <p className="text-yellow-600">★ {review.rating}</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
