"use client";

import { useEffect, useState, useRef } from "react";
import {
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Copy,
  Download,
  Building,
  User,
  CheckSquare,
  CreditCard,
} from "lucide-react";
import axios from "axios";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

// Define TypeScript interfaces for our data models
interface BusinessData {
  business_name: string;
  categoryId: string;
  gst_no: string;
  business_branches: number;
  no_of_staff: number;
  countryId: string;
  stateId: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export default function ClientRegistration() {
  // Refs for GSAP animations
  const formContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const licenseKeyRef = useRef<HTMLDivElement>(null);

  // Track current step
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [registeredBusiness, setRegisteredBusiness] = useState([]);

  // Form data state
  const [businessData, setBusinessData] = useState<BusinessData>({
    business_name: "",
    categoryId: "",
    gst_no: "",
    business_branches: 1,
    no_of_staff: 1,
    countryId: "",
    stateId: "",
  });

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  });

  // Data lists for dropdowns
  const [businessCategories, setBusinessCategories] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [stepsAnimationComplete, setStepsAnimationComplete] = useState(false);

  useEffect(() => {
    // Initial load animation
    const tl = gsap.timeline();

    tl.from(formContainerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(
      stepsRef.current?.children || [],
      {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => setStepsAnimationComplete(true),
      },
      "-=0.4"
    );

    // Fetch data from APIs
    const fetchDropdownData = async () => {
      try {
        // Fetch business categories
        const categoriesResponse = await axios.get(
          "/api/masters/category/list"
        );
        const categoriesData = categoriesResponse.data.categoryList.map(
          (category: any) => ({
            id: category.id,
            name: category.name,
          })
        );
        setBusinessCategories(categoriesData);

        // Fetch countries
        const countriesResponse = await axios.get("/api/masters/country/list");
        const countriesData = countriesResponse.data.countryList.map(
          (country: any) => ({
            id: country.id,
            name: country.name,
          })
        );
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Update progress bar when step changes
  useEffect(() => {
    if (stepsAnimationComplete && progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${(currentStep / 5) * 100}%`,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  }, [currentStep, stepsAnimationComplete]);

  // Animate content when step changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }

    if (buttonContainerRef.current) {
      gsap.fromTo(
        buttonContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.2, ease: "power2.out" }
      );
    }

    // Special animation for license key on final step
    if (currentStep === 4 && licenseKeyRef.current) {
      gsap.fromTo(
        licenseKeyRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.5,
          ease: "elastic.out(1, 0.8)",
        }
      );
    }
  }, [currentStep]);

  // Validate form data
  const validateBusinessData = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!businessData.business_name.trim()) {
      errors.push({
        field: "business_name",
        message: "Business name is required",
      });
    }

    if (!businessData.categoryId) {
      errors.push({
        field: "categoryId",
        message: "Business category is required",
      });
    }

    if (!businessData.countryId) {
      errors.push({ field: "countryId", message: "Country is required" });
    }

    if (!businessData.stateId && businessData.countryId) {
      errors.push({ field: "stateId", message: "State/Province is required" });
    }

    if (businessData.business_branches < 1) {
      errors.push({
        field: "business_branches",
        message: "Must have at least 1 branch",
      });
    }

    if (businessData.no_of_staff < 1) {
      errors.push({
        field: "no_of_staff",
        message: "Must have at least 1 staff member",
      });
    }

    // GST validation if provided (can be optional)
    if (businessData.gst_no && !validateGSTNumber(businessData.gst_no)) {
      errors.push({
        field: "gst_no",
        message: "Please enter a valid GST number",
      });
    }

    return errors;
  };

  const validateUserData = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!userData.name.trim()) {
      errors.push({ field: "name", message: "Full name is required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      errors.push({
        field: "email",
        message: "Valid email address is required",
      });
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    if (!userData.phone.trim() || !phoneRegex.test(userData.phone)) {
      errors.push({
        field: "phone",
        message: "Valid phone number is required",
      });
    }
    return errors;
  };

  // Validate GST number (basic implementation - would need country-specific validation in production)
  const validateGSTNumber = (gst: string): boolean => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    if (!gstRegex.test(gst)) {
      return false;
    }
    return true;
  };

  // Update business data fields
  const handleBusinessChange = async (
    field: keyof BusinessData,
    value: string | number
  ) => {
    setBusinessData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // If changing country, reset state
    if (field === "countryId") {
      setBusinessData((prev) => ({
        ...prev,
        stateId: "",
      }));

      const statesResponse = await axios.get(
        `/api/masters/state/list?countryId=${value}`
      );
      const statesData = statesResponse.data.stateList.map((state: any) => ({
        id: state.id,
        name: state.name,
        countryId: state.countryId,
      }));
      console.log(statesData);

      setStates(statesData);
    }

    // Clear related error if present
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  // Update user data fields
  const handleUserChange = (field: keyof UserData, value: string | boolean) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear related error if present
    setErrors((prev) => prev.filter((error) => error.field !== field));
  };

  // Go to next step with validation
  const handleNextStep = () => {
    let currentErrors: ValidationError[] = [];

    if (currentStep === 1) {
      currentErrors = validateBusinessData();
    } else if (currentStep === 2) {
      currentErrors = validateUserData();
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);

      // Shake the form container to indicate validation errors
      gsap.to(formContainerRef.current, {
        keyframes: [{ x: -10 }, { x: 10 }, { x: -5 }, { x: 5 }, { x: 0 }],
        duration: 0.4,
        ease: "power1.inOut",
      });

      return;
    }

    if (currentStep < 4) {
      setErrors([]);
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors([]);
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit the registration form
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Simulate API call with loading state
      // In a real app, send data to backend
      console.log("Business Data:", businessData);
      console.log("User Data:", userData);

      const payload = {
        ...businessData,
        adminUser: userData,
      };

      await axios
        .post("/api/business/create", payload)
        .then((response) => {
          setRegisteredBusiness(response.data.business);
        })
        .catch((error) => {
          console.error("Error creating business:", error);
          setLoading(false);
          // Show a general error
          setErrors([
            {
              field: "general",
              message: "Failed to complete registration. Please try again.",
            },
          ]);
        });
      setIsCompleted(true);
      setCurrentStep(4);
      setLoading(false);
    } catch (error) {
      console.error("Error registering client:", error);
      setLoading(false);

      // Show a general error
      setErrors([
        {
          field: "general",
          message: "Failed to complete registration. Please try again.",
        },
      ]);
    }
  };

  // Generate a license key (mock implementation)
  const generateLicenseKey = async () => {
    try {
      const response = await axios.post("/api/license/generate", {
        businessId: registeredBusiness.id,
        staffLimit: registeredBusiness.no_of_staff,
      });
      setLicenseKey(response.data.license);
      setCurrentStep(5);
    } catch (error) {
      console.error("Error generating license key:", error);
    }
  };

  // Copy license key to clipboard
  const copyLicenseKey = () => {
    navigator.clipboard.writeText(licenseKey);

    // Show copy animation
    if (licenseKeyRef.current) {
      gsap.to(licenseKeyRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(licenseKeyRef.current, {
            scale: 1,
            duration: 0.2,
            ease: "power1.in",
          });
        },
      });
    }

    // Show a temporary tooltip (in a real app, use a toast notification)
    alert("License key copied to clipboard!");
  };

  // Check if a specific field has an error
  const hasError = (field: string): boolean => {
    return errors.some((error) => error.field === field);
  };

  // Get error message for a specific field
  const getErrorMessage = (field: string): string => {
    const error = errors.find((error) => error.field === field);
    return error ? error.message : "";
  };

  return (
    // bg is pending
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8" ref={formContainerRef}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-800 sm:text-4xl tracking-tight">
            Business Registration
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Join the BillSane ecosystem and streamline your business operations
            today
          </p>
        </div>

        {/* Stepper Progress */}
        <div
          className="flex justify-between items-center mt-12 mb-8 relative"
          ref={stepsRef}
        >
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                  currentStep > step
                    ? "bg-green-500 text-white"
                    : currentStep === step
                    ? "bg-munsell_blue-700 text-white ring-4 ring-munsell_blue-700/60"
                    : "bg-white text-gray-400"
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle size={24} className="text-white" />
                ) : step === 1 ? (
                  <Building size={20} />
                ) : step === 2 ? (
                  <User size={20} />
                ) : step === 3 ? (
                  <CheckSquare size={20} />
                ) : step === 4 ? (
                  <CreditCard size={20} />
                ) : (
                  <Copy size={20} />
                )}
              </div>
              <div
                className={`text-sm mt-3 font-medium transition-all duration-300 ${
                  currentStep === step ? "text-prussian_blue" : "text-gray-600"
                }`}
              >
                {step === 1 && "Business Info"}
                {step === 2 && "Admin Details"}
                {step === 3 && "Review"}
                {step === 4 && "Payment"}
                {step === 5 && "License Key"}
              </div>
            </div>
          ))}

          {/* Connecting line between steps */}
          <div className="absolute top-7 left-0 w-full h-0.5 bg-gray-200 -z-10" />
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="bg-gradient-to-r from-munsell_blue-700 to-munsell_blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Main Content Card */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden transition-all duration-500">
          <div ref={contentRef} className="p-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-munsell_blue-200 rounded-full">
                    <Building size={24} className="text-munsell_blue-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-800">
                      Business Information
                    </h2>
                    <p className="text-primary-600">
                      Tell us about your business to get started with BillSane.
                    </p>
                  </div>
                </div>

                {/* General error message if any */}
                {hasError("general") && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2 mb-4">
                    <AlertCircle size={18} />
                    <span>{getErrorMessage("general")}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="business_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Business Name
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="business_name"
                      value={businessData.business_name}
                      onChange={(e) =>
                        handleBusinessChange("business_name", e.target.value)
                      }
                      className={` ${
                        hasError("business_name")
                          ? "input-error"
                          : "input-success"
                      } `}
                      placeholder="Your Business Name"
                    />
                    {hasError("business_name") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("business_name")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Business Category
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={businessData.categoryId}
                      onChange={(e) =>
                        handleBusinessChange(
                          "categoryId",
                          Number(e.target.value)
                        )
                      }
                      className={`appearance-none
                         ${
                           hasError("categoryId")
                             ? "input-error"
                             : "input-success"
                         }`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select Category</option>
                      {businessCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {hasError("categoryId") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("categoryId")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gst_no"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      GST Number
                    </label>
                    <input
                      type="text"
                      id="gst_no"
                      value={businessData.gst_no}
                      onChange={(e) =>
                        handleBusinessChange("gst_no", e.target.value)
                      }
                      className={`${
                        hasError("gst_no") ? "input-error" : "input-success"
                      }`}
                      placeholder="GST Number (if applicable)"
                    />
                    {hasError("gst_no") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("gst_no")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="business_branches"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of Branches
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="business_branches"
                      min="1"
                      value={businessData.business_branches}
                      onChange={(e) =>
                        handleBusinessChange(
                          "business_branches",
                          parseInt(e.target.value)
                        )
                      }
                      className={`${
                        hasError("business_branches")
                          ? "input-error"
                          : "input-success"
                      }`}
                    />
                    {hasError("business_branches") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("business_branches")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="no_of_staff"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of Staff
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="no_of_staff"
                      min="1"
                      value={businessData.no_of_staff}
                      onChange={(e) =>
                        handleBusinessChange(
                          "no_of_staff",
                          parseInt(e.target.value)
                        )
                      }
                      className={`${
                        hasError("no_of_staff")
                          ? "input-error"
                          : "input-success"
                      }`}
                    />
                    {hasError("no_of_staff") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("no_of_staff")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country<span className="text-sm text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      value={businessData.countryId}
                      onChange={(e) =>
                        handleBusinessChange(
                          "countryId",
                          Number(e.target.value)
                        )
                      }
                      className={`appearance-none ${
                        hasError("countryId") ? "input-error" : "input-success"
                      }`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {hasError("countryId") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("countryId")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State/Province
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      value={businessData.stateId}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleBusinessChange("stateId", Number(e.target.value));
                      }}
                      className={`appearance-none ${
                        hasError("stateId") ? "input-error" : "input-success"
                      }
                      ${
                        !businessData.countryId
                          ? "bg-gray-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={!businessData.countryId}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {hasError("stateId") && businessData.countryId && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("stateId")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Admin User Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-munsell_blue-200 rounded-full">
                    <User size={24} className="text-munsell_blue-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-800">
                      Admin User Details
                    </h2>
                    <p className="text-primary-600">
                      This user will have full administrative access to your
                      BillSane account.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="admin_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="admin_name"
                      value={userData.name}
                      onChange={(e) => handleUserChange("name", e.target.value)}
                      className={`${
                        hasError("name") ? "input-error" : "input-success"
                      }`}
                      placeholder="Your Full Name"
                    />
                    {hasError("name") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("name")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="admin_email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="admin_email"
                      value={userData.email}
                      onChange={(e) =>
                        handleUserChange("email", e.target.value)
                      }
                      className={`${
                        hasError("email") ? "input-error" : "input-success"
                      }`}
                      placeholder="you@example.com"
                    />
                    {hasError("email") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("email")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="admin_phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                      <span className="text-sm text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="admin_phone"
                      value={userData.phone}
                      onChange={(e) =>
                        handleUserChange("phone", e.target.value)
                      }
                      className={`${
                        hasError("phone") ? "input-error" : "input-success"
                      }`}
                      placeholder="Your Phone Number"
                    />
                    {hasError("phone") && (
                      <p className="mt-1 text-sm text-red-600">
                        {getErrorMessage("phone")}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <label
                        htmlFor="is_admin"
                        className="ml-3 block text-sm text-gray-700"
                      >
                        This user will be an admin with full access to all
                        features and settings
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mt-8">
                  <h3 className="font-medium text-amber-800 mb-1">
                    Security Note
                  </h3>
                  <p className="text-sm text-amber-700">
                    The admin user will receive a verification email to confirm
                    their identity. They will need to set a secure password upon
                    first login.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Review Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-munsell_blue-200 rounded-full">
                    <CheckSquare size={24} className="text-munsell_blue-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-800">
                      Review Your Information
                    </h2>
                    <p className="text-primary-600">
                      Please confirm that the following details are correct
                      before proceeding.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-munsell_blue-700 to-munsell_blue-600 px-4 py-3">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Building size={20} className="mr-2" />
                        Business Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Business Name
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {businessData.business_name || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Business Category
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {businessCategories.find(
                            (c) => c.id == businessData.categoryId
                          )?.name || "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          GST Number
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {businessData.gst_no || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Number of Branches
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {businessData.business_branches}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Number of Staff
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {businessData.no_of_staff}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Country
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {countries.find((c) => c.id == businessData.countryId)
                            ?.name || "Not selected"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          State/Province
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {states.find((s) => s.id == businessData.stateId)
                            ?.name || "Not selected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-munsell_blue-700 to-munsell_blue-600 px-4 py-3">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <User size={20} className="mr-2" />
                        Admin User Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Full Name
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {userData.name || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Email Address
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {userData.email || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Phone Number
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1">
                          {userData.phone || "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          User Role
                        </p>
                        <p className="text-base font-medium text-gray-800 mt-1 flex items-center">
                          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center">
                            <CheckCircle size={14} className="mr-1" />
                            Administrator
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-munsell_blue-500 bg-blue-50 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-munsell_blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-munsell_blue-700">
                        By completing this registration, you agree to BillSane's
                        Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-munsell_blue-200 rounded-full">
                    <CreditCard size={24} className="text-munsell_blue-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-primary-800">
                      Payment
                    </h2>
                    <p className="text-primary-600">
                      Please complete your payment to finalize the registration
                      process.{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={generateLicenseKey}
                    className="bg-munsell_blue cursor-pointer py-3 w-full rounded-lg text-white font-semibold shadow-md hover:bg-munsell_blue-700 transition duration-200 flex items-center justify-center space-x-2"
                  >
                    Pay
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: License Key */}
            {currentStep === 5 && (
              <div className="space-y-8 text-center">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-primary-800">
                  Registration Complete!
                </h2>
                <p className="text-primary-600 max-w-lg mx-auto">
                  Your business has been successfully registered with BillSane.
                  Please use the license key below to activate your desktop
                  application.
                </p>

                <div
                  ref={licenseKeyRef}
                  className="bg-gradient-to-br from-munsell_blue-50/80 to-munsell_blue-100 p-8 rounded-xl shadow-inner text-center mx-auto max-w-2xl"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Your License Key
                  </h3>
                  <div className="bg-white border border-gray-300 rounded-lg p-4 font-mono text-xl tracking-wider shadow-sm">
                    {licenseKey}
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    This key has been sent to your registered email address as
                    well.
                  </p>
                </div>

                <div className="flex flex-col space-y-4 max-w-xs mx-auto">
                  <button
                    onClick={copyLicenseKey}
                    className="bg-munsell_blue-600 text-white py-3 px-6 rounded-lg hover:bg-munsell_blue-700 transition duration-200 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Copy size={18} />
                    <span>Copy License Key</span>
                  </button>

                  <a
                    href="#"
                    className="flex items-center justify-center space-x-2 text-munsell_blue-700 hover:text-munsell_blue-800 hover:underline text-sm"
                  >
                    <Download size={16} />
                    <span>Download BillSane Desktop Application</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {!isCompleted && currentStep !== 4 && (
            <div
              ref={buttonContainerRef}
              className="flex justify-between mt-4 px-8 py-6 bg-gray-50 border-t border-gray-200"
            >
              {currentStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="py-2 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
                >
                  <ChevronLeft size={18} className="mr-1" />
                  Previous
                </button>
              ) : (
                <div></div> // Empty div to maintain layout
              )}

              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="bg-munsell_blue-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-munsell_blue-700 transition duration-200 flex items-center shadow-md"
                >
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </button>
              ) : currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  className={`bg-munsell_blue-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-munsell_blue-700 transition duration-200 flex items-center shadow-md ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle size={18} className="ml-2" />
                    </>
                  )}
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
