'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { createId } from '@/lib/id';
import { usePersistentState } from '@/lib/use-persistent-state';
import { cn } from '@/lib/utils';

type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
};

function daysFromNow(days: number, hour = 18) {
	const date = new Date();
	date.setDate(date.getDate() + days);
	date.setHours(hour, 0, 0, 0);
	return date.toISOString();
}

const SEED: Event[] = [
	{
		id: 'seed-1',
		title: 'Jantar em família',
		description: 'Jantar semanal em casa',
		date: daysFromNow(4),
	},
	{
		id: 'seed-2',
		title: 'Manutenção da casa',
		description: 'Checar detectores de fumaça e trocar filtros',
		date: daysFromNow(9, 10),
	},
];

const calendarClass = 'rounded-base border-2 border-black bg-base-100 dark:border-white';

const dialogContentClass =
	'border-2 border-black bg-base-100 shadow-light dark:border-white dark:shadow-dark';

export function Calendar() {
	const [events, setEvents] = usePersistentState<Event[]>('events', SEED);
	const [date, setDate] = useState<Date>(new Date());
	const [open, setOpen] = useState(false);
	const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
		title: '',
		description: '',
		date: new Date().toISOString(),
	});

	const handleAddEvent = () => {
		const title = newEvent.title.trim();

		if (title === '') return;

		setEvents([...events, { ...newEvent, title, id: createId() }]);
		setNewEvent({
			title: '',
			description: '',
			date: new Date().toISOString(),
		});
		setOpen(false);
	};

	const deleteEvent = (id: string) => {
		setEvents(events.filter((event) => event.id !== id));
	};

	const eventsForSelectedDate = events
		.filter((event) => new Date(event.date).toDateString() === date.toDateString())
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return (
		<div className='grid items-start gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
			<Card className='bg-surface md:col-span-1'>
				<CardHeader>
					<CardTitle>Calendário</CardTitle>
					<CardDescription>Veja e organize sua agenda</CardDescription>
				</CardHeader>
				<CardContent className='px-3 md:px-4'>
					<CalendarComponent
						mode='single'
						locale={ptBR}
						selected={date}
						onSelect={(value) => value && setDate(value)}
						className={calendarClass}
					/>
				</CardContent>
				<CardFooter className='flex flex-wrap items-center justify-between gap-3'>
					<p className='text-muted-foreground text-sm'>{format(date, 'PPP', { locale: ptBR })}</p>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button size='sm'>
								<Plus className='mr-2 h-4 w-4' />
								Novo evento
							</Button>
						</DialogTrigger>
						<DialogContent className={dialogContentClass}>
							<DialogHeader>
								<DialogTitle>Novo evento</DialogTitle>
								<DialogDescription>Crie um evento para o calendário</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid gap-2'>
									<Label htmlFor='title'>Título</Label>
									<Input
										id='title'
										value={newEvent.title}
										onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
										className='bg-background'
									/>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='description'>Descrição</Label>
									<Textarea
										id='description'
										value={newEvent.description}
										onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
										className='bg-background'
									/>
								</div>
								<div className='grid gap-2'>
									<Label>Data</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												className={cn(
													'bg-background w-full justify-start text-left font-normal',
													!newEvent.date && 'text-muted-foreground',
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{newEvent.date ? (
													format(new Date(newEvent.date), 'PPP', { locale: ptBR })
												) : (
													<span>Escolha uma data</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='bg-base-100 shadow-light dark:shadow-dark w-auto border-2 border-black p-0 dark:border-white'>
											<CalendarComponent
												mode='single'
												locale={ptBR}
												selected={new Date(newEvent.date)}
												onSelect={(value) =>
													value && setNewEvent({ ...newEvent, date: value.toISOString() })
												}
												className={calendarClass}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleAddEvent}>Salvar evento</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>

			<Card className='bg-surface md:col-span-1 lg:col-span-2'>
				<CardHeader>
					<CardTitle className='text-xl md:text-2xl'>
						Eventos de {format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
					</CardTitle>
					<CardDescription>
						{eventsForSelectedDate.length === 0
							? 'Nenhum evento para este dia'
							: eventsForSelectedDate.length === 1
								? '1 evento agendado'
								: `${eventsForSelectedDate.length} eventos agendados`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-3'>
						{eventsForSelectedDate.length === 0 ? (
							<div className='rounded-base flex min-h-40 items-center justify-center border-2 border-dashed border-black p-6 text-center dark:border-white'>
								<div>
									<h3 className='text-lg font-semibold'>Nenhum evento</h3>
									<p className='text-muted-foreground text-sm'>Adicione um evento para começar</p>
								</div>
							</div>
						) : (
							eventsForSelectedDate.map((event) => (
								<div
									key={event.id}
									className='rounded-base bg-base-100 flex items-start justify-between gap-3 border-2 border-black p-3 dark:border-white'
								>
									<div className='min-w-0'>
										<h3 className='truncate font-medium'>{event.title}</h3>
										{event.description ? (
											<p className='text-muted-foreground text-sm'>{event.description}</p>
										) : null}
										<p className='text-muted-foreground mt-2 text-xs'>
											{format(new Date(event.date), 'HH:mm')}
										</p>
									</div>
									<Button
										variant='ghost'
										size='icon'
										onClick={() => deleteEvent(event.id)}
										className='h-8 w-8 shrink-0'
									>
										<Trash2 className='h-4 w-4' />
										<span className='sr-only'>Remover evento</span>
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
