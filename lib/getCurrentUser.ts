import { cookies } from "next/headers";
import User, { IUser } from "@/database/user.model";
import { verifyToken } from "@/lib/auth";
import {connectToDatabase} from "@/lib/mongodb";

export async function getCurrentUser(): Promise<IUser | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}