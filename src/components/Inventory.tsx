'use client';

import { Package, Plus, Search, Trash2 } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { createId } from '@/lib/id';
import { usePersistentState } from '@/lib/use-persistent-state';

type InventoryItem = {
	id: string;
	name: string;
	quantity: number;
	category: string;
	location: string;
};

const CATEGORY_LABELS: Record<string, string> = {
	supplies: 'Suprimentos',
	cleaning: 'Limpeza',
	food: 'Alimentos',
	maintenance: 'Manutenção',
	other: 'Outros',
};

const LOCATION_LABELS: Record<string, string> = {
	kitchen: 'Cozinha',
	bathroom: 'Banheiro',
	bedroom: 'Quarto',
	garage: 'Garagem',
	laundry: 'Lavanderia',
	other: 'Outro',
};

const LOW_STOCK = 2;

const SEED: InventoryItem[] = [
	{ id: 'seed-1', name: 'Papel toalha', quantity: 4, category: 'supplies', location: 'kitchen' },
	{
		id: 'seed-2',
		name: 'Sabão em pó',
		quantity: 1,
		category: 'cleaning',
		location: 'laundry',
	},
	{
		id: 'seed-3',
		name: 'Lâmpadas',
		quantity: 6,
		category: 'maintenance',
		location: 'garage',
	},
];

export function Inventory() {
	const [items, setItems] = usePersistentState<InventoryItem[]>('inventory', SEED);

	const [newItem, setNewItem] = useState({
		name: '',
		quantity: 1,
		category: 'supplies',
		location: 'kitchen',
	});

	const [searchTerm, setSearchTerm] = useState('');
	const [filterCategory, setFilterCategory] = useState('all');

	const handleAddItem = () => {
		const name = newItem.name.trim();

		if (name === '') return;

		setItems([
			...items,
			{
				id: createId(),
				...newItem,
				name,
				quantity: Math.max(1, newItem.quantity),
			},
		]);

		setNewItem({
			name: '',
			quantity: 1,
			category: 'supplies',
			location: 'kitchen',
		});
	};

	const deleteItem = (id: string) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: string, change: number) => {
		setItems(
			items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: Math.max(0, item.quantity + change) };
				}

				return item;
			}),
		);
	};

	const filteredItems = items.filter((item) => {
		const matchesSearch = item.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
		const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
		return matchesSearch && matchesCategory;
	});

	const lowStock = items.filter((item) => item.quantity <= LOW_STOCK).length;

	return (
		<div className='grid items-start gap-4 md:grid-cols-2 md:gap-6'>
			<Card className='bg-surface'>
				<CardHeader>
					<div className='flex items-center gap-3'>
						<div className='rounded-base bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black dark:border-white'>
							<Package className='h-4 w-4' />
						</div>
						<div>
							<CardTitle>Inventário da casa</CardTitle>
							<CardDescription>Acompanhe itens e suprimentos</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='item-name'>Nome do item</Label>
							<Input
								id='item-name'
								placeholder='Ex.: Detergente'
								value={newItem.name}
								onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='quantity'>Quantidade</Label>
							<Input
								id='quantity'
								type='number'
								min='1'
								value={newItem.quantity}
								onChange={(e) =>
									setNewItem({
										...newItem,
										quantity: Math.max(1, Number.parseInt(e.target.value, 10) || 1),
									})
								}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div className='grid gap-2'>
								<Label htmlFor='category'>Categoria</Label>
								<Select
									value={newItem.category}
									onValueChange={(value) => setNewItem({ ...newItem, category: value })}
								>
									<SelectTrigger id='category' className='bg-base-100'>
										<SelectValue placeholder='Selecione a categoria' />
									</SelectTrigger>
									<SelectContent className='bg-base-100 shadow-light dark:shadow-dark border-2 border-black dark:border-white'>
										{Object.entries(CATEGORY_LABELS).map(([value, label]) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='location'>Local</Label>
								<Select
									value={newItem.location}
									onValueChange={(value) => setNewItem({ ...newItem, location: value })}
								>
									<SelectTrigger id='location' className='bg-base-100'>
										<SelectValue placeholder='Selecione o local' />
									</SelectTrigger>
									<SelectContent className='bg-base-100 shadow-light dark:shadow-dark border-2 border-black dark:border-white'>
										{Object.entries(LOCATION_LABELS).map(([value, label]) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleAddItem} className='w-full'>
						<Plus className='mr-2 h-4 w-4' />
						Adicionar item
					</Button>
				</CardFooter>
			</Card>

			<Card className='bg-surface'>
				<CardHeader>
					<CardTitle>Itens</CardTitle>
					<CardDescription>
						{items.length === 1 ? '1 item' : `${items.length} itens`} ·{' '}
						{lowStock === 0
							? 'estoque em dia'
							: lowStock === 1
								? '1 com estoque baixo'
								: `${lowStock} com estoque baixo`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='mb-4 flex flex-col gap-2 sm:flex-row'>
						<div className='relative flex-1'>
							<Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
							<Input
								placeholder='Buscar itens...'
								className='bg-base-100 pl-9'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<Select value={filterCategory} onValueChange={setFilterCategory}>
							<SelectTrigger className='bg-base-100 w-full sm:w-44'>
								<SelectValue placeholder='Categoria' />
							</SelectTrigger>
							<SelectContent className='bg-base-100 shadow-light dark:shadow-dark border-2 border-black dark:border-white'>
								<SelectItem value='all'>Todas</SelectItem>
								{Object.entries(CATEGORY_LABELS).map(([value, label]) => (
									<SelectItem key={value} value={value}>
										{label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-3'>
						{filteredItems.length === 0 ? (
							<div className='rounded-base flex min-h-40 items-center justify-center border-2 border-dashed border-black p-6 text-center dark:border-white'>
								<p className='text-muted-foreground text-sm'>Nenhum item encontrado</p>
							</div>
						) : (
							filteredItems.map((item) => (
								<div
									key={item.id}
									className='rounded-base bg-base-100 flex flex-col gap-3 border-2 border-black p-3 dark:border-white'
								>
									<div className='flex items-start justify-between gap-2'>
										<div className='min-w-0'>
											<div className='truncate font-medium'>{item.name}</div>
											<div className='mt-1 flex flex-wrap items-center gap-2'>
												<Badge
													variant='outline'
													className='text-foreground border-black dark:border-white'
												>
													{CATEGORY_LABELS[item.category] ?? item.category}
												</Badge>
												<span className='text-muted-foreground text-xs'>
													{LOCATION_LABELS[item.location] ?? item.location}
												</span>
												{item.quantity <= LOW_STOCK ? (
													<Badge className='bg-primary/15 text-primary border-0 text-xs'>
														Estoque baixo
													</Badge>
												) : null}
											</div>
										</div>
										<Button
											variant='ghost'
											size='icon'
											onClick={() => deleteItem(item.id)}
											className='h-8 w-8 shrink-0'
										>
											<Trash2 className='h-4 w-4' />
											<span className='sr-only'>Remover item</span>
										</Button>
									</div>
									<div className='flex items-center gap-2'>
										<Button
											variant='outline'
											size='icon'
											onClick={() => updateQuantity(item.id, -1)}
											disabled={item.quantity <= 0}
											className='bg-background h-8 w-8 border-black dark:border-white'
										>
											-<span className='sr-only'>Diminuir quantidade</span>
										</Button>
										<span className='w-10 text-center font-semibold'>{item.quantity}</span>
										<Button
											variant='outline'
											size='icon'
											onClick={() => updateQuantity(item.id, 1)}
											className='bg-background h-8 w-8 border-black dark:border-white'
										>
											+<span className='sr-only'>Aumentar quantidade</span>
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
