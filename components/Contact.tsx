export default function Contact({ businessInfo }: any) {
  return (
    <section id='contact' className='py-20 text-center'>
      <h2 className='text-3xl font-bold'>
        {businessInfo.contactSection.title}
      </h2>

      <p className='mt-4'>{businessInfo.contactSection.city}</p>

      <div className='mt-6 flex flex-col items-center gap-4'>
        <a
          href={`https://wa.me/${businessInfo.whatsappNumber}?text=${encodeURIComponent(businessInfo.whatsappMessage)}`}
          className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600'
        >
          Contact on WhatsApp
        </a>

        <a
          href={`mailto:${businessInfo.email}`}
          className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600'
        >
          Send Email
        </a>
      </div>
    </section>
  );
}
