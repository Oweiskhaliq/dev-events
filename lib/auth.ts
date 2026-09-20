import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Hash password before saving it
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

// Compare login password with hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

// Create JWT
export const createToken = (
  userId: string,
  email: string,
  username: string
): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      userId,
      email,
      username,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Verify JWT
export const verifyToken = (token: string): { userId: string } => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "userId" in decoded &&
    typeof decoded.userId === "string"
  ) {
    return {
      userId: decoded.userId,
    };
  }

  throw new Error("Invalid token");
};