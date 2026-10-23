import Razorpay from "razorpay";

export function getRazorpay() {
  const keyId = process.env.RAZORPAY_TEST_KEY?.trim();
  const keySecret = process.env.RAZORPAY_TEST_SECRET?.trim();
  if (!keyId || !keySecret) {
    throw new Error("Razorpay test keys are not configured");
  }
  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId, keySecret };
}
