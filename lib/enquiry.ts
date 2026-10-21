/**
 * Enquiry form schema and validation, shared by the client form and the
 * server action so both apply exactly the same rules.
 */

export const enquiryTypes = ["Umrah", "Hajj", "General enquiry"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export type EnquiryInput = {
  fullName: string;
  dialCode: string;
  phone: string;
  email: string;
  enquiryType: string;
  travellers: string;
  departureCity: string;
  travelMonth: string;
  packageName: string;
  message: string;
  consent: string;
};

export type EnquiryField = keyof EnquiryInput;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryInput = {
  fullName: "",
  dialCode: "",
  phone: "",
  email: "",
  enquiryType: "",
  travellers: "",
  departureCity: "",
  travelMonth: "",
  packageName: "",
  message: "",
  consent: "",
};

export const dialCodes = [
  { code: "+91", label: "India (+91)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+880", label: "Bangladesh (+880)" },
  { code: "+977", label: "Nepal (+977)" },
  { code: "+94", label: "Sri Lanka (+94)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+974", label: "Qatar (+974)" },
  { code: "+965", label: "Kuwait (+965)" },
  { code: "+968", label: "Oman (+968)" },
  { code: "+973", label: "Bahrain (+973)" },
  { code: "+44", label: "United Kingdom (+44)" },
  { code: "+1", label: "USA / Canada (+1)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+64", label: "New Zealand (+64)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+90", label: "Türkiye (+90)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+31", label: "Netherlands (+31)" },
] as const;

const limits: Partial<Record<EnquiryField, number>> = {
  fullName: 100,
  phone: 20,
  email: 160,
  departureCity: 80,
  travelMonth: 20,
  packageName: 120,
  message: 2000,
};

export function readEnquiry(formData: FormData): EnquiryInput {
  const out = { ...emptyEnquiry };
  for (const key of Object.keys(emptyEnquiry) as EnquiryField[]) {
    const value = formData.get(key);
    out[key] = typeof value === "string" ? value.trim() : "";
  }
  return out;
}

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.fullName.length < 2) errors.fullName = "Please enter your full name.";

  if (!input.dialCode) errors.dialCode = "Choose your country code.";
  const digits = input.phone.replace(/[\s()-]/g, "");
  if (!digits) errors.phone = "Please enter a phone number we can reach you on.";
  else if (!/^\d{6,15}$/.test(digits)) errors.phone = "Enter digits only, without the country code (6–15 digits).";

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email))
    errors.email = "That email address doesn't look right.";

  if (!enquiryTypes.includes(input.enquiryType as EnquiryType))
    errors.enquiryType = "Tell us what you are enquiring about.";

  const travellers = Number(input.travellers);
  if (!input.travellers) errors.travellers = "How many people are travelling?";
  else if (!Number.isInteger(travellers) || travellers < 1 || travellers > 200)
    errors.travellers = "Enter a number between 1 and 200.";

  if (input.travelMonth && !/^\d{4}-\d{2}$/.test(input.travelMonth))
    errors.travelMonth = "Choose a month and year.";

  if (input.consent !== "yes")
    errors.consent = "Please confirm we may use these details to respond to your enquiry.";

  for (const [field, max] of Object.entries(limits) as [EnquiryField, number][]) {
    if (input[field].length > max && !errors[field]) errors[field] = `Please keep this under ${max} characters.`;
  }

  return errors;
}

export function formatTravelMonth(value: string) {
  if (!/^\d{4}-\d{2}$/.test(value)) return value;
  const [y, m] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Plain-text summary, used for WhatsApp messages and the webhook payload. */
export function summariseEnquiry(input: EnquiryInput) {
  return [
    `Assalamu alaikum, I would like to enquire about ${input.packageName || input.enquiryType || "a journey"}.`,
    `Name: ${input.fullName}`,
    `Phone: ${input.dialCode} ${input.phone}`,
    input.email && `Email: ${input.email}`,
    input.travellers && `Travellers: ${input.travellers}`,
    input.departureCity && `Departing from: ${input.departureCity}`,
    input.travelMonth && `Preferred month: ${formatTravelMonth(input.travelMonth)}`,
    input.message && `Notes: ${input.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
