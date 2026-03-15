'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';

const NAV_ITEMS = [
  { label: 'dashboard',  href: '/dashboard'      },
  { label: 'missions',   href: '/mission-setup'  },
  { label: 'detections', href: '/detections'     },
  { label: 'settings',   href: '/settings'       },
];

export default function AppNav() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <aside className="flex flex-col w-60 shrink-0 bg-white border-r border-[#E8E8E8] h-full">
      {/* Logo */}
      <div className="flex flex-col gap-1.5 px-6 py-6 border-b border-[#E8E8E8]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#00D084] font-bold text-base">&gt;</span>
          <span className="text-black font-bold text-sm tracking-widest">SKYLINE_SAR</span>
        </Link>
        <span className="text-[#888888] text-[10px]">// SAR Intelligence Platform</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col flex-1 py-3 gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2.5 text-xs transition-colors border-l-2 ${
                active
                  ? 'text-[#00D084] font-semibold bg-[#F5FFF9] border-[#00D084]'
                  : 'text-[#777777] border-transparent hover:text-black hover:bg-[#fafafa]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="flex flex-col gap-1 px-5 py-4 border-t border-[#E8E8E8]">
        <span className="text-[#777777] text-xs">sar_operator</span>
        <button
          onClick={() => { clearToken(); router.push('/login'); }}
          className="text-left text-[#777777] text-[10px] mt-1 hover:text-black transition-colors"
        >
          // logout
        </button>
      </div>
    </aside>
  );
}
