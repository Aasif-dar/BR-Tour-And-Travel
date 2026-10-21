"use client";

import {
  useActionState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  startTransition,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ArrowRight, Check, Copy, LoaderCircle } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import {
  dialCodes,
  emptyEnquiry,
  enquiryTypes,
  summariseEnquiry,
  validateEnquiry,
  type EnquiryField,
  type EnquiryInput,
  type EnquiryType,
  type FieldErrors,
} from "@/lib/enquiry";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

type Props = {
  defaultType?: EnquiryType;
  packageName?: string;
  idPrefix?: string;
};

const fieldOrder: EnquiryField[] = [
  "fullName",
  "dialCode",
  "phone",
  "email",
  "enquiryType",
  "travellers",
  "departureCity",
  "travelMonth",
  "message",
  "consent",
];

const noopSubscribe = () => () => {};

function upcomingMonths(count: number) {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    return {
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    };
  });
}

/** Wrapper that starts a fresh form if the visitor returns after a successful send. */
export function EnquiryForm(props: Props) {
  const [key, setKey] = useState(0);
  const sent = useRef(false);
  useLayoutEffect(
    () => () => {
      if (sent.current) {
        sent.current = false;
        setKey((k) => k + 1);
      }
    },
    [],
  );
  return <EnquiryFormInner key={key} {...props} onSent={() => (sent.current = true)} />;
}

function EnquiryFormInner({ defaultType, packageName, idPrefix = "enq", onSent }: Props & { onSent: () => void }) {
  const [state, formAction, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  const [values, setValues] = useState<EnquiryInput>({
    ...emptyEnquiry,
    dialCode: site.contact.defaultDialCode ?? "",
    enquiryType: defaultType ?? "",
    packageName: packageName ?? "",
  });
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  // Month options exist only on the client, so prerendered HTML never depends on "today".
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const months = useMemo(() => (hydrated ? upcomingMonths(24) : []), [hydrated]);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const errors: FieldErrors = state.status === "invalid" && Object.keys(clientErrors).length === 0 ? state.errors : clientErrors;
  const id = (f: string) => `${idPrefix}-${f}`;

  useEffect(() => {
    if (state.status === "sent") onSent();
    if (state.status !== "idle" && state.status !== "invalid") statusRef.current?.focus();
    if (state.status === "invalid") focusFirstError(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function focusFirstError(errs: FieldErrors) {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const v = type === "checkbox" ? ((e.target as HTMLInputElement).checked ? "yes" : "") : value;
    setValues((prev) => ({ ...prev, [name]: v }));
    if (clientErrors[name as EnquiryField]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name as EnquiryField];
        return next;
      });
    }
  }

  // Submitted manually rather than via the `action` prop: React resets a form
  // after an action, which would clear the (controlled) consent checkbox in the
  // DOM while state still says it is ticked.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setClientErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  }

  if (state.status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-white p-8 outline-none sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold">Thank you — your enquiry has been sent.</h3>
        <p className="prose-body mt-3">
          Our team will review your details and contact you on the number you provided. JazakAllahu khairan for
          considering BR Tour &amp; Travels.
        </p>
      </div>
    );
  }

  const fallback = state.status === "unconfigured" || state.status === "error" ? state : null;

  const describedBy = (f: EnquiryField, hint?: boolean) =>
    [errors[f] ? id(`${f}-error`) : null, hint ? id(`${f}-hint`) : null].filter(Boolean).join(" ") || undefined;

  const err = (f: EnquiryField) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="field-error">
        {errors[f]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={id("privacy")}>
      {/* Honeypot — hidden from people and assistive tech */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="packageName" value={values.packageName} />

      {packageName && (
        <p className="border-l-2 border-gold bg-sand px-4 py-3 text-sm">
          Enquiring about: <strong className="font-semibold">{packageName}</strong>
        </p>
      )}

      <div>
        <label htmlFor={id("fullName")} className="field-label">
          Full name <span className="text-gold-deep">*</span>
        </label>
        <input
          id={id("fullName")}
          name="fullName"
          className="field"
          autoComplete="name"
          value={values.fullName}
          onChange={update}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={describedBy("fullName")}
          required
        />
        {err("fullName")}
      </div>

      <fieldset>
        <legend className="field-label">
          Phone number <span className="text-gold-deep">*</span>
        </legend>
        <div className="grid grid-cols-[minmax(0,9.5rem)_1fr] gap-3">
          <div>
            <label htmlFor={id("dialCode")} className="sr-only">
              Country code
            </label>
            <select
              id={id("dialCode")}
              name="dialCode"
              className="field"
              autoComplete="tel-country-code"
              value={values.dialCode}
              onChange={update}
              aria-invalid={Boolean(errors.dialCode)}
              aria-describedby={describedBy("dialCode")}
              required
            >
              <option value="">Code</option>
              {dialCodes.map((d) => (
                <option key={d.label} value={d.code}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={id("phone")} className="sr-only">
              Phone number without country code
            </label>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              className="field"
              placeholder="Phone number"
              value={values.phone}
              onChange={update}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy("phone")}
              required
            />
          </div>
        </div>
        {err("dialCode")}
        {err("phone")}
      </fieldset>

      <div>
        <label htmlFor={id("email")} className="field-label">
          Email <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          className="field"
          value={values.email}
          onChange={update}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
        />
        {err("email")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("enquiryType")} className="field-label">
            Enquiring about <span className="text-gold-deep">*</span>
          </label>
          <select
            id={id("enquiryType")}
            name="enquiryType"
            className="field"
            value={values.enquiryType}
            onChange={update}
            aria-invalid={Boolean(errors.enquiryType)}
            aria-describedby={describedBy("enquiryType")}
            required
          >
            <option value="">Select…</option>
            {enquiryTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("enquiryType")}
        </div>
        <div>
          <label htmlFor={id("travellers")} className="field-label">
            Number of travellers <span className="text-gold-deep">*</span>
          </label>
          <input
            id={id("travellers")}
            name="travellers"
            type="number"
            inputMode="numeric"
            min={1}
            max={200}
            className="field"
            value={values.travellers}
            onChange={update}
            aria-invalid={Boolean(errors.travellers)}
            aria-describedby={describedBy("travellers")}
            required
          />
          {err("travellers")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id("departureCity")} className="field-label">
            Preferred departure city
          </label>
          <input
            id={id("departureCity")}
            name="departureCity"
            className="field"
            autoComplete="address-level2"
            value={values.departureCity}
            onChange={update}
            aria-invalid={Boolean(errors.departureCity)}
            aria-describedby={describedBy("departureCity")}
          />
          {err("departureCity")}
        </div>
        <div>
          <label htmlFor={id("travelMonth")} className="field-label">
            Approximate travel month
          </label>
          <select
            id={id("travelMonth")}
            name="travelMonth"
            className="field"
            value={values.travelMonth}
            onChange={update}
            aria-invalid={Boolean(errors.travelMonth)}
            aria-describedby={describedBy("travelMonth")}
          >
            <option value="">Flexible / not sure yet</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {err("travelMonth")}
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="field-label">
          Message or special requirements
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          className="field resize-y"
          placeholder="E.g. travelling with elderly parents, hotel preferences, room sharing…"
          value={values.message}
          onChange={update}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
        {err("message")}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-muted">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            checked={values.consent === "yes"}
            onChange={update}
            className="mt-1 size-4 shrink-0 accent-gold-deep"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
          />
          <span>
            I agree that BR Tour &amp; Travels may use these details to respond to my enquiry, as described in the{" "}
            <a href="/privacy" className="link-line text-ink">
              privacy policy
            </a>
            .
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-ink sm:min-w-56" disabled={pending}>
          {pending ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send enquiry <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p id={id("privacy")} className="text-[0.78rem] text-muted">
          We only use your details to reply to this enquiry.
        </p>
      </div>

      <div aria-live="polite">
        {fallback && <FallbackPanel ref={statusRef} kind={fallback.status} summary={summariseEnquiry(values)} />}
      </div>
    </form>
  );
}

function FallbackPanel({
  kind,
  summary,
  ref,
}: {
  kind: "unconfigured" | "error";
  summary: string;
  ref: React.Ref<HTMLDivElement>;
}) {
  const [copied, setCopied] = useState(false);
  const wa = whatsappLink(summary);

  return (
    <div ref={ref} tabIndex={-1} className="border border-gold/60 bg-sand p-6 outline-none">
      <h3 className="font-display text-2xl font-semibold">
        {kind === "unconfigured" ? "Online enquiries are not connected yet" : "We couldn’t send your enquiry just now"}
      </h3>
      <p className="prose-body mt-2 text-[0.94rem]">
        Your enquiry has <strong className="text-ink">not</strong> been sent. Please contact us directly
        {wa ? " on WhatsApp or Instagram" : " on Instagram"} — you can copy your details below to save retyping.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            <WhatsAppIcon className="size-4" /> Send on WhatsApp
          </a>
        )}
        <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <InstagramIcon className="size-4" /> Message on Instagram
        </a>
        <button
          type="button"
          className="btn btn-outline"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(summary);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied" : "Copy my details"}
        </button>
      </div>
    </div>
  );
}
