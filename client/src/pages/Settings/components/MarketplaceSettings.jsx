import React, { useState } from 'react';
import { Bell, ShoppingBag, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export function MarketplaceSettings() {
  const [prefs, setPrefs] = useState({
    chatMessages: true,
    rentalReminders: true,
    priceDropAlerts: true,
    weeklyDigest: false,
  });

  const toggle = (key) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast.info('Notification preferences updated.');
      return next;
    });
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle mb-6">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" /> Marketplace Notification Preferences
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">In-App Chat Messages</span>
              <span className="text-[11px] text-slate-500">Notify when buyers or lenders send a campus chat message</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.chatMessages}
              onChange={() => toggle('chatMessages')}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Rental Due Reminders</span>
              <span className="text-[11px] text-slate-500">Receive alerts 3 days before an active rental is due</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.rentalReminders}
              onChange={() => toggle('rentalReminders')}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-xs text-slate-900 block">Saved Wishlist Price Drops</span>
              <span className="text-[11px] text-slate-500">Get notified when an item on your wishlist changes price</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.priceDropAlerts}
              onChange={() => toggle('priceDropAlerts')}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
