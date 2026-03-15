'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AppNav from '@/components/layout/AppNav';
import PageWrapper from '@/components/layout/PageWrapper';

function LockedField({ label, value, type = 'text' }: { label: string; value: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <span className="text-[#888888] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {label}
        </span>
        <span className="text-[#CCCCCC] text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          // locked
        </span>
      </div>
      <div className="relative">
        <input
          type={type}
          defaultValue={value}
          disabled
          className="h-10 px-4 w-full bg-[#F5F5F5] border border-[#E8E8E8] text-sm text-[#AAAAAA] outline-none cursor-not-allowed select-none"
          style={{ fontFamily: type === 'password' ? 'inherit' : "'JetBrains Mono', monospace" }}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/login'); return; }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="flex h-screen bg-white">
      <AppNav />

      <PageWrapper>
        <div className="flex flex-col flex-1 p-10 gap-7 overflow-y-auto">
        {/* Title */}
        <div className="flex flex-col gap-1 shrink-0">
          <h1 className="text-[36px] font-bold text-black leading-tight">settings</h1>
          <p className="text-[#888888] text-sm">// account and platform configuration</p>
        </div>

        {/* Account section */}
        <div className="flex flex-col gap-5 bg-white p-6 border border-[#E0E0E0] max-w-xl">
          <div className="flex items-center justify-between">
            <span className="text-black text-sm font-semibold">&gt; account_credentials</span>
            <span
              className="text-[10px] px-2.5 py-1 border border-[#E8E8E8] text-[#888888]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              [MVP — read_only]
            </span>
          </div>

          <div className="h-px bg-[#E8E8E8]" />

          <LockedField label="email_address" value="operator@skyline-sar.gov" />
          <LockedField label="password" value="••••••••••••" type="password" />

          <div className="flex items-center gap-3 pt-1">
            <button
              disabled
              className="px-5 py-2.5 bg-[#F5F5F5] border border-[#E0E0E0] text-[#CCCCCC] text-xs font-medium cursor-not-allowed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              change_password
            </button>
            <button
              disabled
              className="px-5 py-2.5 bg-[#F5F5F5] border border-[#E0E0E0] text-[#CCCCCC] text-xs font-medium cursor-not-allowed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              update_email
            </button>
          </div>
        </div>

        {/* Operator info section */}
        <div className="flex flex-col gap-5 bg-white p-6 border border-[#E0E0E0] max-w-xl">
          <span className="text-black text-sm font-semibold">&gt; operator_profile</span>
          <div className="h-px bg-[#E8E8E8]" />

          <LockedField label="operator_id" value="OP-00142" />
          <LockedField label="clearance_level" value="restricted" />
          <LockedField label="assigned_unit" value="SAR_ALPHA" />
        </div>

        {/* Platform info */}
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-[#CCCCCC] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            v3.2.1 // classification: restricted // full account management available post-MVP
          </span>
        </div>
        </div>
      </PageWrapper>
    </div>
  );
}
