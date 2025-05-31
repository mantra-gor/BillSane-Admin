import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMockId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Mock data for development
export const categories = [
  { id: "1", name: "Retail" },
  { id: "2", name: "Restaurant" },
  { id: "3", name: "Health & Wellness" },
  { id: "4", name: "Professional Services" },
  { id: "5", name: "Manufacturing" },
  { id: "6", name: "Education" },
  { id: "7", name: "E-commerce" },
  { id: "8", name: "Technology" },
];

export const countries = [
  {
    id: "1",
    name: "United States",
    states: [
      { id: "1", name: "California", countryId: "1" },
      { id: "2", name: "New York", countryId: "1" },
      { id: "3", name: "Texas", countryId: "1" },
      { id: "4", name: "Florida", countryId: "1" },
    ],
  },
  {
    id: "2",
    name: "India",
    states: [
      { id: "5", name: "Maharashtra", countryId: "2" },
      { id: "6", name: "Karnataka", countryId: "2" },
      { id: "7", name: "Tamil Nadu", countryId: "2" },
      { id: "8", name: "Delhi", countryId: "2" },
    ],
  },
  {
    id: "3",
    name: "United Kingdom",
    states: [
      { id: "9", name: "England", countryId: "3" },
      { id: "10", name: "Scotland", countryId: "3" },
      { id: "11", name: "Wales", countryId: "3" },
      { id: "12", name: "Northern Ireland", countryId: "3" },
    ],
  },
];

export const currencies = [
  { id: "1", code: "USD", name: "US Dollar", symbol: "$" },
  { id: "2", code: "EUR", name: "Euro", symbol: "€" },
  { id: "3", code: "GBP", name: "British Pound", symbol: "£" },
  { id: "4", code: "INR", name: "Indian Rupee", symbol: "₹" },
  { id: "5", code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { id: "6", code: "AUD", name: "Australian Dollar", symbol: "$" },
];

// Function to get states based on selected country
export const getStatesByCountry = (countryId: string) => {
  const country = countries.find((c) => c.id === countryId);
  return country ? country.states : [];
};

// Function to validate GST number (example for Indian GST)
export const validateGSTNumber = (gst: string) => {
  // This is a simplified validation, real GST validation is more complex
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst);
};

// Function to validate email
export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Function to validate phone number
export const validatePhone = (phone: string) => {
  // This is a simplified validation
  const regex = /^\+?[0-9]{10,15}$/;
  return regex.test(phone);
};

// Mock function to generate license key (in real app, this would be done server-side)
export const generateLicenseKey = () => {
  const segments = [];
  for (let i = 0; i < 5; i++) {
    segments.push(Math.random().toString(36).substring(2, 7).toUpperCase());
  }
  return segments.join("-");
};
