import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileText, Send, ArrowRight } from 'lucide-react';

export function PassItOnSection() {
  const steps = [
    { title: 'Take a Photo', icon: Camera, desc: 'Snap 2 photos of your textbook or gear.' },
    { title: 'Add Course Details', icon: FileText, desc: 'Select item condition and campus department.' },
    { title: 'Publish to Campus', icon: Send, desc: 'Visible immediately to students on your campus.' },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Pass It On
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Finished with a semester? Pass it on.
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Your textbook, calculator, or lab gear could be exactly what another student needs next.
          </p>
        </div>

        {/* Minimal Horizontal Listing Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-left">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Icon className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{step.title}</span>
                </div>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/sell"
            className="group inline-flex items-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none"
          >
            <span>List an Item</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
