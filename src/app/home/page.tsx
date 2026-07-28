import {
	CalendarDays,
	CheckSquare,
	DollarSign,
	HomeIcon,
	Package,
	UtensilsCrossed,
} from 'lucide-react';
import { Calendar } from '@/src/components/calendar';
import { DashboardHeader } from '@/src/components/dashboard-header';
import { ExpenseTracker } from '@/src/components/expense-tracker';
import { Inventory } from '@/src/components/inventory';
import { MealPlanner } from '@/src/components/meal-planner';
import { SmartHome } from '@/src/components/smart-home';
import { TodoList } from '@/src/components/todo-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

export default function Home() {
	return (
		<div className='flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-fixed'>
			<div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-center bg-cover opacity-10" />
			<DashboardHeader />
			<main className='relative z-10 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
				<Tabs defaultValue='smart-home'>
					<TabsList className='mx-auto grid w-full max-w-4xl grid-cols-3 rounded-full bg-white/10 backdrop-blur-md md:grid-cols-6'>
						<TabsTrigger value='smart-home' className='gap-2 rounded-full'>
							<HomeIcon className='h-4 w-4' />
							<span className='hidden sm:inline'>Smart Home</span>
						</TabsTrigger>
						<TabsTrigger value='calendar' className='gap-2 rounded-full'>
							<CalendarDays className='h-4 w-4' />
							<span className='hidden sm:inline'>Calendar</span>
						</TabsTrigger>
						<TabsTrigger value='todo' className='gap-2 rounded-full'>
							<CheckSquare className='h-4 w-4' />
							<span className='hidden sm:inline'>Todo</span>
						</TabsTrigger>
						<TabsTrigger value='expenses' className='gap-2 rounded-full'>
							<DollarSign className='h-4 w-4' />
							<span className='hidden sm:inline'>Expenses</span>
						</TabsTrigger>
						<TabsTrigger value='meals' className='gap-2 rounded-full'>
							<UtensilsCrossed className='h-4 w-4' />
							<span className='hidden sm:inline'>Meals</span>
						</TabsTrigger>
						<TabsTrigger value='inventory' className='gap-2 rounded-full'>
							<Package className='h-4 w-4' />
							<span className='hidden sm:inline'>Inventory</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value='smart-home' className='space-y-4'>
						<SmartHome />
					</TabsContent>
					<TabsContent value='calendar' className='space-y-4'>
						<Calendar />
					</TabsContent>
					<TabsContent value='todo' className='space-y-4'>
						<TodoList />
					</TabsContent>
					<TabsContent value='expenses' className='space-y-4'>
						<ExpenseTracker />
					</TabsContent>
					<TabsContent value='meals' className='space-y-4'>
						<MealPlanner />
					</TabsContent>
					<TabsContent value='inventory' className='space-y-4'>
						<Inventory />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
