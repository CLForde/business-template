export default function Footer({ businessInfo }: any) {
  return (
    <footer className='bg-gray-900 text-white py-8 text-center'>
      <p className='font-semibold text-lg'>{businessInfo.name}</p>

      <p className='mt-3 text-sm'>{businessInfo.tagline}</p>

      <p className='mt-4 text-sm'>
        © {new Date().getFullYear()} {businessInfo.name}
      </p>
    </footer>
  );
}
