'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AppNav from '@/components/layout/AppNav';
import PageWrapper from '@/components/layout/PageWrapper';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[#888888] text-xs">{children}</span>;
}

function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="h-10 px-4 bg-[#F5F5F5] border border-[#E0E0E0] text-sm text-black placeholder-[#CCCCCC] outline-none focus:border-[#00D084] transition-colors w-full"
      style={{ fontFamily: 'inherit' }}
    />
  );
}

function SelectInput({ value }: { value: string }) {
  return (
    <div className="flex items-center justify-between h-10 px-4 bg-[#F5F5F5] border border-[#E0E0E0] w-full cursor-pointer">
      <span className="text-sm text-black font-medium">{value}</span>
      <span className="text-[#777777] text-xs">v</span>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

export default function MissionSetupPage() {
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
        {/* Title Row */}
        <div className="flex items-center w-full">
          <div className="flex flex-col gap-1 flex-1">
            <h1 className="text-[42px] font-bold text-black leading-tight">mission_control</h1>
            <p className="text-[#888888] text-sm">// configure and launch search_and_rescue operations</p>
          </div>
          <div className="flex items-center bg-[#FFB800] px-5 py-2.5">
            <span className="text-black text-xs font-semibold">[NO_ACTIVE_MISSION]</span>
          </div>
        </div>

        {/* Empty State Notice */}
        <div className="flex items-center gap-4 bg-white px-6 py-5 border border-[#E0E0E0] w-full">
          <span className="text-[#CCCCCC] text-xl font-bold shrink-0">$</span>
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-black text-sm font-semibold">&gt; no mission is currently running</span>
            <span className="text-[#888888] text-xs">
              // configure mission parameters below and execute $ launch_mission to begin drone deployment
            </span>
          </div>
        </div>

        {/* Form Columns */}
        <div className="flex gap-6 flex-1">
          {/* Left Col */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Mission Details */}
            <div className="flex flex-col gap-5 bg-white p-6 border border-[#E0E0E0]">
              <span className="text-black text-sm font-semibold">&gt; mission_details</span>

              <FormField label="mission_name">
                <TextInput placeholder="Hurricane Delta - Sector 7" />
              </FormField>

              <FormField label="description">
                <div className="relative">
                  <textarea
                    placeholder="// brief mission objectives..."
                    rows={3}
                    className="w-full px-4 py-2 bg-[#F5F5F5] border border-[#E0E0E0] text-sm text-black placeholder-[#CCCCCC] outline-none focus:border-[#00D084] transition-colors resize-none"
                    style={{ fontFamily: 'inherit' }}
                  />
                </div>
              </FormField>

              <FormField label="priority_level">
                <SelectInput value="critical -- immediate_response" />
              </FormField>
            </div>

            {/* Launch Bar */}
            <div className="flex items-center justify-end gap-3 bg-white px-6 py-4 border border-[#E0E0E0]">
              <button className="flex items-center px-5 py-2.5 bg-[#F5F5F5] border border-[#E0E0E0] text-black text-sm font-medium hover:bg-[#E0E0E0] transition-colors">
                save_draft
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-[#00D084] text-black text-sm font-semibold hover:bg-[#00b873] transition-colors">
                <span className="font-bold">$</span>
                <span>launch_mission</span>
              </button>
            </div>
          </div>

          {/* Right Col */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Search Area Params */}
            <div className="flex flex-col gap-5 bg-white p-6 border border-[#E0E0E0]">
              <span className="text-black text-sm font-semibold">&gt; search_area_params</span>

              {/* Coord row */}
              <div className="flex gap-3 w-full">
                <FormField label="center_lat">
                  <TextInput placeholder="37.7749" />
                </FormField>
                <FormField label="center_lon">
                  <TextInput placeholder="-122.4194" />
                </FormField>
              </div>

              {/* Radius / Altitude row */}
              <div className="flex gap-3 w-full">
                <FormField label="search_radius_km">
                  <TextInput placeholder="2.5" />
                </FormField>
                <FormField label="flight_altitude_m">
                  <TextInput placeholder="120" />
                </FormField>
              </div>

              <FormField label="search_pattern">
                <SelectInput value="grid_sweep" />
              </FormField>
            </div>

            {/* Drone Configuration */}
            <div className="flex flex-col gap-5 bg-white p-6 border border-[#E0E0E0]">
              <span className="text-black text-sm font-semibold">&gt; drone_configuration</span>

              <div className="flex gap-3 w-full">
                <FormField label="drone_unit">
                  <SelectInput value="SKY-07 [AVAILABLE]" />
                </FormField>
                <FormField label="camera_mode">
                  <SelectInput value="thermal + rgb" />
                </FormField>
              </div>

              <FormField label="min_detection_confidence_%">
                <TextInput placeholder="60" />
              </FormField>
            </div>
          </div>
        </div>
        </div>
      </PageWrapper>
    </div>
  );
}
