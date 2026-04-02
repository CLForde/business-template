import { Suspense } from 'react';
import PreviewClient from './PreviewClient';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading preview...</p>}>
      <PreviewClient />
    </Suspense>
  );
}
