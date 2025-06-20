'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface User {
  _id: string;
  username: string;
  email: string;
  reviews?: Review[];
}

interface Review {
  _id: string;
  bookId: { _id: string; title: string };
  rating: number;
  comment: string;
}

export default function ProfilePage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserReviews = async () => {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setReviews(data.reviews || []);
      setUser(data.user || null);
    };
    getUserReviews();
  }, [id]);

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-yellow-100 border-4 border-black p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-800 underline decoration-wavy mb-2">
          {user.username}&#39;s Scrapbook 🧷
        </h1>
        <p className="text-gray-700 mb-2">Email: {user.email}</p>
        <p className="text-sm italic text-gray-500 mb-4">User ID: {user._id}</p>
      </div>

      <div className="mt-8 bg-blue-100 border-4 border-black p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Their Reviews 📝</h2>
        {reviews.length === 0 ? (
          <p className="italic">This user hasn&#39;t left any reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r: Review) => (
              <li key={r._id} className="bg-white border-2 border-black p-4 rounded-xl shadow">
                <Link href={`/books/${r.bookId._id}`}>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">{r.bookId.title}</h3>
                </Link>
                <p className="text-yellow-600 font-bold">★ {r.rating}</p>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
