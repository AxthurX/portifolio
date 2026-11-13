'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return <TabsPrimitive.Root data-slot='tabs' className={cn('w-full', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot='tabs-list'
			className={cn(
				'rounded-base bg-beige-100 shadow-light my-3 inline-flex h-14 items-center justify-center gap-1.5 border-2 border-black pr-3 pb-2 pl-1 text-black max-sm:h-28',
				className,
			)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot='tabs-trigger'
			className={cn(
				'rounded-base bg-primary text-primary-foreground shadow-light hover:bg-primary/90 data-[state=active]:translate-x-boxShadowX data-[state=active]:translate-y-boxShadowY flex items-end justify-center border-2 border-black py-1.5 text-sm whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-none',
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot='tabs-content'
			className={cn(
				'focus-visible:ring-ring mt-2 ring-offset-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				className,
			)}
			{...props}
		/>
	);
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
