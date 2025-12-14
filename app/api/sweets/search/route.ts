import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: any = {};

    if (name) {
      where.name = { contains: name, mode: "insensitive" };
    }
    if (category) {
      where.category = { contains: category, mode: "insensitive" };
    }

    // Handle price range
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        const min = parseInt(minPrice);
        if (isNaN(min) || min < 0) {
          return NextResponse.json(
            { error: "minPrice must be a valid non-negative number" },
            { status: 400 }
          );
        }
        where.price.gte = min;
      }
      if (maxPrice) {
        const max = parseInt(maxPrice);
        if (isNaN(max) || max < 0) {
          return NextResponse.json(
            { error: "maxPrice must be a valid non-negative number" },
            { status: 400 }
          );
        }
        where.price.lte = max;
      }
      // Validate price range
      if (minPrice && maxPrice) {
        const min = parseInt(minPrice);
        const max = parseInt(maxPrice);
        if (min > max) {
          return NextResponse.json(
            { error: "minPrice cannot be greater than maxPrice" },
            { status: 400 }
          );
        }
      }
    }

    const sweets = await prisma.sweet.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sweets);
  } catch (error) {
    console.error("Error searching sweets:", error);
    return NextResponse.json(
      { error: "Failed to search sweets" },
      { status: 500 }
    );
  }
}