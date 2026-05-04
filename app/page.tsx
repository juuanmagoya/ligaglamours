import { Navbar } from "@/features/public/home/components/navbar"
import { HeroSection } from "@/features/public/home/sections/hero-section"
import { AboutSection } from "@/features/public/home/sections/about-section"
import { ChampionsSection } from "@/features/public/home/sections/champions-section"
import { SponsorsSection } from "@/features/public/home/sections/sponsors-section"
import { CommunitySection } from "@/features/public/home/sections/community-section"
import { Footer } from "@/features/public/home/sections/footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ChampionsSection />
      <SponsorsSection />
      <CommunitySection />
      <Footer />
    </>
  )
}