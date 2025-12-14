import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("Session:", session);
    
    if (!session?.user) {
      console.error("No session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body;

    console.log("Request body:", body);
    console.log("Role:", role);

    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    if (!session.user.email) {
      console.error("User email is missing from session");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Get oauthId from session (stored in user.id from JWT callback)
    const oauthId = (session.user as any).id || null;

    console.log("User email:", session.user.email);
    console.log("User name:", session.user.name);
    console.log("OAuth ID:", oauthId);
    console.log("Role:", role);

    // Check if user already exists by email
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      console.log("Existing user:", existingUser);

    } catch (dbError: any) {
      console.error("Database error finding user:", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

   let user;
   if (existingUser) {
    console.log("User already exists", existingUser);
    user = existingUser;
   } else {
      // Create new user
      try {
        const newUser = await prisma.user.create({
          data: {
            name: session.user.name || null,
            email: session.user.email,
            oauthId: oauthId,
            role: role,
            onboading: true,
          },
        });
        console.log("User created:", newUser);
        user = newUser;
      } catch (createError: any) {
        console.error("Error creating user:", createError);
        throw new Error(`Failed to create user: ${createError.message}`);
      }
   }

   // Generate JWT token with oauthId (Google session id) and role
   const jwtId = user.oauthId || oauthId;
   const jwtRole = user.role || role;
   
   if (!jwtId || !jwtRole) {
     return NextResponse.json(
       { error: "Missing required user information for token generation" },
       { status: 400 }
     );
   }

   const token = generateToken({
     id: jwtId,
     role: jwtRole,
   });

   // Create response with user data
   const response = NextResponse.json(user);
   
   // Set JWT token as cookie
   response.cookies.set("jwt_token", token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: "lax",
     maxAge: 60 * 60 * 24 * 7, // 7 days
     path: "/",
   });

   return response;
  } catch (error: any) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save user" },
      { status: 500 }
    );
  }
}

