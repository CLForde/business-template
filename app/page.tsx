import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-50 text-gray-800'>
      <div className='bg-gray-900 text-white sticky top-0 z-50 p-4'>
        <p className='text-center font-semibold'>Barima Rentals</p>
      </div>
      <Navbar />
      <Hero />

      <Services />

      <WhyChooseUs />

      <Locations />

      <Contact />

      <Footer />

      <WhatsAppButton />
    </main>
  );
}
