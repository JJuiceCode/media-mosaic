import { FeaturedPeopleSection } from "@/components/home/featured-people-section";
import { HeroSection } from "@/components/home/hero-section";
import { IssueTrendsSection } from "@/components/home/issue-trends-section";
import { LatestFactChecksSection } from "@/components/home/latest-fact-checks-section";
import { MethodologySection } from "@/components/home/methodology-section";
import { NewsletterSupportSection } from "@/components/home/newsletter-support-section";
import { ParticipationSection } from "@/components/home/participation-section";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <FeaturedPeopleSection />
      <LatestFactChecksSection />
      <IssueTrendsSection />
      <ParticipationSection />
      <MethodologySection />
      <NewsletterSupportSection />
    </main>
  );
}
