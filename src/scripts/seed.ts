import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "@/models/Books";
import Review from "@/models/Review";
import User from "@/models/User";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🚀 Connected to MongoDB");

    // Clear existing data
    await Book.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});


    // Create sample books
    const books = await Book.insertMany([
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: ["Psychology", "Non-fiction"],
        description: "Explores the dual systems that drive the way we think.",
        coverImage: "https://m.media-amazon.com/images/I/71f6DceqZAL.jpg",
        averageRating: 4.3,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: ["Fiction", "Classic"],
        description: "A story of racial injustice and childhood in the Deep South.",
        coverImage: "https://m.media-amazon.com/images/I/81gepf1eMqL._UF1000,1000_QL80_.jpg",
        averageRating: 4.8,
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        genre: ["Self-help", "Productivity"],
        description: "Rules for focused success in a distracted world.",
        coverImage: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
        averageRating: 4.4,
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: ["Fiction", "Dystopian"],
        description: "A chilling prophecy about the future of a totalitarian world.",
        coverImage: "https://m.media-amazon.com/images/I/51BIA4rraeL._UF1000,1000_QL80_.jpg",
        averageRating: 4.6,
      },
      {
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        genre: ["Self-help", "Philosophy"],
        description: "A counterintuitive approach to living a good life.",
        coverImage: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
        averageRating: 4.0,
      },
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        genre: ["Fantasy", "Philosophy"],
        description: "A woman explores alternate lives through a magical library.",
        coverImage: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
        averageRating: 4.1,
      },
    ]);


    console.log("✅ Seed data created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
