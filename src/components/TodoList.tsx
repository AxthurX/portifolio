'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createId } from '@/lib/id';
import { usePersistentState } from '@/lib/use-persistent-state';

type Todo = {
	id: string;
	text: string;
	completed: boolean;
	category: string;
};

const CATEGORY_LABELS: Record<string, string> = {
	home: 'Casa',
	finance: 'Finanças',
	shopping: 'Compras',
};

const SEED: Todo[] = [
	{ id: 'seed-1', text: 'Limpar a cozinha', completed: false, category: 'home' },
	{ id: 'seed-2', text: 'Pagar as contas do mês', completed: true, category: 'finance' },
	{ id: 'seed-3', text: 'Comprar mantimentos', completed: false, category: 'shopping' },
];

const selectContentClass =
	'border-2 border-black bg-base-100 shadow-light dark:border-white dark:shadow-dark';

export function TodoList() {
	const [todos, setTodos] = usePersistentState<Todo[]>('todos', SEED);
	const [newTodo, setNewTodo] = useState('');
	const [category, setCategory] = useState('home');
	const [filter, setFilter] = useState('all');

	const handleAddTodo = () => {
		const text = newTodo.trim();

		if (text === '') return;

		setTodos([
			...todos,
			{
				id: createId(),
				text,
				completed: false,
				category,
			},
		]);
		setNewTodo('');
	};

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
		);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const clearCompleted = () => {
		setTodos(todos.filter((todo) => !todo.completed));
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'all') return true;
		if (filter === 'completed') return todo.completed;
		if (filter === 'active') return !todo.completed;
		return todo.category === filter;
	});

	const pending = todos.filter((todo) => !todo.completed).length;

	return (
		<div className='grid items-start gap-4 md:grid-cols-2 md:gap-6'>
			<Card className='bg-surface'>
				<CardHeader>
					<CardTitle>Lista de tarefas</CardTitle>
					<CardDescription>Organize as tarefas da casa por categoria</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-2 sm:flex-row'>
						<Input
							placeholder='Nova tarefa...'
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleAddTodo();
							}}
							className='bg-base-100'
						/>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger className='bg-base-100 w-full sm:w-36'>
								<SelectValue placeholder='Categoria' />
							</SelectTrigger>
							<SelectContent className={selectContentClass}>
								<SelectItem value='home'>Casa</SelectItem>
								<SelectItem value='finance'>Finanças</SelectItem>
								<SelectItem value='shopping'>Compras</SelectItem>
							</SelectContent>
						</Select>
						<Button onClick={handleAddTodo} className='shrink-0 sm:px-3'>
							<Plus className='h-4 w-4' />
							<span className='sm:sr-only'>Adicionar</span>
						</Button>
					</div>
				</CardContent>
				<CardFooter className='flex flex-wrap items-center justify-between gap-3 border-t-2 border-black px-6 py-4 dark:border-white'>
					<div className='text-muted-foreground text-xs'>
						{pending === 1 ? '1 tarefa pendente' : `${pending} tarefas pendentes`}
					</div>
					<div className='flex w-full items-center gap-2 sm:w-auto'>
						<Button
							variant='ghost'
							size='sm'
							onClick={clearCompleted}
							disabled={todos.length === pending}
							className='h-9 text-xs'
						>
							Limpar concluídas
						</Button>
						<Select value={filter} onValueChange={setFilter}>
							<SelectTrigger className='bg-base-100 h-9 w-32'>
								<SelectValue placeholder='Filtro' />
							</SelectTrigger>
							<SelectContent className={selectContentClass}>
								<SelectItem value='all'>Todas</SelectItem>
								<SelectItem value='active'>Pendentes</SelectItem>
								<SelectItem value='completed'>Concluídas</SelectItem>
								<SelectItem value='home'>Casa</SelectItem>
								<SelectItem value='finance'>Finanças</SelectItem>
								<SelectItem value='shopping'>Compras</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardFooter>
			</Card>

			<Card className='bg-surface'>
				<CardHeader>
					<CardTitle>Tarefas</CardTitle>
					<CardDescription>
						{filter === 'all'
							? 'Todas as tarefas'
							: filter === 'completed'
								? 'Tarefas concluídas'
								: filter === 'active'
									? 'Tarefas pendentes'
									: `${CATEGORY_LABELS[filter] ?? filter} · tarefas`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-3'>
						{filteredTodos.length === 0 ? (
							<div className='rounded-base flex min-h-40 items-center justify-center border-2 border-dashed border-black p-6 text-center dark:border-white'>
								<div>
									<h3 className='text-lg font-semibold'>Nenhuma tarefa</h3>
									<p className='text-muted-foreground text-sm'>Adicione uma tarefa para começar</p>
								</div>
							</div>
						) : (
							filteredTodos.map((todo) => (
								<div
									key={todo.id}
									className='rounded-base bg-base-100 flex items-center justify-between gap-3 border-2 border-black p-3 dark:border-white'
								>
									<div className='flex min-w-0 items-center gap-3'>
										<Checkbox
											checked={todo.completed}
											onCheckedChange={() => toggleTodo(todo.id)}
											className='data-[state=checked]:border-primary data-[state=checked]:bg-primary border-black dark:border-white'
										/>
										<span
											className={
												todo.completed ? 'text-muted-foreground truncate line-through' : 'truncate'
											}
										>
											{todo.text}
										</span>
										<Badge
											variant='outline'
											className='text-foreground hidden shrink-0 border-black sm:inline-flex dark:border-white'
										>
											{CATEGORY_LABELS[todo.category] ?? todo.category}
										</Badge>
									</div>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => deleteTodo(todo.id)}
										className='h-8 w-8 shrink-0'
									>
										<Trash2 className='h-4 w-4' />
										<span className='sr-only'>Remover tarefa</span>
									</Button>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
