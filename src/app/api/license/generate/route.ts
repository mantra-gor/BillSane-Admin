import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { encrypt } from "@/lib/crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessId, staffLimit } = body;

    // You may define your 'active' statusId ahead of time or fetch it from DB
    const activeStatus = await prisma.status.findFirst({
      where: { name: "Active" },
    });

    if (!activeStatus) {
      return NextResponse.json(
        { error: "Active status not found" },
        { status: 500 }
      );
    }

    const licenseKey = uuidv4().toUpperCase();
    const { iv, encryptedData } = encrypt(licenseKey);

    await prisma.license.create({
      data: {
        keyEncrypted: encryptedData,
        iv,
        businessId,
        statusId: activeStatus.id,
        staffLimit,
      },
    });

    return NextResponse.json({ license: licenseKey }, { status: 201 });
  } catch (error) {
    console.error("Error creating license:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
