import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

import { getClient } from '@/data/getClient';

export default async function ClientPage({ params }: any) {
  const { client } = await params;
  const businessInfo = getClient(client);

  return (
    <main className='min-h-screen bg-gray-50 text-gray-800'>
      <Hero businessInfo={businessInfo} />
      <Services businessInfo={businessInfo} />
      <WhyChooseUs businessInfo={businessInfo} />
      <Locations businessInfo={businessInfo} />
      <Contact businessInfo={businessInfo} />
      <Footer businessInfo={businessInfo} />
      <WhatsAppButton businessInfo={businessInfo} />
    </main>
  );
}
