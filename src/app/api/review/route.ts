import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const bookId = url.searchParams.get("bookId");

  const reviews = await Review.find({ bookId }).populate("userId", "username");
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookId, rating, comment } = await req.json();

  if (!session.user || !session.user.id) {
    return NextResponse.json({ error: "User information missing" }, { status: 400 });
  }

  const review = await Review.create({
    bookId,
    rating,
    comment,
    userId: session.user.id,
  });

  return NextResponse.json(review, { status: 201 });
}
