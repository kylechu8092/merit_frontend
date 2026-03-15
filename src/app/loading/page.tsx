'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

const TERMINAL_LINES = [
  { text: '[OK] drone_fleet: online',         delay: 300  },
  { text: '[OK] satellite_uplink: connected', delay: 700  },
  { text: '[OK] thermal_sensors: calibrated', delay: 1100 },
  { text: '[OK] ai_detection: loaded',        delay: 1450 },
  { text: '$ initializing_command_center...', delay: 1750 },
];

const REDIRECT_DELAY = 2400;

export default function LoadingPage() {
  const router = useRouter();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/login'); return; }

    const timers: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        setProgress(Math.round(((i + 1) / TERMINAL_LINES.length) * 100));
      }, line.delay));
    });

    timers.push(setTimeout(() => router.replace('/dashboard'), REDIRECT_DELAY));

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-10">
      {/* Logo */}
      <div className="flex items-end gap-4">
        <span className="font-bold leading-none text-[#00D084]" style={{ fontSize: 96, lineHeight: 1 }}>&gt;</span>
        <div className="flex flex-col gap-1 pb-3">
          <span className="text-white font-bold text-[42px] leading-tight tracking-widest">SKYLINE_SAR</span>
          <span className="text-[#888888] text-sm">// search_and_rescue intelligence platform</span>
        </div>
      </div>

      {/* Terminal log */}
      <div className="flex flex-col gap-2 w-80">
        {TERMINAL_LINES.map((line, i) => (
          <span
            key={i}
            className="text-sm font-medium transition-opacity duration-300"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: line.text.startsWith('[OK]') ? '#00AF6F' : '#777777',
              opacity: visibleLines.includes(i) ? 1 : 0,
            }}
          >
            {line.text}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2 w-80">
        <div className="h-0.5 w-full bg-[#222222]">
          <div
            className="h-full bg-[#00D084] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[#555555] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          // loading... {progress}%
        </span>
      </div>
    </div>
  );
}
