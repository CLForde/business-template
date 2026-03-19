import { businessInfo } from '@/data/businessInfo';

export default function Navbar() {
  return (
    <div className='bg-gray-900 text-white sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex justify-between items-center'>
        {/* LEFT */}
        <div className='flex items-center gap-2'>
          <img src={businessInfo.logo} className='h-8' />
          <span className='font-semibold'>{businessInfo.name}</span>
        </div>

        {/* NAV */}
        <div className='hidden md:flex gap-6 text-sm'>
          <a href='#services' className='hover:text-green-400'>
            Services
          </a>
          <a href='#locations' className='hover:text-green-400'>
            Locations
          </a>
          <a href='#contact' className='hover:text-green-400'>
            Contact
          </a>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${businessInfo.whatsappNumber}`}
          className='bg-green-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600'
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
