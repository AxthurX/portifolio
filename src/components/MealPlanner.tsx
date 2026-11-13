'use client';

import { Plus, Trash2, UtensilsCrossed } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { createId } from '@/lib/id';
import { usePersistentState } from '@/lib/use-persistent-state';

type Meal = {
	id: string;
	name: string;
	ingredients: string;
	mealType: string;
	day: string;
};

const DAYS = [
	{ value: 'segunda', label: 'Segunda' },
	{ value: 'terca', label: 'Terça' },
	{ value: 'quarta', label: 'Quarta' },
	{ value: 'quinta', label: 'Quinta' },
	{ value: 'sexta', label: 'Sexta' },
	{ value: 'sabado', label: 'Sábado' },
	{ value: 'domingo', label: 'Domingo' },
] as const;

const MEAL_TYPES: Record<string, string> = {
	cafe: 'Café da manhã',
	almoco: 'Almoço',
	janta: 'Jantar',
	lanche: 'Lanche',
};

const SEED: Meal[] = [
	{
		id: 'seed-1',
		name: 'Macarrão à bolonhesa',
		ingredients: 'Carne moída, tomate, macarrão, cebola, alho',
		mealType: 'janta',
		day: 'segunda',
	},
	{
		id: 'seed-2',
		name: 'Salada de frango',
		ingredients: 'Peito de frango, alface, tomate, pepino, azeite',
		mealType: 'almoco',
		day: 'terca',
	},
];

const selectContentClass =
	'border-2 border-black bg-base-100 shadow-light dark:border-white dark:shadow-dark';

export function MealPlanner() {
	const [meals, setMeals] = usePersistentState<Meal[]>('meals', SEED);

	const [newMeal, setNewMeal] = useState({
		name: '',
		ingredients: '',
		mealType: 'janta',
		day: 'segunda',
	});

	const handleAddMeal = () => {
		const name = newMeal.name.trim();

		if (name === '') return;

		setMeals([
			...meals,
			{
				id: createId(),
				...newMeal,
				name,
				ingredients: newMeal.ingredients.trim(),
			},
		]);

		setNewMeal({
			name: '',
			ingredients: '',
			mealType: 'janta',
			day: 'segunda',
		});
	};

	const deleteMeal = (id: string) => {
		setMeals(meals.filter((meal) => meal.id !== id));
	};

	return (
		<div className='grid items-start gap-4 md:grid-cols-2 md:gap-6'>
			<Card className='bg-surface'>
				<CardHeader>
					<div className='flex items-center gap-3'>
						<div className='rounded-base bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black dark:border-white'>
							<UtensilsCrossed className='h-4 w-4' />
						</div>
						<div>
							<CardTitle>Planejador de refeições</CardTitle>
							<CardDescription>Planeje a semana</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='meal-name'>Nome da refeição</Label>
							<Input
								id='meal-name'
								placeholder='Ex.: Frango grelhado'
								value={newMeal.name}
								onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='ingredients'>Ingredientes</Label>
							<Textarea
								id='ingredients'
								placeholder='Liste os ingredientes'
								value={newMeal.ingredients}
								onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
								className='bg-base-100'
							/>
						</div>
						<div className='grid gap-4 sm:grid-cols-2'>
							<div className='grid gap-2'>
								<Label htmlFor='meal-type'>Tipo</Label>
								<Select
									value={newMeal.mealType}
									onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value })}
								>
									<SelectTrigger id='meal-type' className='bg-base-100'>
										<SelectValue placeholder='Selecione o tipo' />
									</SelectTrigger>
									<SelectContent className={selectContentClass}>
										{Object.entries(MEAL_TYPES).map(([value, label]) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='grid gap-2'>
								<Label htmlFor='day'>Dia</Label>
								<Select
									value={newMeal.day}
									onValueChange={(value) => setNewMeal({ ...newMeal, day: value })}
								>
									<SelectTrigger id='day' className='bg-base-100'>
										<SelectValue placeholder='Selecione o dia' />
									</SelectTrigger>
									<SelectContent className={selectContentClass}>
										{DAYS.map((day) => (
											<SelectItem key={day.value} value={day.value}>
												{day.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleAddMeal} className='w-full'>
						<Plus className='mr-2 h-4 w-4' />
						Adicionar refeição
					</Button>
				</CardFooter>
			</Card>

			<Card className='bg-surface'>
				<CardHeader>
					<CardTitle>Semana</CardTitle>
					<CardDescription>Sua agenda de refeições</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-3'>
						{DAYS.map((day) => {
							const dayMeals = meals.filter((meal) => meal.day === day.value);

							return (
								<div
									key={day.value}
									className='rounded-base bg-base-100 border-2 border-black p-3 dark:border-white'
								>
									<h3 className='font-semibold'>{day.label}</h3>
									{dayMeals.length === 0 ? (
										<p className='text-muted-foreground mt-1 text-sm'>Nenhuma refeição planejada</p>
									) : (
										<div className='mt-2 space-y-2'>
											{dayMeals.map((meal) => (
												<div
													key={meal.id}
													className='flex items-center justify-between gap-2 border-t-2 border-black pt-2 dark:border-white/20'
												>
													<div className='min-w-0'>
														<div className='truncate font-medium'>{meal.name}</div>
														<div className='text-muted-foreground text-xs'>
															{MEAL_TYPES[meal.mealType] ?? meal.mealType}
															{meal.ingredients ? ` · ${meal.ingredients}` : ''}
														</div>
													</div>
													<Button
														variant='ghost'
														size='icon'
														onClick={() => deleteMeal(meal.id)}
														className='h-8 w-8 shrink-0'
													>
														<Trash2 className='h-4 w-4' />
														<span className='sr-only'>Remover refeição</span>
													</Button>
												</div>
											))}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
