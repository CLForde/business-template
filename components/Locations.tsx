import { BusinessInfo, Location } from '@/lib/types';

export default function Locations({
  businessInfo,
}: {
  businessInfo: BusinessInfo;
}) {
  return (
    <section id='locations' className='bg-gray-100 py-16'>
      <div className='max-w-5xl mx-auto px-6 text-center'>
        <h2 className='text-3xl font-bold mb-10'>Our Locations</h2>

        <div className='grid md:grid-cols-2 gap-8 text-left'>
          {businessInfo.addresses.map((location: Location, index: number) => (
            <div key={index} className='bg-white p-6 rounded-xl shadow'>
              <h3 className='font-semibold text-lg'>{location.name}</h3>

              <p className='mt-3'>{location.address}</p>

              <div className='mt-4 flex flex-col gap-2'>
                <a
                  href={location.map}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gray-100 px-3 py-2 rounded text-sm hover:bg-gray-200'
                >
                  📍 Get Directions
                </a>

                <a
                  href={`tel:${businessInfo.phone}`}
                  className='bg-gray-100 px-3 py-2 rounded text-sm hover:bg-gray-200'
                >
                  📞 Call Now
                </a>

                <a
                  href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(
                    businessInfo.whatsappMessage,
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600'
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
