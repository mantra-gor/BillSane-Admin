// app/api/validate-license/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compareEncryptedData } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { key, businessId } = body;

  if (!key) {
    return NextResponse.json(
      { error: "License key is required" },
      { status: 400 }
    );
  }

  if (!businessId) {
    return NextResponse.json(
      { error: "Your firm is not registered with BillSane." },
      { status: 400 }
    );
  }

  const license = await prisma.license.findFirst({
    where: {
      businessId,
    },
    include: {
      business: true,
      status: true,
    },
  });

  if (!license) {
    // License key is invalid if license is not found or does not match the business ID
    return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
  }

  // Decrypt the license key
  const isValidKey = compareEncryptedData(
    license.keyEncrypted,
    license.iv,
    key
  );

  if (!isValidKey) {
    // License key is invalid if decryption fails
    return NextResponse.json({ error: "Invalid license key" }, { status: 404 });
  }

  if (license.statusId !== 2) {
    // License is not active
    return NextResponse.json(
      { error: "License is not active" },
      { status: 403 }
    );
  }

  if (license.staffLimit <= 0) {
    // License is not active
    return NextResponse.json(
      { error: "License is not active" },
      { status: 403 }
    );
  }

  // if all fine then decrease the staff limit by 1
  await prisma.license.update({
    where: { id: license.id },
    data: {
      staffLimit: {
        decrement: 1,
      },
    },
  });

  // Return the license details
  return NextResponse.json({
    success: true,
    business: license.business,
    status: license.status.name,
    createdAt: license.createdAt,
  });
}
