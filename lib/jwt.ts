import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.NEXT_JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("NEXT_JWT_SECRET environment variable is not set. Please set it in your Vercel environment variables.");
}

export interface JWTPayload {
  id: string;
  role: string;
}

/**
 * Generate a JWT token with user id and role
 */
export function generateToken(payload: JWTPayload): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
}

/**
 * Set JWT token as HTTP-only cookie in response
 * Optimized for Vercel deployment
 */
export function setJWTCookie(response: NextResponse, token: string): void {
  // For Vercel: secure should be true in production (HTTPS required)
  // Check for Vercel environment or production mode
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  
  response.cookies.set("jwt_token", token, {
    httpOnly: true,
    secure: isProduction, // HTTPS only in production
    sameSite: "lax", // Good for same-site requests, works with Vercel
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    // Don't set domain - let browser use default (works for Vercel subdomains)
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
 * Handles URL encoding and edge cases for Vercel deployment
 */
export function getTokenFromRequest(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  try {
    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt_token="));

    if (!tokenCookie) return null;

    // Extract token value, handling potential URL encoding
    const tokenValue = tokenCookie.substring("jwt_token=".length);
    
    // Decode URL-encoded cookie value if needed
    try {
      return decodeURIComponent(tokenValue);
    } catch {
      // If decoding fails, return as-is (might already be decoded)
      return tokenValue;
    }
  } catch (error) {
    console.error("Error parsing cookie:", error);
    return null;
  }
}

