// types.d.ts

export type LicenseStatus = "ACTIVE" | "INACTIVE" | "EXPIRED";

export interface Category {
  id: number;
  name: string;
}

export interface Currency {
  id: number;
  name: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface State {
  id: number;
  name: string;
  countryId: number;
}

export interface Business {
  id: number;
  business_name: string;
  categoryId: number;
  gst_no: string;
  business_branches: number;
  no_of_staff: number;
  countryId: number;
  stateId: number;
  currencyId?: number;
}

export interface License {
  id: number;
  keyEncrypted: string;
  iv: string;
  businessId: number;
  statusId: number;
  staffLimit: number;
  createdAt: string; // ISO Date string
}

export interface User {
  id: number;
  businessId: number;
  is_admin: boolean;
  name: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string; // ISO
  paidAt?: string;

  licenseId?: number;
  userId: number;
  businessId: number;
  planId?: number;
}

export interface Plan {
  id: number;
  name: string;
  description?: string;
  features: string[];
  price: string;
  originalPrice: string;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
