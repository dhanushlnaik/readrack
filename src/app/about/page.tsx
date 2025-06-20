'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fefcf3] text-black px-6 py-12 md:px-20 max-w-4xl mx-auto">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 font-[Fredoka] text-center"
      >
        About <span className="text-pink-500">ReadRack</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg text-gray-700 mt-4 leading-relaxed font-[Poppins] text-center"
      >
        Welcome to <strong>ReadRack</strong> — your cozy corner on the internet where books meet doodles!
        Whether you&apos;re here to rant about a plot twist or gush over a poetic line, this is the place
        where stories come to life through your reviews.
      </motion.p>

      <div className="mt-10 border-l-4 border-pink-500 pl-6 bg-[#fffaf4] py-4 rounded shadow">
        <p className="text-md text-gray-800 font-[Poppins] leading-relaxed">
          ✍️ <strong>Write reviews</strong> that feel like letters to your past self.<br />
          🌈 <strong>Rate</strong> stories based on how hard they hit.<br />
          🎨 <strong>Browse</strong> like you&#39;re flipping pages of a sketchbook.<br />
          🤝 <strong>Connect</strong> with other readers who doodle their way through thoughts.
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/books"
          className="inline-block bg-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition transform duration-200"
        >
          Explore Books
        </Link>
      </div>
    </div>
  );
}
