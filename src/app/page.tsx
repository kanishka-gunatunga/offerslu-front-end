import type { Metadata } from "next";

import { LandingView } from "@/components/landing/landing-view";
import { getSiteContent } from "@/lib/site/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.siteName,
    description:
      "Discover offers, bank promos, and seasonal deals across Sri Lanka — curated in one place.",
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <LandingView content={content} />;
}
