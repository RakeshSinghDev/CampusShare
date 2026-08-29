import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusCircle, MessageSquare, User } from 'lucide-react';
import { MOBILE_BOTTOM_NAV } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const location = useLocation();

  const iconMap = {
    Home,
    Search,
    PlusCircle,
    MessageSquare,
    User,
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1 shadow-float">
      <div className="flex items-center justify-around">
        {MOBILE_BOTTOM_NAV.map((item) => {
          const IconComponent = iconMap[item.icon] || Home;
          const isActive = location.pathname === item.path;

          if (item.isPrimaryCTA) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group -mt-4 flex flex-col items-center justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 group-active:scale-95 transition-transform">
                  <PlusCircle className="h-6 w-6" />
                </div>
                <span className="mt-1 text-[11px] font-bold text-blue-600">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'relative flex flex-1 flex-col items-center justify-center py-1.5 transition-colors',
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              <div className="relative">
                <IconComponent className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')} />
                {item.badge && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
