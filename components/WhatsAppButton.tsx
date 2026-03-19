import { businessInfo } from '@/data/businessInfo';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(
        businessInfo.whatsappMessage,
      )}`}
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition animate-pulse'
    >
      <img src='/icons/whatsapp.svg' alt='WhatsApp' className='w-7 h-7' />
    </a>
  );
}
