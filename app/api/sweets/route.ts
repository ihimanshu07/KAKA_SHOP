import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const sweets = await prisma.sweet.findMany();
    return NextResponse.json(sweets);
  } catch (error) {
    console.error("Error fetching sweets:", error);
    return NextResponse.json(
      { error: "Failed to fetch sweets" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, category, price, quantity } = await req.json();

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!category || typeof category !== "string" || category.trim().length === 0) {
      return NextResponse.json(
        { error: "Category is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "Price is required and must be a non-negative number" },
        { status: 400 }
      );
    }

    if (quantity === undefined || quantity === null || typeof quantity !== "number" || quantity < 0) {
      return NextResponse.json(
        { error: "Quantity is required and must be a non-negative number" },
        { status: 400 }
      );
    }

    const sweet = await prisma.sweet.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        price,
        quantity,
      },
    });
    return NextResponse.json(sweet, { status: 201 });
  } catch (error) {
    console.error("Error creating sweet:", error);
    return NextResponse.json(
      { error: "Failed to create sweet" },
      { status: 500 }
    );
  }
}
        