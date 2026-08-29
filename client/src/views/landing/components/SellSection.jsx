import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UploadCloud, DollarSign, Send, ArrowRight } from 'lucide-react';

export function SellSection() {
  const sellSteps = [
    {
      num: '1',
      title: 'Snap & Upload',
      description: 'Take 2 photos of your book, calculator, or lab coat.',
      icon: UploadCloud,
    },
    {
      num: '2',
      title: 'Set Price or Rent Rate',
      description: 'Decide whether to sell outright or offer as a semester rental.',
      icon: DollarSign,
    },
    {
      num: '3',
      title: 'Publish to Campus',
      description: 'Your listing goes live instantly to students on your campus.',
      icon: Send,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Sell & Monetize
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Done with it? Sell it to someone who needs it next.
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Turn your past semester's textbooks, notes, and lab gear into extra cash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sellSteps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.num} className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs space-y-3 text-center flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Button asChild size="lg" className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs sm:text-sm px-6 h-12 shadow-2xs">
            <Link to="/sell" className="gap-2">
              <span>Start Selling</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
