import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Review from "@/models/Review";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const user = await User.findById(params.id).select("-password");
    const reviews = await Review.find({ userId: params.id }).populate("bookId", "title");

    return NextResponse.json({ user, reviews });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
