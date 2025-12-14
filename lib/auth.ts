import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest, JWTPayload } from "./jwt";

/**
 * Authenticate request using JWT token from cookies
 * Returns the decoded JWT payload if valid, null otherwise
 */
export function authenticateRequest(req: NextRequest): JWTPayload | null {
  const cookieHeader = req.headers.get("cookie");
  const token = getTokenFromRequest(cookieHeader);

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Middleware helper to check if user is authenticated
 * Returns 401 if not authenticated
 */
export function requireAuth(req: NextRequest): JWTPayload | NextResponse {
  const payload = authenticateRequest(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  return payload;
}

/**
 * Middleware helper to check if user is admin
 * Returns 403 if not admin, or the payload if admin
 */
export function requireAdmin(req: NextRequest): JWTPayload | NextResponse {
  const authResult = requireAuth(req);

  if (authResult instanceof NextResponse) {
    return authResult; // Already an error response
  }

  const payload = authResult;

  if (payload.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden - Admin access required" },
      { status: 403 }
    );
  }

  return payload;
}

