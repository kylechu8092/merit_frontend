'use client';
import { usePathname } from 'next/navigation';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // key forces re-mount → restarts the animation on every route change
  return (
    <main key={pathname} className="flex flex-col flex-1 overflow-hidden min-h-0 page-enter">
      {children}
    </main>
  );
}
