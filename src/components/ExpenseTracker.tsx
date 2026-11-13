'use client';

import { format } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createId } from '@/lib/id';
import { usePersistentState } from '@/lib/use-persistent-state';

type Expense = {
	id: string;
	amount: number;
	description: string;
	category: string;
	date: string;
};

const CATEGORY_LABELS: Record<string, string> = {
	groceries: 'Mercado',
	utilities: 'Contas',
	rent: 'Aluguel/Financiamento',
	entertainment: 'Lazer',
	home: 'Casa',
	other: 'Outros',
};

function daysAgo(days: number) {
	const date = new Date();
	date.setDate(date.getDate() - days);
	return date.toISOString();
}

const SEED: Expense[] = [
	{
		id: 'seed-1',
		amount: 120.5,
		description: 'Compras no mercado',
		category: 'groceries',
		date: daysAgo(2),
	},
	{
		id: 'seed-2',
		amount: 45,
		description: 'Conta de energia',
		category: 'utilities',
		date: daysAgo(5),
	},
	{
		id: 'seed-3',
		amount: 25.99,
		description: 'Itens de limpeza',
		category: 'home',
		date: daysAgo(8),
	},
];

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function ExpenseTracker() {
	const [expenses, setExpenses] = usePersistentState<Expense[]>('expenses', SEED);

	const [newExpense, setNewExpense] = useState({
		amount: '',
		description: '',
		category: 'groceries',
	});

	const [period, setPeriod] = useState('month');

	const handleAddExpense = () => {
		const amount = Number.parseFloat(newExpense.amount);
		const description = newExpense.description.trim();

		if (!Number.isFinite(amount) || amount <= 0 || description === '') return;

		setExpenses([
			...expenses,
			{
				id: createId(),
				amount,
				description,
				category: newExpense.category,
				date: new Date().toISOString(),
			},
		]);

		setNewExpense({
			amount: '',
			description: '',
			category: 'groceries',
		});
	};

	const deleteExpense = (id: string) => {
		setExpenses(expenses.filter((expense) => expense.id !== id));
	};

	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - now.getDay());

	const filteredExpenses = expenses
		.filter((expense) => {
			const date = new Date(expense.date);

			if (period === 'week') return date >= startOfWeek;
			if (period === 'month') return date >= startOfMonth;
			return true;
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

	const expensesByCategory = filteredExpenses.reduce(
		(acc, expense) => {
			acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
			return acc;
		},
		{} as Record<string, number>,
	);

	return (
		<div className='grid items-start gap-4 md:grid-cols-2 md:gap-6'>
			<Card className='bg-surface'>
				<CardHeader>
					<CardTitle>Adicionar despesa</CardTitle>
					<CardDescription>Registre as despesas da casa</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='amount'>Valor</Label>
							<Input
								id='amount'
								type='number'
								inputMode='decimal'
								min='0'
								step='0.01'
								placeholder='0,00'
								value={newExpense.amount}
								onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleAddExpense();
								}}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='description'>Descrição</Label>
							<Input
								id='description'
								placeholder='Com o que foi essa despesa?'
								value={newExpense.description}
								onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
								onKeyDown={(e) => {
									if (e.key === 'Enter') handleAddExpense();
								}}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='category'>Categoria</Label>
							<Select
								value={newExpense.category}
								onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
							>
								<SelectTrigger id='category' className='bg-base-100'>
									<SelectValue placeholder='Selecione a categoria' />
								</SelectTrigger>
								<SelectContent className='bg-base-100 shadow-light dark:shadow-dark border-2 border-black dark:border-white'>
									<SelectItem value='groceries'>Mercado</SelectItem>
									<SelectItem value='utilities'>Contas</SelectItem>
									<SelectItem value='rent'>Aluguel/Financiamento</SelectItem>
									<SelectItem value='entertainment'>Lazer</SelectItem>
									<SelectItem value='home'>Casa</SelectItem>
									<SelectItem value='other'>Outros</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleAddExpense} className='w-full'>
						<Plus className='mr-2 h-4 w-4' />
						Adicionar despesa
					</Button>
				</CardFooter>
			</Card>

			<div className='grid w-full content-start gap-4 md:gap-6'>
				<Card className='bg-surface w-full'>
					<CardHeader>
						<div className='flex w-full flex-wrap items-center justify-between gap-3'>
							<CardTitle>Resumo</CardTitle>
							<Tabs value={period} onValueChange={setPeriod}>
								<TabsList className='grid w-full grid-cols-3 bg-white/10'>
									<TabsTrigger
										value='week'
										className='data-[state=active]:bg-lime-400 data-[state=active]:text-black'
									>
										Semana
									</TabsTrigger>
									<TabsTrigger
										value='month'
										className='data-[state=active]:bg-lime-400 data-[state=active]:text-black'
									>
										Mês
									</TabsTrigger>
									<TabsTrigger
										value='all'
										className='data-[state=active]:bg-lime-400 data-[state=active]:text-black'
									>
										Tudo
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
						<CardDescription>
							{period === 'week'
								? 'Despesas desta semana'
								: period === 'month'
									? 'Despesas deste mês'
									: 'Todas as despesas'}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='text-3xl font-bold tracking-tight'>{brl.format(totalExpenses)}</div>
						<div className='mt-4 space-y-2'>
							{Object.entries(expensesByCategory).length === 0 ? (
								<p className='text-muted-foreground text-sm'>Nenhuma despesa no período</p>
							) : (
								Object.entries(expensesByCategory).map(([category, amount]) => (
									<div
										key={category}
										className='flex items-center justify-between border-t-2 border-black pt-2 text-sm dark:border-white/20'
									>
										<span className='text-muted-foreground'>
											{CATEGORY_LABELS[category] ?? category}
										</span>
										<span className='font-semibold'>{brl.format(amount)}</span>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>

				<Card className='bg-surface'>
					<CardHeader>
						<CardTitle>Despesas recentes</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3'>
							{filteredExpenses.length === 0 ? (
								<div className='rounded-base flex min-h-32 items-center justify-center border-2 border-dashed border-black p-6 dark:border-white'>
									<p className='text-muted-foreground text-sm'>Nenhuma despesa registrada</p>
								</div>
							) : (
								filteredExpenses.slice(0, 5).map((expense) => (
									<div
										key={expense.id}
										className='rounded-base bg-base-100 flex items-center justify-between gap-3 border-2 border-black p-3 dark:border-white'
									>
										<div className='min-w-0'>
											<div className='truncate font-medium'>{expense.description}</div>
											<div className='text-muted-foreground truncate text-xs'>
												{CATEGORY_LABELS[expense.category] ?? expense.category} ·{' '}
												{format(new Date(expense.date), 'dd/MM/yyyy')}
											</div>
										</div>
										<div className='flex shrink-0 items-center gap-1'>
											<span className='text-sm font-semibold'>{brl.format(expense.amount)}</span>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => deleteExpense(expense.id)}
												className='h-8 w-8'
											>
												<Trash2 className='h-4 w-4' />
												<span className='sr-only'>Remover despesa</span>
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
