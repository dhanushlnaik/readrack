// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Review from "@/models/Review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const reviews = await Review.find({ user: id }).populate("book");

    return NextResponse.json({ user, reviews });
  } catch (err) {
    console.error("GET /users/:id error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session || session.user?.id !== id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("PUT /users/:id error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
