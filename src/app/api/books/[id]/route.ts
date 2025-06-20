import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await connectDB();

  try {
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("GET /books/:id error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
