export default function BarimaRentalsHome() {
  return (
    <main className='min-h-screen bg-gray-50 text-gray-800'>
      {/* TOP CONTACT STRIP */}
      <div className='bg-gray-800 text-gray-200 text-xs py-2'>
        <div className='max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-1'>
          <p>
            Serving Georgetown, East Coast, East Bank, West Coast & West Bank
            Demerara
          </p>

          <p>
            WhatsApp:{' '}
            <a
              href='https://wa.me/5926275775'
              className='text-green-400 hover:underline'
            >
              627-5775
            </a>
          </p>
        </div>
      </div>
      <nav className='bg-gray-900 text-white sticky top-0 z-50 shadow'>
        <div className='max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3'>
          <div>
            <div className='flex items-center gap-3'>
              <img
                src='/images/barima-logo.jpeg'
                alt='Barima Rentals Logo'
                className='h-14 w-auto'
              />

              <div>
                <h1 className='font-bold text-lg'>Barima Rentals</h1>
                <p className='text-xs text-gray-300'>
                  Construction Equipment Rentals
                </p>
              </div>
            </div>
          </div>

          <div className='space-x-4 text-sm font-medium flex flex-wrap items-center'>
            <a href='#equipment' className='hover:text-green-400'>
              Equipment
            </a>
            <a href='#locations' className='hover:text-green-400'>
              Locations
            </a>
            <a href='#contact' className='hover:text-green-400'>
              Contact
            </a>
          </div>

          <a
            href='https://wa.me/5926275775'
            className='bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600'
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className='relative h-[420px] flex items-center justify-center text-white'>
        <img
          src='/images/hero.jpg'
          alt='Barima Rentals Equipment'
          className='absolute w-full h-full object-cover'
        />

        <div className='absolute inset-0 bg-black/60'></div>

        <div className='relative z-10 text-center px-6'>
          <h1 className='text-4xl md:text-5xl font-bold'>
            Reliable Construction Equipment
          </h1>

          <p className='mt-4 text-lg max-w-xl mx-auto'>
            Scaffolds, concrete mixers and plate compactors available for
            contractors, builders and homeowners.
          </p>

          <a
            href='https://wa.me/5926275775'
            className='inline-block mt-8 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600'
          >
            Request Equipment on WhatsApp
          </a>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      {/* EQUIPMENT SECTION */}
      <section id='equipment' className='max-w-6xl mx-auto py-16 px-6'>
        <h2 className='text-3xl font-bold text-center mb-10'>
          Equipment Available
        </h2>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-xl shadow text-center'>
            <img
              src='/images/scaffold.jpeg'
              alt='Scaffold Rentals'
              className='rounded-lg mb-4'
            />
            <h3 className='font-semibold'>Scaffolds</h3>
            <p className='text-sm mt-2'>
              Reliable scaffolding for construction and repairs.
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow text-center'>
            <img
              src='/images/mixer.jpg'
              alt='Concrete Mixer'
              className='rounded-lg mb-4'
            />
            <h3 className='font-semibold'>Concrete Mixers</h3>
            <p className='text-sm mt-2'>
              Well maintained mixers ready for your projects.
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow text-center'>
            <img
              src='/images/compactor.jpg'
              alt='Plate Compactor'
              className='rounded-lg mb-4'
            />
            <h3 className='font-semibold'>Plate Compactors</h3>
            <p className='text-sm mt-2'>
              Ideal for foundations, driveways and yard preparation.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className='bg-white py-16'>
        <div className='max-w-4xl mx-auto text-center px-6'>
          <h2 className='text-3xl font-bold mb-6'>Why Choose Barima Rentals</h2>

          <div className='space-y-3'>
            <p>✔ Reliable equipment</p>
            <p>✔ Fair rental rates</p>
            <p>✔ Trusted service</p>
          </div>
        </div>
      </section>
      <section id='locations' className='bg-gray-100 py-16'>
        <div className='max-w-5xl mx-auto px-6 text-center'>
          <h2 className='text-3xl font-bold mb-10'>Our Locations</h2>

          <div className='grid md:grid-cols-2 gap-8 text-left'>
            <div className='bg-white p-6 rounded-xl shadow'>
              <h3 className='font-semibold text-lg'>Kitty Location</h3>
              <a
                href='https://maps.app.goo.gl/q9DfoZSDfBAbQWnV6'
                className='text-green-600 text-sm mt-3 inline-block'
              >
                Get Directions on Google Maps
              </a>

              <p className='mt-3'>
                Lot 6 "D" Station Street Kitty, Georgetown, Guyana
              </p>

              <p className='mt-3 text-sm text-gray-600'>
                Located about 4 houses away from Seeta's Bar.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow'>
              <h3 className='font-semibold text-lg'>Liliendaal Location</h3>
              <a
                href='https://maps.app.goo.gl/4hjQoFZJiu8mbnno6'
                className='text-green-600 text-sm mt-3 inline-block'
              >
                Get Directions on Google Maps
              </a>

              <p className='mt-3'>
                Lot A Rupert Craig Highway Liliendaal, East Coast Demerara,
                Guyana
              </p>

              <p className='mt-3 text-sm text-gray-600'>
                Located next to Scotty's Smoke House.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id='contact' className='py-20 text-center'>
        <h2 className='text-3xl font-bold'>Contact Us</h2>
        <p className='mt-4'>Georgetown, Guyana</p>

        <div className='mt-6 flex flex-col items-center gap-4'>
          <a
            href='https://wa.me/5926275775'
            className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600'
          >
            Contact on WhatsApp
          </a>

          <a
            href='mailto:clevelandforde@yahoo.com'
            className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600'
          >
            Send Email
          </a>
        </div>
      </section>

      <footer className='bg-gray-900 text-white py-8 text-center'>
        <p className='font-semibold text-lg'>Barima Rentals</p>

        <p className='mt-3 text-sm'>Construction Equipment Rentals</p>

        <p className='mt-3 text-sm'>
          Lot 6 "D" Station Street, Kitty, Georgetown
        </p>

        <p className='text-sm'>Lot A Rupert Craig Highway, Liliendaal E.C.D</p>

        <p className='mt-4 text-sm'>
          © {new Date().getFullYear()} Barima Rentals
        </p>
      </footer>
    </main>
  );
}
