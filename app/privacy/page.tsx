import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalPage, TemplateNotice } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the personal information you share with us.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <TemplateNotice />
      <p>
        This policy explains how {site.name} uses the information you provide when you contact us or send an enquiry
        through this website.
      </p>
      <h2>What we collect</h2>
      <p>When you send an enquiry we receive the details you enter in the form, such as:</p>
      <ul>
        <li>your name and phone number, and your email address if you provide it;</li>
        <li>the type of journey you are interested in, number of travellers, departure city and preferred month;</li>
        <li>any message or special requirements you choose to share.</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use these details only to respond to your enquiry and, if you decide to book, to arrange your journey. We do
        not sell your information.
      </p>
      <h2>Sharing</h2>
      <p>
        If you book, some details may need to be shared with airlines, hotels, transport providers and visa authorities
        so that your arrangements can be made.
      </p>
      <h2>Retention</h2>
      <p>[State how long enquiry details are kept, and how they are deleted.]</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete the information you have shared. Please{" "}
        <Link href="/contact" className="link-line">
          contact us
        </Link>{" "}
        to make a request.
      </p>
    </LegalPage>
  );
}
