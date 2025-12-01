import Navbar from "@/components/Navbar"
import Hero from "@/components/Landing/Hero"
import Features from "@/components/Landing/Features"
import Services from "@/components/Landing/Services"
import Stats from "@/components/Landing/Stats"
import CTA from "@/components/Landing/CTA"
import Testimonials from "@/components/Landing/Testimonials"
import News from "@/components/Landing/News"
import Footer from "@/components/Footer"

export default async function Home({params}: {params: Promise<{ locale: string }>}) {
  const { locale } = await params;

  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />

      <Hero />

      <Features />

      <Services />

      <Stats />

      <Testimonials />

      <CTA />

      <News locale={locale} />

      <Footer locale={locale} />
    </main>
  )
}
