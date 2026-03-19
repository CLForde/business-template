import { businessInfo } from '@/data/businessInfo';

export default function Hero() {
  return (
    <section className='relative h-[420px] flex items-center justify-center text-white'>
      <img
        src={businessInfo.hero.image}
        alt={businessInfo.name}
        className='absolute w-full h-full object-cover'
      />

      <div className='absolute inset-0 bg-black/60'></div>

      <div className='relative z-10 text-center px-6'>
        <h1 className='text-4xl md:text-5xl font-bold'>
          {businessInfo.hero.title}
        </h1>

        <p className='mt-4 text-lg max-w-xl mx-auto'>
          {businessInfo.hero.subtitle}
        </p>

        <a
          href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(
            businessInfo.whatsappMessage,
          )}`}
          className='inline-block mt-8 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600'
        >
          {businessInfo.hero.buttonText}
        </a>
      </div>
    </section>
  );
}
