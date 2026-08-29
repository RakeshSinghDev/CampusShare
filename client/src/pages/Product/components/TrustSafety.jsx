import React from 'react';
import { ShieldCheck, Lock, RefreshCw, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * CampusShare Verified Trust & Safety Badges section.
 */
export function TrustSafety() {
  const trustSignals = [
    {
      icon: UserCheck,
      title: 'Verified Student Identity',
      description: 'Both buyer and seller (.edu) campus accounts are verified before listing.',
    },
    {
      icon: ShieldCheck,
      title: 'Safe Campus Pickup',
      description: 'Exchanges take place in public campus zones (Library, Union, Student Centers).',
    },
    {
      icon: RefreshCw,
      title: 'Refundable Security Deposit',
      description: 'Deposits are securely held and refunded immediately upon item return.',
    },
  ];

  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-5 shadow-subtle">
      <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
        <ShieldCheck className="h-4 w-4 text-emerald-600" /> CampusShare Trust & Protection
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trustSignals.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Icon className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-snug">{item.title}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5 leading-normal">{item.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
