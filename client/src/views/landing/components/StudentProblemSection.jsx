import React from 'react';
import { BookOpen, Calculator, FlaskConical, FileText } from 'lucide-react';

export function StudentProblemSection() {
  const problems = [
    { icon: BookOpen, text: 'A textbook you only need for one semester.' },
    { icon: Calculator, text: 'A scientific calculator for a single course.' },
    { icon: FlaskConical, text: 'A lab coat and goggles you will barely use.' },
    { icon: FileText, text: 'Course notes from a senior who already took the class.' },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Problem Editorial Typography */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              The Campus Reality
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Academic essentials shouldn't cost this much.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Every semester, students spend thousands of rupees on resources they use for just a few months before leaving them on a shelf.
            </p>

            <div className="pt-2 text-xs font-semibold text-slate-700">
              CampusShare makes it easy to find existing resources within your campus community.
            </div>
          </div>

          {/* RIGHT: Clean Understated List */}
          <div className="lg:col-span-6 space-y-3">
            {problems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 text-slate-800 text-xs sm:text-sm font-medium"
                >
                  <Icon className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
