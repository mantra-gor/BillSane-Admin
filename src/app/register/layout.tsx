import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register your business | BillSane",
  description: "Register your business, pay for your plan and get your BillSane license key.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
