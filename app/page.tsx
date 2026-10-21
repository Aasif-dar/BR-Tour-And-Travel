import { Hero } from "@/components/home/Hero";
import { Approach } from "@/components/home/Approach";
import { UmrahCollection } from "@/components/home/UmrahCollection";
import { HajjFeature } from "@/components/home/HajjFeature";
import { JourneySteps } from "@/components/home/JourneySteps";
import { AboutStatement } from "@/components/home/AboutStatement";
import { Testimonials } from "@/components/home/Testimonials";
import { Gallery } from "@/components/home/Gallery";
import { Prepare } from "@/components/home/Prepare";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <UmrahCollection />
      <HajjFeature />
      <JourneySteps />
      <AboutStatement />
      <Testimonials />
      <Gallery />
      <Prepare />
      <FinalCta />
    </>
  );
}
