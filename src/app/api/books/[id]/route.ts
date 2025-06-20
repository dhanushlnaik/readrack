import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, context: Context) {
  await connectDB();

  const { id } = context.params;

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
