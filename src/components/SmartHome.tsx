'use client';

import {
	Camera,
	Cloud,
	Droplets,
	LightbulbIcon,
	Minus,
	Plus,
	Speaker,
	Sun,
	Thermometer,
	Tv,
	Wifi,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { usePersistentState } from '@/lib/use-persistent-state';

type Devices = {
	light: boolean;
	airConditioner: boolean;
	tv: boolean;
	router: boolean;
	speaker: boolean;
	cctv: boolean;
	humidifier: boolean;
};

const SEED_DEVICES: Devices = {
	light: true,
	airConditioner: true,
	tv: false,
	router: true,
	speaker: true,
	cctv: true,
	humidifier: false,
};

const DEVICE_LABELS: Record<keyof Devices, string> = {
	light: 'Luz',
	airConditioner: 'Ar-condicionado',
	tv: 'Smart TV',
	router: 'Roteador',
	speaker: 'Caixa de som',
	cctv: 'Câmeras',
	humidifier: 'Umidificador',
};

const DEVICE_ICONS = {
	light: LightbulbIcon,
	airConditioner: Thermometer,
	tv: Tv,
	router: Wifi,
	speaker: Speaker,
	cctv: Camera,
	humidifier: Droplets,
};

const METRICS = [
	{ icon: LightbulbIcon, label: 'Consumo atual', value: '1,1 kW' },
	{ icon: Droplets, label: 'Umidade', value: '50,2%' },
	{ icon: Thermometer, label: 'Temperatura', value: '16 °C' },
	{ icon: LightbulbIcon, label: 'Energia', value: '2,2 kWh' },
] as const;

export function SmartHome() {
	const [temperature, setTemperature, { hydrated: tempHydrated }] = usePersistentState<number>(
		'temperature',
		22,
	);
	const [devices, setDevices, { hydrated: devicesHydrated }] = usePersistentState<Devices>(
		'devices',
		SEED_DEVICES,
	);

	const toggleDevice = (device: keyof Devices) => {
		setDevices({ ...devices, [device]: !devices[device] });
	};

	const activeDevices = Object.entries(devices).filter(([, on]) => on).length;

	return (
		<div className='grid gap-4 md:gap-6 lg:grid-cols-3'>
			<div className='grid content-start gap-4 md:gap-6 lg:col-span-2'>
				<Card className='bg-surface overflow-hidden'>
					<div className='p-4 md:p-6'>
						<div className='flex items-center justify-between gap-3'>
							<div className='flex items-center gap-3'>
								<div className='rounded-base bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black dark:border-white'>
									<Thermometer className='h-5 w-5' />
								</div>
								<div>
									<span className='text-primary block text-xs font-medium tracking-widest uppercase'>
										Climatização
									</span>
									<h3 className='text-lg font-semibold'>Ar-condicionado</h3>
								</div>
							</div>
							<Switch
								checked={devices.airConditioner}
								onCheckedChange={() => toggleDevice('airConditioner')}
							/>
						</div>

						<div className='flex justify-center py-6 md:py-8'>
							<div className='relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60'>
								<div className='border-base-300 absolute inset-0 rounded-full border-4' />
								<div
									className='border-t-primary absolute inset-0 rounded-full border-4 border-transparent'
									style={{
										transform: `rotate(${(temperature - 10) * 9}deg)`,
										transition: 'transform 0.3s ease-out',
									}}
								/>
								<div className='bg-base-100 absolute inset-4 flex flex-col items-center justify-center rounded-full border-2 border-black dark:border-white'>
									<p className='text-5xl font-bold tracking-tight md:text-6xl'>
										{tempHydrated ? temperature : '--'}
									</p>
									<p className='text-muted-foreground mt-1 text-xs tracking-widest uppercase'>
										Temperatura
									</p>
									<p className='text-primary mt-2 text-xs font-medium'>
										{devices.airConditioner ? 'Ligado' : 'Desligado'}
									</p>
								</div>
								<div className='absolute top-1/2 left-0 -translate-x-3 -translate-y-1/2'>
									<Button
										variant='outline'
										size='icon'
										aria-label='Diminuir temperatura'
										className='bg-base-100 h-9 w-9 rounded-full border-black dark:border-white'
										onClick={() => setTemperature(Math.max(10, temperature - 1))}
									>
										<Minus className='h-4 w-4' />
									</Button>
								</div>
								<div className='absolute top-1/2 right-0 translate-x-3 -translate-y-1/2'>
									<Button
										variant='outline'
										size='icon'
										aria-label='Aumentar temperatura'
										className='bg-base-100 h-9 w-9 rounded-full border-black dark:border-white'
										onClick={() => setTemperature(Math.min(30, temperature + 1))}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
					{METRICS.map(({ icon: Icon, label, value }) => (
						<Card key={label} className='bg-surface p-4'>
							<div className='flex flex-col items-center gap-2 text-center'>
								<div className='rounded-base bg-primary/10 text-primary flex h-9 w-9 items-center justify-center border-2 border-black dark:border-white'>
									<Icon className='h-4 w-4' />
								</div>
								<h3 className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
									{label}
								</h3>
								<p className='text-xl font-bold tracking-tight'>{value}</p>
							</div>
						</Card>
					))}
				</div>
			</div>

			<div className='grid content-start gap-4 md:gap-6'>
				<Card className='bg-surface overflow-hidden'>
					<div className='p-4'>
						<div className='mb-3 flex items-center justify-between'>
							<h3 className='text-sm font-semibold'>Câmera</h3>
							<div className='flex items-center gap-2'>
								<div className='bg-primary h-2.5 w-2.5 rounded-full' />
								<span className='text-muted-foreground text-xs'>Sala de estar</span>
							</div>
						</div>
						<div className='rounded-base relative overflow-hidden border-2 border-black dark:border-white'>
							<Image
								src='/icons/placeholder.svg'
								alt='Visão da câmera da sala'
								width={300}
								height={200}
								className='h-44 w-full object-cover'
							/>
							<div className='bg-primary text-primary-content absolute top-2 left-2 rounded-full border-2 border-black px-2 py-0.5 text-xs font-medium dark:border-white'>
								Ao vivo
							</div>
						</div>
					</div>
				</Card>

				<Card className='bg-surface p-4'>
					<div className='mb-3 flex items-center justify-between'>
						<div className='flex items-center gap-1'>
							<Sun className='text-primary h-7 w-7' />
							<Cloud className='text-muted-foreground h-5 w-5' />
						</div>
						<div className='text-right'>
							<p className='text-primary text-xs font-medium tracking-widest uppercase'>
								Porto Velho
							</p>
							<div className='flex items-end justify-end'>
								<span className='text-4xl font-bold tracking-tight'>28</span>
								<span className='mb-1 text-lg'>°C</span>
							</div>
							<p className='text-muted-foreground text-xs'>Parcialmente nublado</p>
						</div>
					</div>
				</Card>

				<Card className='bg-surface p-4'>
					<div className='mb-4 flex items-center justify-between'>
						<h3 className='text-lg font-semibold'>Dispositivos</h3>
						<span className='text-muted-foreground text-xs'>
							{devicesHydrated ? `${activeDevices} ativo(s)` : '--'}
						</span>
					</div>
					<div className='grid grid-cols-2 gap-3'>
						{(Object.keys(DEVICE_LABELS) as (keyof Devices)[]).map((key) => {
							const on = devices[key];
							const Icon = DEVICE_ICONS[key];

							return (
								<div
									key={key}
									className={`rounded-base flex flex-col gap-2 border-2 border-black p-3 transition-colors dark:border-white ${
										on ? 'bg-primary/10' : 'bg-base-100'
									}`}
								>
									<div className='flex items-center gap-2'>
										<div
											className={`rounded-base flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black dark:border-white ${
												on ? 'bg-primary text-primary-content' : 'bg-base-200 text-foreground'
											}`}
										>
											<Icon className='h-4 w-4' />
										</div>
										<span className='truncate text-xs'>{DEVICE_LABELS[key]}</span>
									</div>
									<Switch checked={on} onCheckedChange={() => toggleDevice(key)} />
								</div>
							);
						})}
					</div>
				</Card>
			</div>
		</div>
	);
}
