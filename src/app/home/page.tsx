import {
	CalendarDays,
	CheckSquare,
	DollarSign,
	HomeIcon,
	Package,
	UtensilsCrossed,
} from 'lucide-react';
import { Calendar } from '@/components/Calendar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ExpenseTracker } from '@/components/ExpenseTracker';
import { Inventory } from '@/components/Inventory';
import { MealPlanner } from '@/components/MealPlanner';
import { SmartHome } from '@/components/SmartHome';
import { TodoList } from '@/components/TodoList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TABS = [
	{ value: 'smart-home', label: 'Casa', icon: HomeIcon },
	{ value: 'calendar', label: 'Agenda', icon: CalendarDays },
	{ value: 'todo', label: 'Tarefas', icon: CheckSquare },
	{ value: 'expenses', label: 'Despesas', icon: DollarSign },
	{ value: 'meals', label: 'Refeições', icon: UtensilsCrossed },
	{ value: 'inventory', label: 'Inventário', icon: Package },
] as const;

export default async function Home({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
	const { tab } = await searchParams;
	const initial_tabs = TABS.find((item) => item.value === tab)?.value ?? 'smart-home';

	return (
		<div className='bg-background min-h-screen w-full'>
			<DashboardHeader />

			<main className='12 mx-auto w-full max-w-430 px-4 py-4 md:px-8 lg:px-12'>
				<Tabs defaultValue={initial_tabs}>
					<TabsList className='rounded-base bg-base-100 text-foreground shadow-light dark:shadow-dark grid h-auto w-full grid-cols-3 gap-2 border-2 border-black p-2 max-sm:h-auto sm:grid-cols-6 dark:border-white'>
						{TABS.map(({ value, label, icon: Icon }) => (
							<TabsTrigger
								key={value}
								value={value}
								className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-content dark:text-base-content dark:shadow-dark flex h-auto flex-col items-center justify-center gap-1 border-2 border-black px-2 py-2 text-xs transition-all data-[state=active]:translate-x-0 data-[state=active]:translate-y-0 data-[state=active]:shadow-none sm:flex-row sm:gap-2 md:text-sm dark:border-white'
							>
								<Icon className='h-4 w-4 shrink-0' />
								<span className='text-[10px] leading-tight sm:text-sm'>{label}</span>
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value='smart-home' className='mt-6'>
						<SmartHome />
					</TabsContent>
					<TabsContent value='calendar' className='mt-6'>
						<Calendar />
					</TabsContent>
					<TabsContent value='todo' className='mt-6'>
						<TodoList />
					</TabsContent>
					<TabsContent value='expenses' className='mt-6'>
						<ExpenseTracker />
					</TabsContent>
					<TabsContent value='meals' className='mt-6'>
						<MealPlanner />
					</TabsContent>
					<TabsContent value='inventory' className='mt-6'>
						<Inventory />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
