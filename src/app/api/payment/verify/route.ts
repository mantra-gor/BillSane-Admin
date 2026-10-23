import crypto from "crypto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import { getRazorpay } from "@/lib/razorpay";

// Verifies the Razorpay signature and, only then, issues the license.
export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
    }

    const payment = await prisma.payment.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
      include: { business: true },
    });
    if (!payment) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (payment.status === "SUCCESS" || payment.licenseId) {
      return NextResponse.json({ error: "This payment is already processed" }, { status: 409 });
    }

    const { keySecret } = getRazorpay();
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));

    if (!valid) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED", razorpayPaymentId: razorpay_payment_id },
      });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const activeStatus = await prisma.status.findFirst({ where: { name: "Active" } });
    if (!activeStatus) {
      return NextResponse.json({ error: "Active status not found" }, { status: 500 });
    }

    const licenseKey = uuidv4().toUpperCase();
    const { iv, encryptedData } = encrypt(licenseKey);

    await prisma.$transaction(async (tx) => {
      const license = await tx.license.create({
        data: {
          keyEncrypted: encryptedData,
          iv,
          businessId: payment.businessId,
          statusId: activeStatus.id,
          staffLimit: payment.business.no_of_staff,
        },
      });
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paidAt: new Date(),
          licenseId: license.id,
        },
      });
    });

    return NextResponse.json({ license: licenseKey }, { status: 201 });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
