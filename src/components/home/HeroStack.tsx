import Image from "next/image";
import ProductShot from "@/components/ui/ProductShot";

/**
 * The hero's one authored moment: the New Invoice window, with the finished
 * tax invoice feeding out below it like a bill from the counter printer.
 */
export default function HeroStack() {
  return (
    <div className="relative pb-24 sm:pb-28 lg:pb-16">
      <ProductShot
        src="/screens/new-invoice.webp"
        alt="BillSane's New Invoice screen: a returning customer found by phone number, three grocery items with GST, and UPI selected as the payment method."
        width={1800}
        height={1125}
        title="BillSane"
        priority
      />
      <div className="absolute -bottom-2 left-4 w-[52%] sm:left-8 sm:w-[40%] lg:-left-10 lg:-bottom-10 lg:w-[38%]">
        <div className="bill-print origin-top rotate-[-2deg]">
          <Image
            src="/screens/bill.webp"
            alt="A printed BillSane tax invoice for Mehta Traders with GSTIN, four items, tax per line and a total of ₹780.75."
            width={900}
            height={952}
            priority
            className="bill-paper h-auto w-full rounded-b-xl shadow-pop"
            sizes="(min-width: 1024px) 260px, 45vw"
          />
        </div>
      </div>
    </div>
  );
}
