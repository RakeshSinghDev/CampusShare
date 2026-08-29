import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Mail, MessageSquare, FileCheck } from 'lucide-react';

export function TrustSection() {
  const trustPoints = [
    {
      title: 'Verified Student Profiles',
      description: 'Users authenticate their student status with official university email domains.',
      icon: ShieldCheck,
    },
    {
      title: 'Campus-Based Discovery',
      description: 'Find resources specifically within your university campus or neighboring hostels.',
      icon: Mail,
    },
    {
      title: 'In-App Communication',
      description: 'Connect securely with buyers and sellers on campus without giving out phone numbers.',
      icon: MessageSquare,
    },
    {
      title: 'Clear Listing Information',
      description: 'Transparent condition details, course name tags, and original item photographs.',
      icon: FileCheck,
    },
  ];

  return (
    <section id="campus-trust" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Campus Safety & Authenticity
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Built around people you can recognize.
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            CampusShare is engineered specifically for trusted exchanges between verified campus peers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/90 bg-white space-y-3 shadow-2xs hover:shadow-subtle transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
