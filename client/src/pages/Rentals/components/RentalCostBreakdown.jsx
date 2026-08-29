import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function RentalCostBreakdown({ rentalFee = 0, securityDeposit = 0 }) {
  const totalPaid = Number(rentalFee) + Number(securityDeposit);

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-subtle mb-6">
      <CardContent className="p-5 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Rental Cost & Deposit Summary</h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Rental Duration Fee</span>
            <span className="font-extrabold text-slate-900">{formatCurrency(rentalFee)}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1">
              Refundable Security Deposit
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            </span>
            <span className="font-extrabold text-emerald-700">{formatCurrency(securityDeposit)}</span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
            <span>Total Upfront Amount</span>
            <span className="text-blue-600">{formatCurrency(totalPaid)}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-2">
          <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Refundable Guarantee:</strong> Your {formatCurrency(securityDeposit)} security deposit will be automatically released back to your account once the lender confirms item return in original condition.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
