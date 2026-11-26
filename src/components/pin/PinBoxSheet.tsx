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
					'bg-base-100 text-foreground shadow-light dark:shadow-dark flex flex-col gap-0 border-2 border-black p-0 dark:border-white',
					isMobile ? 'max-h-[86vh] rounded-t-[26px]' : 'w-full sm:max-w-105',
				)}
			>
				<SheetHeader className='space-y-1.5 border-b-2 border-black p-5 pb-4 text-left dark:border-white'>
					<p className='text-primary text-[10px] font-medium tracking-[0.2em] uppercase'>A caixa</p>
					<SheetTitle className='text-foreground font-serif text-2xl font-normal'>
						Todas licenças e certificados
					</SheetTitle>
					<SheetDescription className='text-muted-foreground text-[13px] leading-snug'>
						Toque em um certificado para pendurar no quadro ou devolver para a caixa.
					</SheetDescription>
					<p className='text-muted-foreground pt-1 text-[11px] tracking-[0.18em] uppercase'>
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
										'group rounded-base flex flex-col items-center gap-2 border-2 p-2.5 text-center transition-colors',
										'focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
										onBoard
											? 'border-primary bg-primary/5'
											: 'bg-base-100 shadow-light hover:border-primary hover:bg-base-200 dark:shadow-dark border-black dark:border-white',
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
											<span className='rounded-base bg-primary text-primary-foreground absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center border-2 border-black dark:border-white'>
												<Check className='h-3 w-3' strokeWidth={3} />
											</span>
										)}
									</div>
									<span className='text-foreground text-[12px] leading-tight font-medium'>
										{pin.name}
									</span>
									<span className='text-muted-foreground text-[9px] tracking-[0.16em] uppercase'>
										{pin.series} · {pin.year}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div className='flex items-center justify-between gap-2 border-t-2 border-black p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white'>
					{confirming ? (
						<div className='flex items-center gap-2'>
							<button
								type='button'
								onClick={handleReset}
								className='rounded-base bg-destructive text-destructive-content shadow-light dark:shadow-dark border-2 border-black px-3 py-1.5 text-xs font-semibold transition hover:brightness-110 dark:border-white'
							>
								Confirmar
							</button>
							<button
								type='button'
								onClick={() => setConfirming(false)}
								className='rounded-base bg-base-100 text-muted-foreground shadow-light hover:text-foreground dark:shadow-dark border-2 border-black px-3 py-1.5 text-xs font-medium transition dark:border-white'
							>
								Cancelar
							</button>
						</div>
					) : (
						<button
							type='button'
							onClick={() => setConfirming(true)}
							className='rounded-base text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium transition-colors'
						>
							<RotateCcw className='h-3.5 w-3.5' />
							Restaurar coleção inicial
						</button>
					)}

					<button
						type='button'
						onClick={() => onOpenChange(false)}
						aria-label='Fechar a caixa'
						className='rounded-base bg-base-100 text-foreground shadow-light hover:bg-muted dark:shadow-dark flex items-center gap-1.5 border-2 border-black px-3 py-1.5 text-xs font-semibold transition-colors dark:border-white'
					>
						<X className='h-3.5 w-3.5' />
						Fechar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
};
