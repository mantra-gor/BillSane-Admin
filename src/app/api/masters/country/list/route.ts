import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countryList = await prisma.country.findMany();
    if (!countryList) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ countryList }, { status: 200 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
