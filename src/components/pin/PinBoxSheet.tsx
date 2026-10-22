import { Check, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { PinArt } from '@/lib/pin-art';
import { PINS } from '@/lib/pins';
import { cn } from '@/lib/utils';
import { SheetTitle } from '../ui/sheet';

interface PinBoxSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	placedIds: Set<string>;
	count: number;
	total: number;
	onToggle: (id: string) => void;
	onReset: () => void;
}

export const PinBoxSheet = ({
	open,
	onOpenChange,
	placedIds,
	count,
	total,
	onToggle,
	onReset,
}: PinBoxSheetProps) => {
	const isMobile = useIsMobile();
	const [confirming, setConfirming] = useState(false);

	const handleReset = () => {
		onReset();
		setConfirming(false);
		onOpenChange(false);
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side={isMobile ? 'bottom' : 'right'}
				className={cn(
					'flex flex-col gap-0 border-2 border-black bg-base-100 p-0 text-foreground shadow-light dark:border-white dark:shadow-dark',
					isMobile ? 'max-h-[86vh] rounded-t-[26px]' : 'w-full sm:max-w-105',
				)}
			>
				<SheetHeader className='space-y-1.5 border-black border-b-2 p-5 pb-4 text-left dark:border-white'>
					<p className='font-medium text-[10px] text-primary uppercase tracking-[0.2em]'>A caixa</p>
					<SheetTitle className='font-normal font-serif text-2xl text-foreground'>
						Todos os pins
					</SheetTitle>
					<SheetDescription className='text-[13px] text-muted-foreground leading-snug'>
						Toque em um pin para pendurar no quadro ou devolver para a caixa.
					</SheetDescription>
					<p className='pt-1 text-[11px] text-muted-foreground uppercase tracking-[0.18em]'>
						{count} no quadro · {total - count} guardados
					</p>
				</SheetHeader>

				<div className='flex-1 overflow-y-auto overscroll-contain p-3'>
					<div className='grid grid-cols-2 gap-2.5 sm:grid-cols-3'>
						{PINS.map((pin) => {
							const onBoard = placedIds.has(pin.id);
							return (
								<button
									key={pin.id}
									type='button'
									onClick={() => onToggle(pin.id)}
									aria-pressed={onBoard}
									className={cn(
										'group flex flex-col items-center gap-2 rounded-base border-2 p-2.5 text-center transition-colors',
										'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
										onBoard
											? 'border-primary bg-primary/5'
											: 'border-black bg-base-100 shadow-light hover:border-primary hover:bg-base-200 dark:border-white dark:shadow-dark',
									)}
								>
									<div className='relative'>
										<PinArt
											image={pin.image}
											sizes='104px'
											icon={pin.icon}
											shape={pin.shape}
											enamel={pin.enamel}
											metal={pin.metal}
											size={104}
											className='transition-transform duration-300 group-hover:-translate-y-0.5'
										/>
										{onBoard && (
											<span className='absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-base border-2 border-black bg-primary text-primary-foreground dark:border-white'>
												<Check className='h-3 w-3' strokeWidth={3} />
											</span>
										)}
									</div>
									<span className='font-medium text-[12px] text-foreground leading-tight'>
										{pin.name}
									</span>
									<span className='text-[9px] text-muted-foreground uppercase tracking-[0.16em]'>
										{pin.series} · {pin.year}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className='flex items-center justify-between gap-2 border-black border-t-2 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white'>
					{confirming ? (
						<div className='flex items-center gap-2'>
							<button
								type='button'
								onClick={handleReset}
								className='rounded-base border-2 border-black bg-destructive px-3 py-1.5 font-semibold text-destructive-content text-xs shadow-light transition hover:brightness-110 dark:border-white dark:shadow-dark'
							>
								Confirmar
							</button>
							<button
								type='button'
								onClick={() => setConfirming(false)}
								className='rounded-base border-2 border-black bg-base-100 px-3 py-1.5 font-medium text-muted-foreground text-xs shadow-light transition hover:text-foreground dark:border-white dark:shadow-dark'
							>
								Cancelar
							</button>
						</div>
					) : (
						<button
							type='button'
							onClick={() => setConfirming(true)}
							className='flex items-center gap-1.5 rounded-base px-2 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground'
						>
							<RotateCcw className='h-3.5 w-3.5' />
							Restaurar coleção inicial
						</button>
					)}

					<button
						type='button'
						onClick={() => onOpenChange(false)}
						aria-label='Fechar a caixa'
						className='flex items-center gap-1.5 rounded-base border-2 border-black bg-base-100 px-3 py-1.5 font-semibold text-foreground text-xs shadow-light transition-colors hover:bg-muted dark:border-white dark:shadow-dark'
					>
						<X className='h-3.5 w-3.5' />
						Fechar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
};
