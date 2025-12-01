import Navbar from "@/components/Navbar"
import Hero from "@/components/Landing/Hero"
import News from "@/components/Landing/News"
import Footer from "@/components/Footer"

export default async function Home({params}: {params: Promise<{ locale: string }>}) {
  const { locale } = await params;

  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />

      <Hero />

      <News locale={locale} />

      <Footer locale={locale} />
    </main>
  )
}
