'use client';

import { useSearchParams } from 'next/navigation';
import { BusinessInfo } from '@/lib/types';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Locations from '@/components/Locations';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function PreviewClient() {
  const params = useSearchParams();
  const data = params.get('data');

  if (!data) return <p>No data</p>;

  const form = JSON.parse(decodeURIComponent(data));

  const businessInfo: BusinessInfo = {
    name: form.name,
    tagline: form.tagline,

    phone: form.phone,
    whatsappNumber: form.whatsapp,
    whatsappMessage: 'Hello, I am interested in your services.',
    email: '',

    services: [
      {
        name: form.service1,
        description: 'Professional service',
        images: form.image1 ? [form.image1] : [],
      },
      {
        name: form.service2,
        description: 'Professional service',
        images: form.image1 ? [form.image1] : [],
      },
    ],

    addresses: [
      {
        name: 'Service Area',
        address: 'Your location here',
        map: 'https://www.google.com/maps',
      },
    ],

    whyChooseUs: {
      title: 'Why Choose Us',
      points: ['Reliable', 'Affordable', 'Professional'],
    },

    contactSection: {
      title: 'Contact Us',
      subtitle: 'Reach out anytime',
    },
  };

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
