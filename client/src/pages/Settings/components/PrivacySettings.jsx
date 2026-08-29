import React, { useState } from 'react';
import { Shield, Eye, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export function PrivacySettings() {
  const [showMajor, setShowMajor] = useState(true);
  const [showRating, setShowRating] = useState(true);

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" /> Privacy & Campus Visibility
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Show Academic Major on Profile</span>
              <span className="text-[11px] text-slate-500">Allows campus peers to see your department and major</span>
            </div>
            <input
              type="checkbox"
              checked={showMajor}
              onChange={() => {
                setShowMajor(!showMajor);
                toast.info('Privacy preference updated.');
              }}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Show Peer Exchange Rating</span>
              <span className="text-[11px] text-slate-500">Displays your 5-star rating on your public listings</span>
            </div>
            <input
              type="checkbox"
              checked={showRating}
              onChange={() => {
                setShowRating(!showRating);
                toast.info('Privacy preference updated.');
              }}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
