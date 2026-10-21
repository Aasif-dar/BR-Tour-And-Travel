# BR Tour & Travels — website

Hajj and Umrah travel website built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 and TypeScript.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Before going live

Content marked below is placeholder or sample and must be confirmed by the agency.

| What | Where | Status |
| --- | --- | --- |
| Phone, email, address, hours, default dial code | `config/site.ts` → `contact` | `null` (hidden until set) |
| WhatsApp number | `config/site.ts` → `whatsapp.number` | `null` (all WhatsApp buttons hidden until set) |
| Licences / Ministry approval | `config/site.ts` → `credentials` | empty — add only once verified |
| Packages, prices, hotels, itineraries | `data/packages.ts` | **sample** — set `isSample: false` per real package |
| Testimonials | `data/content.ts` → `testimonials` | empty (tasteful empty state shown) |
| Agency story | `app/about/page.tsx` | generic — add founding story, team, location |
| Privacy policy & terms | `app/privacy`, `app/terms` | templates — legal review needed |
| Official logo | `components/ui/Logo.tsx` | text-based treatment of the Instagram logo |

## Enquiry form

Submissions are handled by the server action in `app/actions/enquiry.ts`, which validates the input (`lib/enquiry.ts`, shared with the client) and forwards it as JSON to a webhook:

```bash
ENQUIRY_WEBHOOK_URL=https://...      # CRM, Zapier/Make, Formspree, Google Apps Script, your API
ENQUIRY_WEBHOOK_SECRET=...           # optional, sent as "Authorization: Bearer ..."
NEXT_PUBLIC_SITE_URL=https://...     # canonical URLs, Open Graph, sitemap
```

Until `ENQUIRY_WEBHOOK_URL` is set, the form **does not pretend to succeed**: it tells the visitor the enquiry was not sent and offers Instagram/WhatsApp plus a "copy my details" button. See `.env.example`.

## Editing

- **Design tokens** (colours sampled from the logo, fonts, buttons, fields): `app/globals.css`
- **Photos**: `config/images.ts` — one registry with alt text and licence credits. Current photos are from Wikimedia Commons (CC0 / public domain / CC BY / CC BY-SA) and are credited at `/credits`. Replace with the agency's own photography when available.
- **Copy**: `data/content.ts` (services, reasons, steps, gallery), `data/faqs.ts`, `data/guides.ts`
- **Navigation & announcement bar**: `config/site.ts`
