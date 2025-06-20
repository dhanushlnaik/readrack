import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";


// POST /api/books
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  // TODO: Add admin check here later
  const book = await Book.create(body);
  return NextResponse.json(book, { status: 201 });
}
