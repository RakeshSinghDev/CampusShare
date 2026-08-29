import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985]',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white shadow-2xs hover:bg-blue-700 active:bg-blue-800',
        destructive: 'bg-red-600 text-white shadow-2xs hover:bg-red-700 active:bg-red-800',
        outline: 'border border-slate-200/90 bg-white shadow-2xs hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200/80',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 text-slate-600',
        link: 'text-blue-600 underline-offset-4 hover:underline p-0 h-auto font-medium',
        accent: 'bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold',
      },
      size: {
        default: 'h-10 px-4 py-2 text-xs sm:text-sm',
        sm: 'h-8.5 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-sm font-bold',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
