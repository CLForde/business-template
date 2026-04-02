import { BusinessInfo, Service } from '@/lib/types';

export default function Services({
  businessInfo,
}: {
  businessInfo: BusinessInfo;
}) {
  return (
    <section className='bg-white py-16'>
      <div className='max-w-6xl mx-auto px-6 text-center'>
        <h2 className='text-3xl font-bold mb-10'>Our Services</h2>

        <div className='grid md:grid-cols-3 gap-8'>
          {businessInfo.services.map((service: Service, index: number) => (
            <div key={index} className='bg-gray-100 p-6 rounded-xl shadow'>
              <h3 className='text-xl font-semibold mb-3'>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
