import { hash } from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  await dbConnect();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ message: "User already exists" }, { status: 400 });

  const hashed = await hash(password, 12);
  await User.create({ username, email, password: hashed });

  return NextResponse.json({ message: "Registered successfully" }, { status: 201 });
}
