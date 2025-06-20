import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const book = await Book.findById(params.id);
    if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
