import { BusinessInfo } from '@/lib/types';

export default function Contact({
  businessInfo,
}: {
  businessInfo: BusinessInfo;
}) {
  return (
    <section className='bg-gray-900 text-white py-16 text-center'>
      <div className='max-w-3xl mx-auto px-6'>
        <h2 className='text-3xl font-bold mb-4'>
          {businessInfo.contactSection.title}
        </h2>

        <p className='mb-6'>{businessInfo.contactSection.subtitle}</p>

        <div className='flex flex-col gap-4'>
          <a href={`tel:${businessInfo.phone}`}>📞 {businessInfo.phone}</a>

          <a href={`mailto:${businessInfo.email}`}>📧 {businessInfo.email}</a>

          <a
            href={`https://wa.me/${businessInfo.whatsappNumber}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
