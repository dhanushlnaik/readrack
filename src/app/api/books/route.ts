// src/app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Book from "@/models/Books";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url);
  const genre = url.searchParams.get("genre");

  try {
    const filter = genre ? { genre: { $in: [genre] } } : {};
    const books = await Book.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(books);
  } catch (err) {
    console.error("GET /books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const newBook = await Book.create(body);
    return NextResponse.json(newBook, { status: 201 });
  } catch (err) {
    console.error("POST /books error:", err);
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
