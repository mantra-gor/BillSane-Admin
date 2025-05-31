import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categoryList = await prisma.category.findMany();

    if (!categoryList) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ categoryList }, { status: 200 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
