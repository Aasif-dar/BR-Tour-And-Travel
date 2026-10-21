"use server";

import { readEnquiry, summariseEnquiry, validateEnquiry, type EnquiryInput, type FieldErrors } from "@/lib/enquiry";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: EnquiryInput }
  | { status: "sent" }
  // No delivery channel is configured — the client offers direct alternatives
  // instead of pretending the enquiry was received.
  | { status: "unconfigured"; summary: string; values: EnquiryInput }
  | { status: "error"; summary: string; values: EnquiryInput };

/**
 * BACKEND INTEGRATION POINT
 *
 * Set ENQUIRY_WEBHOOK_URL to any endpoint that accepts a JSON POST — for
 * example a CRM, a Google Apps Script, Zapier/Make, Formspree or your own API.
 * Optionally set ENQUIRY_WEBHOOK_SECRET; it is sent as a Bearer token.
 *
 * Submitted details are forwarded once and never logged or stored here.
 */
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (typeof formData.get("company") === "string" && formData.get("company") !== "") {
    return { status: "sent" };
  }

  const values = readEnquiry(formData);
  const errors = validateEnquiry(values);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  const summary = summariseEnquiry(values);
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return { status: "unconfigured", summary, values };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        source: "website",
        submittedAt: new Date().toISOString(),
        enquiry: { ...values, consent: values.consent === "yes" },
        summary,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { status: "error", summary, values };
    return { status: "sent" };
  } catch {
    return { status: "error", summary, values };
  }
}
