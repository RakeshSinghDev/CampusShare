import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export function ChatProductContext({ product }) {
  if (!product) return null;

  const displayPrice = product.priceLabel
    ? String(product.priceLabel).replace(/\$/g, '₹')
    : formatCurrency(product.price);

  return (
    <div className="flex items-center justify-between p-3 bg-blue-50/60 border-b border-blue-100 text-xs">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-10 w-10 rounded-lg object-cover bg-slate-100 shrink-0 border border-blue-200/80"
        />

        <div className="min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
            Resource Context
          </span>
          <h4 className="font-extrabold text-slate-900 truncate text-xs sm:text-sm">
            {product.title}
          </h4>
          <span className="text-[11px] font-bold text-slate-700 block">
            {displayPrice}
          </span>
        </div>
      </div>

      <Link to={`/product/${product.id}`} className="shrink-0 ml-2">
        <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1 bg-white border-blue-200 hover:bg-blue-50">
          <span>View Product</span>
          <ExternalLink className="h-3 w-3 text-blue-600" />
        </Button>
      </Link>
    </div>
  );
}
