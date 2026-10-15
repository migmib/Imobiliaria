import { AboutSection } from "@/components/about-section"
import { BrokersSection } from "@/components/brokers-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductSection } from "@/components/product-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductSection />
      <AboutSection />
      <BrokersSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
