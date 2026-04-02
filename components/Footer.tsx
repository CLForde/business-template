import { BusinessInfo } from '@/lib/types';

export default function Footer({
  businessInfo,
}: {
  businessInfo: BusinessInfo;
}) {
  return (
    <footer className='bg-black text-white py-6 text-center'>
      <p>
        © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
      </p>
    </footer>
  );
}
