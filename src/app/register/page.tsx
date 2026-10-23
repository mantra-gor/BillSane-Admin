"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Check, Copy, Pencil } from "lucide-react";
import axios from "axios";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Field, { Input, Select } from "@/components/ui/Field";
import { Container } from "@/components/ui/Section";
import PlanSummary, { type ChosenPlan } from "@/components/register/PlanSummary";
import Stepper from "@/components/register/Stepper";
import { formatPrice } from "@/lib/utils";
import { Category, Country, State } from "@/types";

interface BusinessData {
  business_name: string;
  categoryId: number;
  gst_no: string;
  business_branches: number;
  no_of_staff: number;
  countryId: number;
  stateId: number;
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

// The input each validated field lives in, so the first problem can take focus.
const FIELD_INPUT: Record<string, string> = {
  business_name: "business_name",
  categoryId: "category",
  gst_no: "gst_no",
  business_branches: "business_branches",
  no_of_staff: "no_of_staff",
  countryId: "country",
  stateId: "state",
  name: "admin_name",
  email: "admin_email",
  phone: "admin_phone",
};

const GSTIN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
const TAX_ID = /^[A-Z0-9][A-Z0-9\-\s]{3,18}[A-Z0-9]$/;

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function ClientRegistration() {
  // Scroll target on step change: the stepper, so progress stays in view.
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [copied, setCopied] = useState<"idle" | "copied" | "failed">("idle");
  const [registeredBusiness, setRegisteredBusiness] = useState<
    (BusinessData & { id?: number }) | null
  >(null);
  const [adminId, setAdminId] = useState<number | null>(null);

  const [businessData, setBusinessData] = useState<BusinessData>({
    business_name: "",
    categoryId: 0,
    gst_no: "",
    business_branches: 1,
    no_of_staff: 1,
    countryId: 0,
    stateId: 0,
  });

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  });

  const [businessCategories, setBusinessCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [statesLoading, setStatesLoading] = useState(false);
  const [mastersFailed, setMastersFailed] = useState(false);

  const [plan, setPlan] = useState<ChosenPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(true);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, countriesRes] = await Promise.all([
          axios.get("/api/masters/category/list"),
          axios.get("/api/masters/country/list"),
        ]);
        setBusinessCategories(
          categoriesRes.data.categoryList.map((cat: Category) => ({ id: cat.id, name: cat.name }))
        );
        setCountries(
          countriesRes.data.countryList.map((country: Country) => ({
            id: country.id,
            code: country.code,
            name: country.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        setMastersFailed(true);
      }
    };
    fetchDropdownData();
  }, []);

  // The plan chosen on /pricing travels in sessionStorage as `order`.
  useEffect(() => {
    const loadPlan = async () => {
      try {
        const order = JSON.parse(sessionStorage.getItem("order") ?? "null");
        if (!order?.planId) return;
        const res = await axios.get(`/api/masters/plan/list?planId=${order.planId}`);
        if (res.data.plantList) setPlan(res.data.plantList);
      } catch (error) {
        console.error("Error loading chosen plan:", error);
      } finally {
        setPlanLoading(false);
      }
    };
    loadPlan();
  }, []);

  // On every step change after the first, bring the card into view and move
  // focus to the step's heading so keyboard and screen-reader users follow.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cardRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    headingRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  const selectedCountry = countries.find((c) => c.id === businessData.countryId);
  const isIndia = selectedCountry?.code === "IN";

  const validateBusinessData = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (!businessData.business_name.trim()) {
      errors.push({ field: "business_name", message: "Enter your business name" });
    }
    if (!businessData.categoryId) {
      errors.push({ field: "categoryId", message: "Choose the kind of business you run" });
    }
    if (!businessData.countryId) {
      errors.push({ field: "countryId", message: "Choose your country" });
    }
    if (!businessData.stateId && businessData.countryId) {
      errors.push({ field: "stateId", message: "Choose your state or province" });
    }
    if (!Number.isInteger(businessData.business_branches) || businessData.business_branches < 1) {
      errors.push({ field: "business_branches", message: "Enter at least 1 branch" });
    }
    if (!Number.isInteger(businessData.no_of_staff) || businessData.no_of_staff < 1) {
      errors.push({ field: "no_of_staff", message: "Enter at least 1 person" });
    }
    if (businessData.gst_no && !(isIndia ? GSTIN : TAX_ID).test(businessData.gst_no)) {
      errors.push({
        field: "gst_no",
        message: isIndia
          ? "Enter a valid 15-character GSTIN, like 27ABCDE1234F1Z5"
          : "Enter a valid tax registration number",
      });
    }
    return errors;
  };

  const validateUserData = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    if (!userData.name.trim()) {
      errors.push({ field: "name", message: "Enter the admin's full name" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim() || !emailRegex.test(userData.email)) {
      errors.push({ field: "email", message: "Enter a valid email address, like you@business.com" });
    }
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    if (!userData.phone.trim() || !phoneRegex.test(userData.phone)) {
      errors.push({ field: "phone", message: "Enter a valid phone number, with country code" });
    }
    return errors;
  };

  const handleBusinessChange = async (field: keyof BusinessData, value: string | number) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((error) => error.field !== field && error.field !== "general"));

    if (field === "countryId") {
      setBusinessData((prev) => ({ ...prev, stateId: 0 }));
      setStates([]);
      if (!value) return;
      setStatesLoading(true);
      try {
        const statesResponse = await axios.get(`/api/masters/state/list?countryId=${value}`);
        setStates(
          statesResponse.data.stateList.map((state: State) => ({
            id: state.id,
            name: state.name,
            countryId: state.countryId,
          }))
        );
      } catch (error) {
        console.error("Error fetching states:", error);
        setErrors((prev) => [
          ...prev,
          { field: "stateId", message: "We couldn't load states. Choose the country again." },
        ]);
      } finally {
        setStatesLoading(false);
      }
    }
  };

  const handleUserChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => prev.filter((error) => error.field !== field && error.field !== "general"));
  };

  const showErrors = (found: ValidationError[]) => {
    setErrors(found);
    const first = FIELD_INPUT[found[0]?.field];
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  };

  const handleNextStep = () => {
    const found =
      currentStep === 1 ? validateBusinessData() : currentStep === 2 ? validateUserData() : [];
    if (found.length > 0) {
      showErrors(found);
      return;
    }
    if (currentStep < 4) {
      setErrors([]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors([]);
      setCurrentStep(currentStep - 1);
    }
  };

  // Creates the business and its admin. Only moves on to payment when that worked.
  const handleSubmit = async () => {
    setLoading(true);
    setErrors([]);
    try {
      const response = await axios.post("/api/business/create", {
        ...businessData,
        adminUser: userData,
      });
      setRegisteredBusiness(response.data.business);
      setAdminId(response.data.admin?.id ?? null);
      setIsCompleted(true);
      setCurrentStep(4);
    } catch (error) {
      console.error("Error creating business:", error);
      setErrors([
        {
          field: "general",
          message: "We couldn't complete your registration. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadCheckoutScript = () =>
    new Promise<boolean>((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const paymentError = (message: string) => {
    setLoading(false);
    setErrors([{ field: "general", message }]);
  };

  // Opens Razorpay Checkout. The license is issued by the server only after it
  // verifies the payment signature.
  const handlePayment = async () => {
    setLoading(true);
    setErrors([]);
    try {
      if (!registeredBusiness?.id || !adminId || !plan) {
        throw new Error("Missing business, admin or plan");
      }
      if (!(await loadCheckoutScript())) {
        return paymentError("We couldn't load the payment window. Check your connection and try again.");
      }
      const { data: order } = await axios.post("/api/payment/create-order", {
        businessId: registeredBusiness.id,
        userId: adminId,
        planId: plan.id,
      });

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "BillSane",
        description: order.planName,
        prefill: { name: userData.name, email: userData.email, contact: userData.phone },
        handler: async (res: RazorpayResponse) => {
          try {
            const { data } = await axios.post("/api/payment/verify", res);
            setLicenseKey(data.license);
            setCurrentStep(5);
            setLoading(false);
          } catch (error) {
            console.error("Error verifying payment:", error);
            paymentError(
              "We couldn't confirm your payment. If money was deducted, contact support with your payment ID: " +
                res.razorpay_payment_id
            );
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      checkout.on("payment.failed", () =>
        paymentError("The payment didn't go through. Please try again.")
      );
      checkout.open();
    } catch (error) {
      console.error("Error starting payment:", error);
      paymentError("We couldn't start the payment. Please try again in a moment.");
    }
  };

  const copyLicenseKey = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2400);
  };

  const errorFor = (field: string) => errors.find((error) => error.field === field)?.message;

  const generalError = errorFor("general");
  const stepHeading = (title: string, description: string) => (
    <header className="mb-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-[1.75rem] font-semibold leading-tight text-ink outline-none sm:text-[2rem]"
      >
        {title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{description}</p>
    </header>
  );

  const reviewRow = (label: string, value: string) => (
    <div className="py-3 sm:grid sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-4">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className="mt-0.5 break-words text-[15px] font-medium text-ink sm:mt-0">{value}</dd>
    </div>
  );

  return (
    <div className="bg-canvas pb-20 pt-10 sm:pb-28 sm:pt-16">
      <Container>
        <header data-hero className="max-w-2xl">
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] text-ink sm:text-5xl">
            Register your business
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A few details about your business and who will manage it, then payment.
            Your license key is ready at the end.
          </p>
        </header>

        <div ref={cardRef} className="mt-10 scroll-mt-24">
          <Stepper current={currentStep} />
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
          <div className="rounded-2xl bg-surface shadow-card">
            <div key={currentStep} className="step-enter p-6 sm:p-10">
              {(generalError || mastersFailed) && (
                <div
                  role="alert"
                  className="mb-8 flex items-start gap-3 rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink shadow-[inset_0_0_0_1px_var(--color-danger-border)]"
                >
                  <AlertCircle size={18} aria-hidden="true" className="mt-px shrink-0" />
                  <span>
                    {generalError ??
                      "We couldn't load business categories and countries. Refresh the page to try again."}
                  </span>
                </div>
              )}

              {currentStep === 1 && (
                <>
                  {stepHeading(
                    "About your business",
                    "This is how your business will appear in BillSane and on your bills."
                  )}
                  <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                    <Field
                      label="Business name"
                      htmlFor="business_name"
                      required
                      error={errorFor("business_name")}
                      className="md:col-span-2"
                    >
                      <Input
                        id="business_name"
                        autoComplete="organization"
                        value={businessData.business_name}
                        invalid={!!errorFor("business_name")}
                        onChange={(e) => handleBusinessChange("business_name", e.target.value)}
                        placeholder="As it should appear on your bills"
                      />
                    </Field>

                    <Field label="Type of business" htmlFor="category" required error={errorFor("categoryId")}>
                      <Select
                        id="category"
                        value={businessData.categoryId || ""}
                        invalid={!!errorFor("categoryId")}
                        onChange={(e) => handleBusinessChange("categoryId", Number(e.target.value))}
                      >
                        <option value="">Choose a category</option>
                        {businessCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field
                      label="Tax registration number"
                      htmlFor="gst_no"
                      error={errorFor("gst_no")}
                      hint={isIndia ? "Your 15-character GSTIN, if you have one." : "GST or VAT number, if you have one."}
                    >
                      <Input
                        id="gst_no"
                        value={businessData.gst_no}
                        invalid={!!errorFor("gst_no")}
                        onChange={(e) => handleBusinessChange("gst_no", e.target.value.toUpperCase())}
                        placeholder="Optional"
                        autoCapitalize="characters"
                        spellCheck={false}
                      />
                    </Field>

                    <Field label="Country" htmlFor="country" required error={errorFor("countryId")}>
                      <Select
                        id="country"
                        autoComplete="country-name"
                        value={businessData.countryId || ""}
                        invalid={!!errorFor("countryId")}
                        onChange={(e) => handleBusinessChange("countryId", Number(e.target.value))}
                      >
                        <option value="">Choose a country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field
                      label="State or province"
                      htmlFor="state"
                      required
                      error={businessData.countryId ? errorFor("stateId") : undefined}
                      hint={!businessData.countryId ? "Choose a country first." : undefined}
                    >
                      <Select
                        id="state"
                        value={businessData.stateId || ""}
                        invalid={!!businessData.countryId && !!errorFor("stateId")}
                        disabled={!businessData.countryId || statesLoading}
                        onChange={(e) => handleBusinessChange("stateId", Number(e.target.value))}
                      >
                        <option value="">{statesLoading ? "Loading…" : "Choose a state"}</option>
                        {states.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field label="Branches" htmlFor="business_branches" required error={errorFor("business_branches")}>
                      <Input
                        id="business_branches"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        className="tnum"
                        value={Number.isNaN(businessData.business_branches) ? "" : businessData.business_branches}
                        invalid={!!errorFor("business_branches")}
                        onChange={(e) => handleBusinessChange("business_branches", parseInt(e.target.value))}
                      />
                    </Field>

                    <Field
                      label="People on your team"
                      htmlFor="no_of_staff"
                      required
                      error={errorFor("no_of_staff")}
                      hint="Everyone who will use BillSane, including you."
                    >
                      <Input
                        id="no_of_staff"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        className="tnum"
                        value={Number.isNaN(businessData.no_of_staff) ? "" : businessData.no_of_staff}
                        invalid={!!errorFor("no_of_staff")}
                        onChange={(e) => handleBusinessChange("no_of_staff", parseInt(e.target.value))}
                      />
                    </Field>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {stepHeading(
                    "Who will manage BillSane?",
                    "This person is the administrator, with full access to every feature and setting. They can add the rest of your team later."
                  )}
                  <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                    <Field label="Full name" htmlFor="admin_name" required error={errorFor("name")} className="md:col-span-2">
                      <Input
                        id="admin_name"
                        autoComplete="name"
                        value={userData.name}
                        invalid={!!errorFor("name")}
                        onChange={(e) => handleUserChange("name", e.target.value)}
                      />
                    </Field>
                    <Field label="Email address" htmlFor="admin_email" required error={errorFor("email")}>
                      <Input
                        id="admin_email"
                        type="email"
                        autoComplete="email"
                        value={userData.email}
                        invalid={!!errorFor("email")}
                        onChange={(e) => handleUserChange("email", e.target.value)}
                        placeholder="you@business.com"
                      />
                    </Field>
                    <Field
                      label="Phone number"
                      htmlFor="admin_phone"
                      required
                      error={errorFor("phone")}
                      hint="Include your country code."
                    >
                      <Input
                        id="admin_phone"
                        type="tel"
                        autoComplete="tel"
                        value={userData.phone}
                        invalid={!!errorFor("phone")}
                        onChange={(e) => handleUserChange("phone", e.target.value)}
                      />
                    </Field>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {stepHeading("Check your details", "Make sure everything is right before you continue.")}
                  <div className="space-y-6">
                    <section className="rounded-xl bg-canvas px-5 py-2 shadow-ring">
                      <div className="flex items-center justify-between border-b border-line py-3">
                        <h3 className="font-sans text-base font-semibold tracking-normal text-ink">Business</h3>
                        <Button variant="ghost" size="sm" icon={<Pencil size={13} aria-hidden="true" />} onClick={() => setCurrentStep(1)}>
                          Edit
                        </Button>
                      </div>
                      <dl className="divide-y divide-line">
                        {reviewRow("Business name", businessData.business_name)}
                        {reviewRow(
                          "Type of business",
                          businessCategories.find((c) => c.id === businessData.categoryId)?.name ?? "Not chosen"
                        )}
                        {reviewRow("Tax registration number", businessData.gst_no || "Not provided")}
                        {reviewRow(
                          "Location",
                          [states.find((s) => s.id === businessData.stateId)?.name, selectedCountry?.name]
                            .filter(Boolean)
                            .join(", ")
                        )}
                        {reviewRow("Branches", String(businessData.business_branches))}
                        {reviewRow("People on your team", String(businessData.no_of_staff))}
                      </dl>
                    </section>

                    <section className="rounded-xl bg-canvas px-5 py-2 shadow-ring">
                      <div className="flex items-center justify-between border-b border-line py-3">
                        <h3 className="flex items-center gap-2.5 font-sans text-base font-semibold tracking-normal text-ink">
                          Administrator
                          <Badge tone="brand">Full access</Badge>
                        </h3>
                        <Button variant="ghost" size="sm" icon={<Pencil size={13} aria-hidden="true" />} onClick={() => setCurrentStep(2)}>
                          Edit
                        </Button>
                      </div>
                      <dl className="divide-y divide-line">
                        {reviewRow("Full name", userData.name)}
                        {reviewRow("Email address", userData.email)}
                        {reviewRow("Phone number", userData.phone)}
                      </dl>
                    </section>

                    <p className="text-sm leading-relaxed text-ink-muted">
                      By completing registration, you agree to BillSane&apos;s Terms of Service and Privacy
                      Policy.
                    </p>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  {stepHeading(
                    "Payment",
                    "Your business is registered. Pay for your plan to get your license key."
                  )}
                  <div className="rounded-xl bg-canvas p-5 shadow-ring">
                    {plan ? (
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-ink">{plan.name}</p>
                          <p className="mt-0.5 text-sm text-ink-muted">One-time payment · lifetime license</p>
                        </div>
                        <p className="tnum font-display text-3xl font-semibold text-ink [font-stretch:92%]">
                          {formatPrice(plan.price)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-ink-muted">
                        No plan chosen.{" "}
                        <a href="/pricing" className="font-semibold text-munsell_blue-700 underline underline-offset-4">
                          Choose a plan
                        </a>{" "}
                        to see what you&apos;ll pay.
                      </p>
                    )}
                  </div>
                  <Button
                    variant="accent"
                    size="lg"
                    fullWidth
                    className="mt-6"
                    loading={loading}
                    onClick={handlePayment}
                  >
                    {plan ? `Pay ${formatPrice(plan.price)}` : "Pay"}
                  </Button>
                  <p className="mt-3 text-center text-[13px] text-ink-muted">Payments are processed by Razorpay.</p>
                </>
              )}

              {currentStep === 5 && (
                <div className="text-center">
                  <span className="inline-flex size-14 items-center justify-center rounded-full bg-success-soft text-success shadow-[inset_0_0_0_1px_var(--color-success-border)]">
                    <Check size={28} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <h2
                    ref={headingRef}
                    tabIndex={-1}
                    className="mt-5 text-[1.75rem] font-semibold leading-tight text-ink outline-none sm:text-[2rem]"
                  >
                    You&apos;re registered
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-muted">
                    {businessData.business_name} is set up with BillSane. Keep your license key somewhere
                    safe: you&apos;ll use it to activate the desktop app.
                  </p>

                  <div className="bill-paper mx-auto mt-8 max-w-xl rounded-b-2xl bg-canvas px-6 pb-6 pt-8 shadow-[inset_0_0_0_1px_rgb(12_34_49_/_0.1)]">
                    <p className="text-[13px] font-semibold text-ink-soft">Your license key</p>
                    <p className="mt-2 select-all break-all font-mono text-lg font-semibold tracking-[0.06em] text-ink sm:text-xl">
                      {licenseKey}
                    </p>
                    <Button
                      variant="primary"
                      className="mt-5"
                      icon={
                        copied === "copied" ? (
                          <Check size={16} aria-hidden="true" />
                        ) : (
                          <Copy size={16} aria-hidden="true" />
                        )
                      }
                      onClick={copyLicenseKey}
                    >
                      {copied === "copied" ? "Copied" : "Copy key"}
                    </Button>
                    <p aria-live="polite" className="mt-3 min-h-5 text-[13px] text-ink-muted">
                      {copied === "failed" ? "Couldn't copy automatically. Select the key and copy it." : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!isCompleted && currentStep < 4 && (
              <div className="flex items-center justify-between gap-3 rounded-b-2xl border-t border-line bg-surface-subtle px-6 py-4 sm:px-10">
                {currentStep > 1 ? (
                  <Button variant="ghost" icon={<ArrowLeft size={16} aria-hidden="true" />} onClick={handlePrevStep}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                {currentStep < 3 ? (
                  <Button variant="primary" trailing={<ArrowRight size={16} aria-hidden="true" />} onClick={handleNextStep}>
                    Continue
                  </Button>
                ) : (
                  <Button variant="primary" loading={loading} onClick={handleSubmit}>
                    {loading ? "Registering…" : "Complete registration"}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24">
            <PlanSummary plan={plan} loading={planLoading} locked={isCompleted} />
          </div>
        </div>
      </Container>
    </div>
  );
}
