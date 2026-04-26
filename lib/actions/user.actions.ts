"use server";

import { revalidatePath } from "next/cache";
import  connectToDatabase  from "@/lib/mongodb";
import User from "@/database/user.model";

/**
 * CREATE USER
 * Triggered after a successful sign-up to sync auth data with MongoDB.
 */
export async function createUser(userData: {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}) {
  try {
    await connectToDatabase();

    const newUser = await User.create(userData);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * UPDATE USER
 * Keeps the database in sync if the user changes their profile on the auth provider.
 */
export async function updateUser(params: {
  clerkId: string;
  updateData: Partial<{
    name: string;
    username: string;
    email: string;
    picture: string;
  }>;
  path: string;
}) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    // Refresh the cache for the profile page to show updated data
    revalidatePath(path);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

/**
 * DELETE USER
 * Removes user data if they delete their account.
 */
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Optional: Delete user's associated events or bookings here
    // await Event.deleteMany({ author: user._id });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}