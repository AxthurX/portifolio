'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import type * as React from 'react';

import { cn } from '@/src/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return <TabsPrimitive.Root data-slot='tabs' className={cn('w-full', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot='tabs-list'
			className={cn(
				'my-3 inline-flex h-[3.5rem] items-center justify-center gap-1.5 rounded-base border-2 border-black bg-beige-100 pr-3 pb-2 pl-1 text-black shadow-light max-sm:h-28',
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
				'flex items-end justify-center whitespace-nowrap rounded-base border-2 border-black bg-primary py-1.5 text-slate-50 text-sm shadow-light transition-all hover:bg-calpolygreen-800/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:translate-x-boxShadowX data-[state=active]:translate-y-boxShadowY data-[state=active]:shadow-none',
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
				'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
				className,
			)}
			{...props}
		/>
	);
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
