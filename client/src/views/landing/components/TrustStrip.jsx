import React from 'react';
import { ShieldCheck, MapPin, Lock, Repeat } from 'lucide-react';

export function TrustStrip() {
  const trustPoints = [
    { icon: ShieldCheck, label: 'Verified Student Peer Network' },
    { icon: MapPin, label: 'Convenient On-Campus Pickups' },
    { icon: Lock, label: 'Transparent Listing Details' },
    { icon: Repeat, label: 'Flexible Buy, Sell & Rent Options' },
  ];

  return (
    <div className="border-y border-slate-100 bg-slate-50/60 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-between text-xs font-bold text-slate-700">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-center gap-2 text-center">
                <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
