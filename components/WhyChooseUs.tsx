import { BusinessInfo } from '@/lib/types';

export default function WhyChooseUs({
  businessInfo,
}: {
  businessInfo: BusinessInfo;
}) {
  return (
    <section className='bg-white py-16'>
      <div className='max-w-4xl mx-auto text-center px-6'>
        <h2 className='text-3xl font-bold mb-6'>
          {businessInfo.whyChooseUs.title}
        </h2>

        <div className='space-y-3 text-left'>
          {businessInfo.whyChooseUs.points.map(
            (point: string, index: number) => (
              <p key={index}>✓ {point}</p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
