import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_JWT_SECRET !;
export interface JWTPayload {
  id: string;
  role: string;
}

/**
 * Generate a JWT token with user id and role
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

/**
 * Extract JWT token from request cookies
 */
export function getTokenFromRequest(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt_token="));

  if (!tokenCookie) return null;

  return tokenCookie.split("=")[1];
}

