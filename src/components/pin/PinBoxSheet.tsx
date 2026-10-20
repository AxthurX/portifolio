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
					'flex flex-col gap-0 border-border bg-base-100 p-0 text-foreground',
					isMobile ? 'max-h-[86vh] rounded-t-[26px]' : 'w-full sm:max-w-105',
				)}
			>
				<SheetHeader className='space-y-1.5 border-border border-b p-5 pb-4 text-left'>
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
										'group flex flex-col items-center gap-2 rounded-2xl border p-2.5 text-center transition-colors',
										'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
										onBoard
											? 'border-primary/45 bg-primary/5'
											: 'border-border bg-base-100 hover:border-primary/40 hover:bg-base-200/60',
									)}
								>
									<div className='relative'>
										<PinArt
											image={pin.image}
											imageSrcSet={pin.imageSrcSet}
											sizes='104px'
											icon={pin.icon}
											shape={pin.shape}
											enamel={pin.enamel}
											metal={pin.metal}
											size={104}
											className='transition-transform duration-300 group-hover:-translate-y-0.5'
										/>
										{onBoard && (
											<span className='absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground'>
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

				<div className='flex items-center justify-between gap-2 border-border border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
					{confirming ? (
						<div className='flex items-center gap-2'>
							<button
								type='button'
								onClick={handleReset}
								className='rounded-full bg-destructive px-3 py-1.5 font-semibold text-destructive-content text-xs transition hover:brightness-110'
							>
								Confirmar
							</button>
							<button
								type='button'
								onClick={() => setConfirming(false)}
								className='rounded-full px-3 py-1.5 font-medium text-muted-foreground text-xs transition hover:text-foreground'
							>
								Cancelar
							</button>
						</div>
					) : (
						<button
							type='button'
							onClick={() => setConfirming(true)}
							className='flex items-center gap-1.5 rounded-full px-2 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground'
						>
							<RotateCcw className='h-3.5 w-3.5' />
							Restaurar coleção inicial
						</button>
					)}

					<button
						type='button'
						onClick={() => onOpenChange(false)}
						aria-label='Fechar a caixa'
						className='flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-semibold text-foreground text-xs transition-colors hover:bg-muted'
					>
						<X className='h-3.5 w-3.5' />
						Fechar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
};
