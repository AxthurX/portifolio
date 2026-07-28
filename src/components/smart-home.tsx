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
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Switch } from '@/src/components/ui/switch';

export function SmartHome() {
	const [temperature, setTemperature] = useState(22);
	const [devices, setDevices] = useState({
		light: true,
		airConditioner: true,
		tv: false,
		router: true,
		speaker: true,
		cctv: true,
		humidifier: false,
	});

	const toggleDevice = (device: keyof typeof devices) => {
		setDevices({
			...devices,
			[device]: !devices[device],
		});
	};

	return (
		<div className='grid gap-4 md:grid-cols-3'>
			<div className='grid gap-4 md:col-span-2'>
				<Card className='overflow-hidden bg-white/10 text-white backdrop-blur-md'>
					<div className='p-6'>
						<div className='mb-6 flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div className='flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20'>
									<Thermometer className='h-5 w-5 text-lime-400' />
								</div>
								<div>
									<h3 className='font-medium text-lg'>Air Conditioning</h3>
								</div>
							</div>
							<Switch
								checked={devices.airConditioner}
								onCheckedChange={() => toggleDevice('airConditioner')}
								className='data-[state=checked]:bg-lime-400'
							/>
						</div>

						<div className='mb-8 flex items-center justify-center'>
							<div className='relative flex h-60 w-60 items-center justify-center'>
								<div className='absolute inset-0 rounded-full border-4 border-gray-700/30' />
								<div
									className='absolute inset-0 rounded-full border-4 border-transparent border-t-lime-400'
									style={{
										transform: `rotate(${(temperature - 10) * 9}deg)`,
										transition: 'transform 0.3s ease-out',
									}}
								/>
								<div className='absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white/5 backdrop-blur-sm'>
									<p className='font-light text-6xl'>{temperature}</p>
									<p className='text-gray-300 text-xs'>Temperature</p>
									<div className='mt-2'>
										<div className='h-5 w-5 text-lime-400'>
											{devices.airConditioner ? (
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 24 24'
													fill='currentColor'
												>
													<title>air conditioner</title>
													<path d='M12 1c0 2.761-2.239 5-5 5S2 3.761 2 1h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z' />
													<path d='M17 5c0 2.761-2.239 5-5 5S7 7.761 7 5h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z' />
													<path d='M22 9c0 2.761-2.239 5-5 5s-5-2.239-5-5h10zm-5 9c-2.761 0-5-2.239-5-5h10c0 2.761-2.239 5-5 5z' />
												</svg>
											) : null}
										</div>
									</div>
								</div>
								<div className='absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2'>
									<Button
										variant='outline'
										size='icon'
										className='h-8 w-8 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md'
										onClick={() => setTemperature(Math.max(10, temperature - 1))}
									>
										<Minus className='h-4 w-4' />
									</Button>
								</div>
								<div className='absolute top-1/2 right-0 translate-x-4 -translate-y-1/2'>
									<Button
										variant='outline'
										size='icon'
										className='h-8 w-8 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md'
										onClick={() => setTemperature(Math.min(30, temperature + 1))}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
								<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4'>
									<span className='text-gray-400 text-xs'>10°</span>
								</div>
								<div className='absolute top-1/4 right-0 translate-x-4 -translate-y-2'>
									<span className='text-gray-400 text-xs'>20°</span>
								</div>
								<div className='absolute right-1/4 bottom-0 translate-y-4'>
									<span className='text-gray-400 text-xs'>30°</span>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
						<div className='flex flex-col items-center gap-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20'>
								<LightbulbIcon className='h-5 w-5 text-lime-400' />
							</div>
							<h3 className='font-medium text-sm'>Current Consumption</h3>
							<p className='font-bold text-2xl'>1.1 KW</p>
						</div>
					</Card>

					<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
						<div className='flex flex-col items-center gap-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20'>
								<Droplets className='h-5 w-5 text-lime-400' />
							</div>
							<h3 className='font-medium text-sm'>Humidity</h3>
							<p className='font-bold text-2xl'>50.2%</p>
						</div>
					</Card>

					<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
						<div className='flex flex-col items-center gap-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20'>
								<Thermometer className='h-5 w-5 text-lime-400' />
							</div>
							<h3 className='font-medium text-sm'>Temperature</h3>
							<p className='font-bold text-2xl'>16 °C</p>
						</div>
					</Card>

					<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
						<div className='flex flex-col items-center gap-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20'>
								<LightbulbIcon className='h-5 w-5 text-lime-400' />
							</div>
							<h3 className='font-medium text-sm'>Energy Usage</h3>
							<p className='font-bold text-2xl'>2.2 K</p>
						</div>
					</Card>
				</div>
			</div>

			<div className='grid content-start gap-4'>
				<Card className='overflow-hidden bg-white/10 text-white backdrop-blur-md'>
					<div className='p-4'>
						<div className='mb-2 flex items-center justify-between'>
							<h3 className='font-medium text-sm'>Camera</h3>
							<div className='flex items-center'>
								<div className='mr-2 h-3 w-3 rounded-full bg-lime-400' />
								<span className='text-xs'>Drawing Room</span>
							</div>
						</div>
						<div className='relative overflow-hidden rounded-lg'>
							<Image
								src='/placeholder.svg?height=200&width=300'
								alt='Room camera view'
								width={300}
								height={200}
								className='h-48 w-full rounded-lg object-cover'
							/>
							<div className='absolute top-2 left-2 rounded-full bg-red-500/80 px-2 py-0.5 text-white text-xs backdrop-blur-sm'>
								Live
							</div>
						</div>
					</div>
				</Card>

				<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
					<div className='mb-4 flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='text-yellow-400'>
								<Sun className='h-8 w-8' />
							</div>
							<div className='text-cyan-400'>
								<Cloud className='h-6 w-6' />
							</div>
						</div>
						<div className='text-right'>
							<p className='text-gray-300 text-xs'>Indonesia</p>
							<div className='flex items-end'>
								<span className='font-light text-5xl'>28</span>
								<span className='text-xl'>°C</span>
							</div>
							<p className='text-gray-300 text-xs'>Sunny with cold</p>
						</div>
					</div>
				</Card>

				<Card className='bg-white/10 p-4 text-white backdrop-blur-md'>
					<h3 className='mb-4 font-medium text-lg'>Devices</h3>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-2'>
							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.light ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.light ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<LightbulbIcon
											className={`h-4 w-4 ${devices.light ? 'text-black' : 'text-white'}`}
										/>
									</div>
									<span className='text-xs'>Light</span>
								</div>
								<Switch
									checked={devices.light}
									onCheckedChange={() => toggleDevice('light')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>

							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.tv ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.tv ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<Tv className={`h-4 w-4 ${devices.tv ? 'text-black' : 'text-white'}`} />
									</div>
									<span className='text-xs'>Smart TV</span>
								</div>
								<Switch
									checked={devices.tv}
									onCheckedChange={() => toggleDevice('tv')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>

							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.humidifier ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.humidifier ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<Droplets
											className={`h-4 w-4 ${devices.humidifier ? 'text-black' : 'text-white'}`}
										/>
									</div>
									<span className='text-xs'>Humidifier</span>
								</div>
								<Switch
									checked={devices.humidifier}
									onCheckedChange={() => toggleDevice('humidifier')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.router ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.router ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<Wifi className={`h-4 w-4 ${devices.router ? 'text-black' : 'text-white'}`} />
									</div>
									<span className='text-xs'>Router</span>
								</div>
								<Switch
									checked={devices.router}
									onCheckedChange={() => toggleDevice('router')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>

							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.speaker ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.speaker ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<Speaker
											className={`h-4 w-4 ${devices.speaker ? 'text-black' : 'text-white'}`}
										/>
									</div>
									<span className='text-xs'>Speaker</span>
								</div>
								<Switch
									checked={devices.speaker}
									onCheckedChange={() => toggleDevice('speaker')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>

							<div
								className={`flex items-center justify-between rounded-lg p-3 ${devices.cctv ? 'bg-lime-400/20' : 'bg-white/5'}`}
							>
								<div className='flex items-center gap-2'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${devices.cctv ? 'bg-lime-400' : 'bg-white/10'}`}
									>
										<Camera className={`h-4 w-4 ${devices.cctv ? 'text-black' : 'text-white'}`} />
									</div>
									<span className='text-xs'>CCTV</span>
								</div>
								<Switch
									checked={devices.cctv}
									onCheckedChange={() => toggleDevice('cctv')}
									className='data-[state=checked]:bg-lime-400'
								/>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
