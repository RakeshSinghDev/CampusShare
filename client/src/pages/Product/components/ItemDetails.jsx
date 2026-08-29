import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Item Specifications & Detailed Description.
 */
export function ItemDetails({ product }) {
  const specs = [
    { label: 'Category', value: typeof product.category === 'object' ? (product.category?.name || product.category?.slug) : product.category },
    { label: 'Condition', value: typeof product.condition === 'object' ? product.condition?.name : product.condition },
    { label: 'Brand / Publisher', value: product.brand || 'N/A' },
    { label: 'Model / Edition', value: product.model || 'N/A' },
    { label: 'Usage History', value: product.usage || '1 Semester' },
    { label: 'Item Age', value: product.age || 'Recent' },
  ];

  return (
    <Card className="rounded-2xl border-slate-200 shadow-subtle bg-white">
      <CardContent className="p-5 sm:p-6 space-y-6">
        {/* Specifications Grid */}
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-3">Item Specifications</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {specs.map((spec, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-medium text-slate-400 block">{spec.label}</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Description</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
