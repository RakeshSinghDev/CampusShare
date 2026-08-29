import React from 'react';
import { Search, ArrowLeftRight, MessageCircle, MapPin } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'SEARCH',
      subtitle: 'Tell us what you need',
      description: 'Find textbooks, calculators, lab gear, and notes listed by peers on your campus.',
      icon: Search,
    },
    {
      num: '02',
      title: 'COMPARE',
      subtitle: 'See Buy & Rent options',
      description: 'Opt to buy outright or rent for a single semester based on your course duration.',
      icon: ArrowLeftRight,
    },
    {
      num: '03',
      title: 'CONNECT',
      subtitle: 'Talk to a verified student',
      description: 'Message sellers directly in-app to ask questions and agree on pickup timing.',
      icon: MessageCircle,
    },
    {
      num: '04',
      title: 'PICK UP',
      subtitle: 'Complete exchange on campus',
      description: 'Meet safely at an agreed campus location (Library, Student Center, Quad).',
      icon: MapPin,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            How CampusShare Works
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            From finding what you need to campus pickup in four clear steps.
          </p>
        </div>

        {/* Horizontal Progression Desktop & Vertical Mobile */}
        <div className="relative">
          {/* Subtle horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200/80 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 text-center flex flex-col items-center hover:border-slate-300 transition-colors"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {step.num} • {step.title}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{step.subtitle}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
