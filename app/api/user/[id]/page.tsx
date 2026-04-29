import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const user = await User.findById(params.id).populate("saved");
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update Failed" }, { status: 500 });
  }
}