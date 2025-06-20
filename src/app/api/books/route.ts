import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";

// GET /api/books
export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const genre = url.searchParams.get("genre");

  const query = genre ? { genre: { $in: [genre] } } : {};
  const books = await Book.find(query);
  return NextResponse.json(books, { status: 200 });
}

// POST /api/books
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  // TODO: Add admin check here later
  const book = await Book.create(body);
  return NextResponse.json(book, { status: 201 });
}
