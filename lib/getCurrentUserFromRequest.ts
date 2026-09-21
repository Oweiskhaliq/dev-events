// lib/getCurrentUserFromRequest.ts

import { NextRequest } from "next/server";
import User, { IUser } from "@/database/user.model";
import { verifyToken } from "@/lib/auth";
import {connectToDatabase} from "@/lib/mongodb";

export async function getCurrentUserFromRequest(
  req: NextRequest
): Promise<IUser | null> {
  try {
    const token = req.cookies.get("auth_token")?.value;

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
    console.error("getCurrentUserFromRequest error:", error);
    return null;
  }
}