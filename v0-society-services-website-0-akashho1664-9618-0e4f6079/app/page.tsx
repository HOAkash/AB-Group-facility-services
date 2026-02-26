import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { ServicesGrid } from "@/components/landing/services-grid"
import { Benefits } from "@/components/landing/benefits"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesGrid />
        <Benefits />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
