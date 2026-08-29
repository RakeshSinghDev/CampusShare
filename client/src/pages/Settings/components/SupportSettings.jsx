import React from 'react';
import { HelpCircle, FileText, AlertTriangle, LifeBuoy, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export function SupportSettings() {
  const items = [
    { label: 'CampusShare Student Help Center', icon: HelpCircle, action: () => toast.info('Help Center placeholder opened') },
    { label: 'Report a Listing or User Problem', icon: AlertTriangle, action: () => toast.info('Report issue dialog placeholder') },
    { label: 'Campus Safety & Handoff Guidelines', icon: FileText, action: () => toast.info('Campus safety guide opened') },
  ];

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <LifeBuoy className="h-4 w-4 text-blue-600" /> Support & Campus Guidelines
        </h3>

        <div className="space-y-2">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 text-left transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-slate-500" />
                  <span className="font-bold text-xs text-slate-900">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
