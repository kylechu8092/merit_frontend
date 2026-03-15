'use client';

export interface Detection {
  id: number;
  lat: number;
  lng: number;
  confidence: number;
  confColor: string;
  time: string;
  priority: string;
  priorityColor: string;
  image: string;
}

interface DetectionModalProps {
  detection: Detection;
  onClose: () => void;
  onViewOnMap?: (det: Detection) => void;
}

export default function DetectionModal({ detection, onClose, onViewOnMap }: DetectionModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col bg-white overflow-hidden"
        style={{ width: 480, maxHeight: '90vh', border: '1px solid #E0E0E0' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center px-5 py-3.5 bg-black shrink-0">
          <span
            className="flex-1 text-[11px] font-semibold"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#00D084' }}
          >
            det_id: #DET-00{detection.id}
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center bg-[#222222] text-white text-[11px] font-bold hover:bg-[#333333] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            x
          </button>
        </div>

        {/* Image */}
        <div className="relative shrink-0" style={{ height: 200 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={detection.image} alt={`Detection ${detection.id}`} className="w-full h-full object-cover" />
          <div
            className="absolute top-3 left-3 px-2.5 py-1"
            style={{ backgroundColor: detection.confColor }}
          >
            <span className="text-black text-[10px] font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {detection.confidence}%
            </span>
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#000000CC]">
            <span className="text-[#FFFFFFBB] text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {detection.time}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#000000CC]">
            <span className="text-[10px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: detection.priorityColor }}>
              {detection.priority}
            </span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-col gap-3 px-5 py-4 overflow-y-auto">
          <span className="text-black text-[11px] font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            &gt; detection_metadata
          </span>
          <div className="h-px bg-[#E8E8E8]" />

          <div className="flex gap-3">
            <MetaCell label="latitude" value={`${detection.lat.toFixed(4)}° N`} />
            <MetaCell label="longitude" value={`${detection.lng.toFixed(4)}° W`} />
          </div>
          <div className="flex gap-3">
            <MetaCell label="confidence" value={`${detection.confidence}%`} valueColor={detection.confColor.slice(0, 7)} />
            <MetaCell label="altitude_m" value="120 m AGL" />
          </div>
          <div className="flex gap-3">
            <MetaCell label="timestamp" value={`${detection.time} UTC`} />
            <MetaCell label="priority" value={detection.priority} valueColor={detection.priorityColor} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex px-5 py-3.5 bg-[#FAFAFA] border-t border-[#E8E8E8] shrink-0">
          {onViewOnMap ? (
            <button
              onClick={() => { onViewOnMap(detection); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 h-10 bg-[#00D084] text-black text-[11px] font-semibold hover:bg-[#00b873] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="font-bold">[&gt;]</span>
              view_on_map
            </button>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 h-10 bg-[#F5F5F5] text-[#AAAAAA] text-[11px] font-semibold cursor-not-allowed border border-[#E0E0E0]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>[&gt;]</span>
              view_on_map
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaCell({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex-1 flex flex-col gap-1 bg-[#F5F5F5] px-3 py-2.5">
      <span className="text-[9px] text-[#888888]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </span>
      <span
        className="text-[12px] font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: valueColor ?? '#000000' }}
      >
        {value}
      </span>
    </div>
  );
}
