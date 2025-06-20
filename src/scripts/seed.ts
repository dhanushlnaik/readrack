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

    // Create sample users
    const users = await User.insertMany([
      {
        username: "reader01",
        email: "reader01@example.com",
        password: "hashedpassword01", // replace with hashed values in real use
        isAdmin: false,
      },
      {
        username: "adminUser",
        email: "admin@latracal.com",
        password: "hashedadminpw",
        isAdmin: true,
      },
    ]);

    // Create sample books
    const books = await Book.insertMany([
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: ["Fiction", "Philosophy"],
        description: "A philosophical story about following your dreams.",
        coverImage: "https://i.imgur.com/sJ3CT4V.gif",
        averageRating: 4.2,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: ["Self-help", "Psychology"],
        description: "An easy and proven way to build good habits and break bad ones.",
        coverImage: "https://i.imgur.com/OuEhx2r.jpg",
        averageRating: 4.7,
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: ["Non-fiction", "History"],
        description: "A brief history of humankind.",
        coverImage: "https://i.imgur.com/E0y60W8.jpg",
        averageRating: 4.5,
      },
    ]);

    // Create sample reviews
    await Review.insertMany([
      {
        bookId: books[0]._id,
        userId: users[0]._id,
        rating: 5,
        comment: "Absolutely life-changing!",
      },
      {
        bookId: books[1]._id,
        userId: users[0]._id,
        rating: 4,
        comment: "Very practical advice and actionable tips.",
      },
      {
        bookId: books[2]._id,
        userId: users[1]._id,
        rating: 4,
        comment: "Mind-opening and deeply insightful.",
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
