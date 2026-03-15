'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

const BOOT_LINES = [
  { text: '[OK] drone_fleet: 4 units online',       ms: 200  },
  { text: '[OK] satellite_uplink: connected',        ms: 550  },
  { text: '[OK] thermal_sensors: calibrated',        ms: 850  },
  { text: '[OK] ai_detection_model: loaded',         ms: 1150 },
  { text: '$ system ready — awaiting operator...',   ms: 1500 },
];

const FEATURES = [
  {
    icon: '[~]',
    title: 'live_tracking',
    desc: '// real-time GPS positioning and telemetry from active drone units across all search zones',
  },
  {
    icon: '[#]',
    title: 'thermal_detection',
    desc: '// infrared heat signature analysis for locating subjects in low-visibility conditions',
  },
  {
    icon: '[*]',
    title: 'fleet_management',
    desc: '// coordinate and deploy multiple autonomous units with collision avoidance and zone coverage',
  },
  {
    icon: '[>]',
    title: 'ai_detections',
    desc: '// machine-learning-powered person detection with confidence scoring and review pipeline',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines((p) => [...p, i]), line.ms));
    });
    timers.push(setTimeout(() => setHeroReady(true), 1800));
    return () => timers.forEach(clearTimeout);
  }, []);

  function handleLaunch() {
    router.push(isAuthenticated() ? '/loading' : '/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* ── Sticky minimal nav ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-10 border-b border-[#ffffff0f] bg-[#00000099] backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-[#00D084] font-bold text-lg leading-none">&gt;</span>
          <span className="text-white font-bold text-sm tracking-widest">SKYLINE_SAR</span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[#888888] text-xs hover:text-white transition-colors px-3 py-1.5"
          >
            login
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 px-4 py-1.5 border border-[#00D084] text-[#00D084] text-xs font-semibold hover:bg-[#00D084] hover:text-black transition-colors"
          >
            <span>&gt;</span>
            sign_up
          </Link>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-10 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,208,132,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,208,132,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #000000 100%)' }}
        />

        <div className="relative flex flex-col items-center gap-8 text-center max-w-3xl">
          {/* Terminal boot lines */}
          <div className="flex flex-col gap-1.5 w-full text-left mb-2">
            {BOOT_LINES.map((line, i) => (
              <span
                key={i}
                className="text-xs transition-opacity duration-300"
                style={{
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  color: line.text.startsWith('[OK]') ? '#00AF6F' : '#555555',
                }}
              >
                {line.text}
              </span>
            ))}
          </div>

          {/* Headline */}
          <div
            className="flex flex-col items-center gap-4"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
          >
            <h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
              aerial_search
              <br />
              <span className="text-[#00D084]">intelligence</span>
              <span className="animate-blink text-[#00D084] ml-1">_</span>
            </h1>
            <p className="text-[#666666] text-sm max-w-md leading-relaxed">
              // autonomous drone-powered search and rescue — real-time thermal detection, live telemetry, and AI-assisted person identification
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex items-center gap-4 mt-2"
            style={{ opacity: heroReady ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}
          >
            <button
              onClick={handleLaunch}
              className="flex items-center gap-2 h-12 px-8 bg-[#00D084] text-black text-sm font-semibold hover:bg-[#00b873] transition-colors"
            >
              <span className="font-bold">$</span>
              launch_dashboard
            </button>
            <Link
              href="/signup"
              className="flex items-center h-12 px-8 border border-[#333333] text-[#888888] text-sm hover:border-[#555555] hover:text-white transition-colors"
            >
              request_access
            </Link>
          </div>

          {/* Status strip */}
          <div
            className="flex items-center gap-6 mt-4 px-6 py-3 border border-[#1a1a1a] bg-[#0a0a0a]"
            style={{ opacity: heroReady ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}
          >
            <Stat value="4" label="drones_active" />
            <div className="w-px h-6 bg-[#1f1f1f]" />
            <Stat value="99.2%" label="detection_accuracy" />
            <div className="w-px h-6 bg-[#1f1f1f]" />
            <Stat value="&lt;2s" label="alert_latency" />
            <div className="w-px h-6 bg-[#1f1f1f]" />
            <Stat value="24/7" label="operational" />
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="bg-white px-10 py-20">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-[#00D084] text-xs font-semibold">&gt; platform_capabilities</span>
            <h2 className="text-3xl font-bold text-black">built for field operations</h2>
            <p className="text-[#888888] text-sm">// every tool your SAR team needs, in one command center</p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col gap-4 p-6 border border-[#E8E8E8] hover:border-[#00D084] transition-colors group">
                <div className="flex items-center gap-3">
                  <span className="text-[#00D084] text-xl font-bold">{f.icon}</span>
                  <span className="text-black text-sm font-semibold">{f.title}</span>
                </div>
                <p className="text-[#888888] text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center justify-between px-8 py-6 bg-black">
            <div className="flex flex-col gap-1">
              <span className="text-white text-sm font-semibold">&gt; ready to deploy?</span>
              <span className="text-[#555555] text-xs">// set up your first mission in under 5 minutes</span>
            </div>
            <button
              onClick={handleLaunch}
              className="flex items-center gap-2 h-11 px-6 bg-[#00D084] text-black text-sm font-semibold hover:bg-[#00b873] transition-colors shrink-0"
            >
              <span className="font-bold">$</span>
              launch_dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="flex items-center justify-between px-10 py-5 border-t border-[#111111] bg-black">
        <div className="flex items-center gap-2">
          <span className="text-[#00D084] font-bold">&gt;</span>
          <span className="text-[#444444] text-xs tracking-widest">SKYLINE_SAR</span>
        </div>
        <span className="text-[#333333] text-xs">v3.2.1 // classification: restricted</span>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[#00D084] text-sm font-bold" dangerouslySetInnerHTML={{ __html: value }} />
      <span className="text-[#555555] text-[9px]">{label}</span>
    </div>
  );
}
