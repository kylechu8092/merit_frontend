'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { isAuthenticated } from '@/lib/auth';
import AppNav from '@/components/layout/AppNav';
import PageWrapper from '@/components/layout/PageWrapper';
import DetectionModal from '@/components/ui/DetectionModal';
import type { Detection } from '@/components/ui/DetectionModal';
import { MOCK_DETECTIONS } from '@/lib/detections';
import type { FlyTarget } from '@/components/map/SARMap';

const SARMap = dynamic(() => import('@/components/map/SARMap'), { ssr: false });

const DETECTIONS = MOCK_DETECTIONS.slice(0, 3);

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [activeDetection, setActiveDetection] = useState<Detection | null>(null);
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) { router.replace('/login'); return; }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="flex h-screen bg-white">
      <AppNav />

      <PageWrapper>
        <div className="flex flex-col flex-1 p-10 gap-8 min-h-0 overflow-hidden">
        {/* Title row */}
        <div className="flex items-center w-full shrink-0">
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-[36px] font-bold text-black leading-tight">search_and_rescue_hq</h1>
            <p className="text-[#888888] text-sm">// real-time person detection and drone telemetry</p>
          </div>
          <div className="flex items-center px-5 py-2.5 border border-[#E8E8E8] shrink-0">
            <span className="text-[#888888] text-xs font-semibold">[NO_ACTIVE_MISSION]</span>
          </div>
        </div>

        {/* Metrics row */}
        <div className="flex gap-5 w-full shrink-0">
          <div className="flex-1 flex flex-col gap-3 bg-white p-6 border border-[#E8E8E8]">
            <span className="text-[#888888] text-xs">persons_detected</span>
            <span className="text-black text-[36px] font-bold leading-none">7</span>
            <span className="text-[#00AF6F] text-xs">3 high_conf :: 4 pending_review</span>
          </div>
          <div className="flex-1 flex flex-col gap-3 bg-white p-6 border border-[#E8E8E8]">
            <span className="text-[#888888] text-xs">area_searched</span>
            <span className="text-black text-[36px] font-bold leading-none">4.2 km²</span>
            <span className="text-[#888888] text-xs">// 68% of target_zone covered</span>
          </div>
          <div className="flex-1 flex flex-col gap-3 bg-white p-6 border border-[#E8E8E8]">
            <span className="text-[#888888] text-xs">battery_level</span>
            <span className="text-black text-[36px] font-bold leading-none">78%</span>
            <div className="h-1 bg-[#E8E8E8] w-full">
              <div className="h-full bg-[#00D084]" style={{ width: '78%' }} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3 bg-white p-6 border border-[#E8E8E8]">
            <span className="text-[#888888] text-xs">mission_time</span>
            <span className="text-black text-[36px] font-bold leading-none">01:47:23</span>
            <span className="text-[#888888] text-xs">est_remaining: 00:43:00</span>
          </div>
        </div>

        {/* Bottom: map + feed */}
        <div className="flex gap-5 flex-1 min-h-0">
          {/* Map panel */}
          <div className="flex-1 flex flex-col border border-[#E8E8E8] overflow-hidden min-h-0">
            <div className="flex items-center px-6 py-4 shrink-0">
              <span className="text-black text-sm font-semibold">&gt; search_area_map</span>
            </div>
            <div className="h-px bg-[#E8E8E8] shrink-0" />
            <div className="flex-1 relative min-h-0">
              <SARMap detections={DETECTIONS} onDetectionClick={setActiveDetection} flyTarget={flyTarget} />
            </div>
          </div>

          {/* Detection feed */}
          <div className="flex flex-col border border-[#E8E8E8] overflow-hidden min-h-0 shrink-0" style={{ width: 320 }}>
            <div className="flex items-center px-6 py-4 shrink-0">
              <span className="text-black text-sm font-semibold flex-1">&gt; detection_feed</span>
              <span className="text-[#888888] text-xs">3 detections</span>
            </div>
            <div className="h-px bg-[#E8E8E8] shrink-0" />
            <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1 min-h-0">
              {DETECTIONS.map((det) => (
                <button
                  key={det.id}
                  className="relative overflow-hidden shrink-0 text-left cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ height: 110 }}
                  onClick={() => setActiveDetection(det)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={det.image} alt={`Detection ${det.id}`} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2 py-0.5" style={{ backgroundColor: det.confColor }}>
                    <span className="text-black text-[10px] font-semibold">{det.confidence}%</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#000000CC]">
                    <span className="text-[#FFFFFFBB] text-[10px]">{det.time}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#000000CC]">
                    <span className="text-[10px] font-medium" style={{ color: det.priorityColor }}>{det.priority}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        </div>
      </PageWrapper>

      {activeDetection && (
        <DetectionModal
          detection={activeDetection}
          onClose={() => setActiveDetection(null)}
          onViewOnMap={(det) => setFlyTarget({ lng: det.lng, lat: det.lat })}
        />
      )}
    </div>
  );
}
