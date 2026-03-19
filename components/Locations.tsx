import { businessInfo } from '@/data/businessInfo';

export default function Locations() {
  return (
    <section id='locations' className='bg-gray-100 py-16'>
      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2 className='text-3xl font-bold mb-10'>Our Locations</h2>

        <div className='grid md:grid-cols-2 gap-8 text-left'>
          {businessInfo.addresses.map((location, index) => (
            <div key={index} className='bg-white p-6 rounded-xl shadow'>
              <h3 className='font-semibold text-lg'>{location.name}</h3>

              <a
                href={location.map}
                target='_blank'
                rel='noopener noreferrer'
                className='text-green-600 text-sm mt-3 inline-block'
              >
                Get Directions! Open in Google Maps
              </a>

              <p className='mt-3'>{location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
