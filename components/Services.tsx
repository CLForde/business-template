'use client';

import { useState, useEffect } from 'react';
import { useInView } from './useInView';

function ServiceCard({ service, isInView, index }: any) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!isInView || !service.images?.length) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % service.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, service.images.length]);

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow text-center transition-all duration-700 ${
        isInView
          ? 'opacity-100 translate-y-0 translate-x-0'
          : index % 2 === 0
            ? 'opacity-0 -translate-x-10'
            : 'opacity-0 translate-x-10'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className='relative h-[250px] mb-4 overflow-hidden rounded-lg bg-gray-100'>
        {service.images.map((img: string, i: number) => (
          <img
            key={i}
            src={img}
            alt={service.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === imageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <h3 className='font-semibold'>{service.name}</h3>
      <p className='text-sm mt-2'>{service.description}</p>
    </div>
  );
}

export default function Services({ businessInfo }: any) {
  const { ref, isInView } = useInView();
  return (
    <section ref={ref} id='services' className='max-w-6xl mx-auto py-16 px-6'>
      <h2 className='text-3xl font-bold text-center mb-10'>
        Equipment Available
      </h2>

      <div className='grid md:grid-cols-3 gap-8'>
        {businessInfo.services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            isInView={isInView}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
