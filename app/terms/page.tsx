import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalPage, TemplateNotice } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <TemplateNotice />
      <h2>Information on this website</h2>
      <p>
        Package descriptions on this website are for general information. Itineraries, hotels, inclusions, prices and
        availability are confirmed only in a written quote or booking confirmation from {site.name}.
      </p>
      <h2>Regulations</h2>
      <p>
        Hajj and Umrah travel is subject to the regulations of Saudi Arabia and of each traveller’s country of
        residence. These may change at any time, and some arrangements may need to change as a result.
      </p>
      <h2>Bookings</h2>
      <p>[Set out booking, payment, cancellation and refund terms here.]</p>
      <h2>Guides and general advice</h2>
      <p>
        The preparation guides on this website are general travel information. They are not religious rulings or
        immigration advice.
      </p>
      <h2>Photographs</h2>
      <p>
        Some photographs are used under Creative Commons licences; see the photo credits page for details.
      </p>
    </LegalPage>
  );
}
