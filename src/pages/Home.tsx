import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Categories from "../components/sections/Categories";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import About from "../components/sections/About";
import Testimonials from "../components/sections/Testimonials";
import ContactCTA from "../components/sections/ContactCTA";
import Footer from "../components/layout/Footer";
import FloatingWhatsApp from "../components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}