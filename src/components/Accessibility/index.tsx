'use client';

import { Settings, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow, BiSync } from 'react-icons/bi';
import { IoAccessibility } from 'react-icons/io5';
import { useIsMobile } from '@/lib/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ScrollArea } from '../ui/scroll-area';
import { useAccessibility } from './components/accessibility-context';
import { CardToggle } from './components/CardToggle';
import {
	AccessibilityItems,
	AccessibilityItemsToggle,
	AccessibilityProfile,
	type Key,
} from './components/items';
import { PageStructure } from './components/PageStructure';
import ReadingGuide from './components/ReadingGuide';
import ReadingMask from './components/ReadingMask';

export function Accessibility() {
	const is_mobile = useIsMobile();

	const { profile, applyProfile } = useAccessibility();
	const { settings, updateSetting, resetSettings, isMenuOpen, toggleMenu } = useAccessibility();

	const accessibility_items = AccessibilityItems();
	const accessibility_profile = AccessibilityProfile();
	const accessibility_toggle = AccessibilityItemsToggle();

	const pathname = usePathname();

	const position = settings.position || 'right';

	const reading_mode = useMemo(() => {
		const paths = [
			'/post/',
			'/institucional/',
			'/gabinete',
			'/contato',
			'/lgpd',
			'/ajuda',
			'/institucional',
			'/faq',
		];
		return paths.some((path) => pathname.includes(path));
	}, [pathname]);

	const handleToggle = useCallback(
		(key: Key, value: string) => {
			updateSetting(key, value);
		},
		[updateSetting],
	);

	const handleProfileChange = useCallback(
		(key: string) => {
			applyProfile(key, accessibility_profile);
		},
		[accessibility_profile, applyProfile],
	);

	const handleMenuToggle = useCallback(
		(open: boolean) => {
			toggleMenu(open);

			if (open) {
				const data_theme = document.documentElement.getAttribute('data-theme');
				handleToggle('contrast', data_theme || 'sedam');
			}
		},
		[toggleMenu, handleToggle],
	);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'u') {
				event.preventDefault();
				handleMenuToggle(!isMenuOpen);
			}
		},
		[isMenuOpen, handleMenuToggle],
	);

	useEffect(() => {
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [onKeyDown]);

	return (
		<>
			<Button
				size='icon'
				onClick={() => handleMenuToggle(!isMenuOpen)}
				className='bg-primary text-primary-content hover:bg-primary/90 fixed z-40 size-10 cursor-pointer shadow-lg transition-colors'
				style={{
					top: '53%',
					[position]: '.6rem',
				}}
			>
				<IoAccessibility className='size-6' />
			</Button>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{
							opacity: 0,
							x: position === 'right' ? (is_mobile ? '100%' : 80) : is_mobile ? '-100%' : -100,
						}}
						animate={{ opacity: 1, x: 0 }}
						exit={{
							opacity: 0,
							x: position === 'right' ? (is_mobile ? '100%' : 100) : is_mobile ? '-100%' : -100,
						}}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
						}}
						className={`fixed z-50 ${is_mobile ? 'inset-0' : 'top-1/2 -translate-y-1/2'}`}
						style={{
							[position]: is_mobile ? '' : '4rem',
						}}
					>
						<Card
							className={`border-accent bg-base-100/90 rounded-xl font-sans font-medium tracking-normal! ${is_mobile ? 'fixed inset-0 min-h-max' : 'max-w-xl'}`}
							style={{ wordSpacing: '0em' }}
						>
							<CardHeader className='from-primary/85 to-primary sticky z-10 w-full rounded-xl bg-linear-to-br leading-none!'>
								<div className='text-secondary-content flex items-center justify-between'>
									<CardTitle className='text-base leading-none!'>
										Menu Acessibilidade
										<span className='pl-2 text-xs leading-none!'>(CTRL + U)</span>
									</CardTitle>
									<X className='size-5 cursor-pointer' onClick={() => handleMenuToggle(false)} />
								</div>
							</CardHeader>
							<ScrollArea className='h-[calc(100vh-85px)] max-h-210 rounded-b-xl max-md:h-[calc(100vh+10px)]'>
								<CardContent className='border-accent bg-base-100/80 grid gap-3 px-5'>
									<Accordion
										className='bg-base-300/50 mt-4 w-full rounded-xl px-4'
										type='single'
										collapsible
									>
										<AccordionItem value='1' className='border-none'>
											<AccordionTrigger
												className='bg-background cursor-pointer! items-center justify-start gap-2 outline-none'
												chevron
											>
												<div className='flex items-center gap-2'>
													<IoAccessibility className='bg-primary text-primary-content size-8 rounded-xl p-2' />
													<span className='text-base-content cursor-pointer text-base! font-semibold'>
														Perfis de acessibilidade
													</span>
												</div>
											</AccordionTrigger>
											<AccordionContent className='grid grid-cols-2 gap-2 pb-4 max-sm:grid-cols-1'>
												{accessibility_profile
													.filter(
														(item) =>
															!(is_mobile && (item.key === 'adhd' || item.key === 'low-vision')),
													)
													.map((item) => (
														<Card
															key={item.label}
															className={`border-accent bg-base-100/60 hover:bg-base-200/30 min-h-11 cursor-pointer shadow transition duration-150 ease-out select-none ${profile === item.key && 'bg-base-300/80'}`}
															onClick={() => handleProfileChange(item.key)}
														>
															<CardContent className='flex items-center gap-2 px-2 py-2.5'>
																{item.icon && (
																	<div className='bg-primary flex size-8 items-center justify-center rounded-lg'>
																		<item.icon className='text-secondary-content size-5' />
																	</div>
																)}

																<span className='text-base-content text-start! text-sm leading-none! font-medium'>
																	{item.label}
																</span>
															</CardContent>
														</Card>
													))}
											</AccordionContent>
										</AccordionItem>
									</Accordion>
									<hr className='border-accent my-2 w-full bg-black' />
									<div className='grid grid-cols-3 gap-2 rounded-lg max-md:grid-cols-2'>
										{accessibility_items
											.filter((item) => !(is_mobile && item.key === 'cursor'))
											.map((item) => (
												<Card
													className={`border-primary/90 bg-primary/65 text-primary-content hover:bg-primary/60 cursor-pointer shadow-sm transition duration-150 ease-out select-none ${settings[item.key as Key] === item.option && 'bg-primary/90'}`}
													key={item.label}
													onClick={() => handleToggle(item.key as Key, item.option)}
												>
													<CardContent className='flex w-full items-center gap-2 p-2.5'>
														{item.icon && <item.icon className='text-secondary-content size-6' />}
														<span className='text-center! text-xs leading-none! font-semibold'>
															{item.label}
														</span>
													</CardContent>
												</Card>
											))}
									</div>
									<hr className='border-accent my-2 w-full bg-black' />
									<div className='grid grid-cols-3 gap-2 max-sm:grid-cols-2'>
										{accessibility_toggle
											.filter((item) => !(is_mobile && item.key === 'cursor'))
											.map(({ key, labels, icons, options }) => {
												return (
													<CardToggle
														key={key}
														type={key}
														options={options}
														value={settings[key]}
														onChange={(value) => handleToggle(key, value)}
														labels={labels}
														icons={icons}
														disabled={
															(key === 'reading-mode' && !reading_mode) || key === 'site-map'
														}
													/>
												);
											})}
									</div>
									<hr className='my-2 w-full' />
									<Button
										className='bg-primary/90 text-primary-content flex cursor-pointer items-center gap-2'
										onClick={resetSettings}
									>
										<BiSync className='size-6' />
										{is_mobile
											? 'Redefinir configurações'
											: 'Redefinir todas as configurações de acessibilidade'}
									</Button>
									<Accordion
										className='bg-base-300/50 mt-4 w-full rounded-xl px-4'
										type='single'
										collapsible
									>
										<AccordionItem className='border-b-0' value='position'>
											<AccordionTrigger
												className='bg-background cursor-pointer items-center justify-start gap-2 outline-none'
												chevron
											>
												<div className='flex items-center gap-2'>
													<Settings className='bg-primary text-secondary-content size-8 rounded-xl p-2' />
													<span className='text-base-content font-medium'>
														Mover menu de acessibilidade
													</span>
												</div>
											</AccordionTrigger>
											<AccordionContent className='rounded-xl border-b-0'>
												<RadioGroup
													value={position}
													onValueChange={(val) => {
														updateSetting('position', val);
													}}
													className='grid gap-2 pb-4'
												>
													<Card className='border-base-300/40 bg-base-100/60 hover:bg-base-300/50 min-h-11 cursor-pointer shadow transition duration-150 ease-out select-none'>
														<CardContent className='flex items-center justify-between gap-2 px-2 py-2.5'>
															<label
																htmlFor='pos-left'
																className='flex w-full cursor-pointer items-center justify-between'
															>
																<div className='flex items-center gap-2'>
																	<div className='bg-primary flex size-8 items-center justify-center rounded-lg'>
																		<BiSolidLeftArrow className='text-secondary-content size-5' />
																	</div>
																	<span className='text-base-content text-start! text-sm leading-none! font-medium'>
																		Esquerda
																	</span>
																</div>

																<RadioGroupItem
																	value='left'
																	id='pos-left'
																	className='border-primary mr-2'
																/>
															</label>
														</CardContent>
													</Card>

													<Card className='border-base-300/30 bg-base-100/60 hover:bg-base-300/50 min-h-11 cursor-pointer shadow transition duration-150 ease-out select-none'>
														<CardContent className='flex items-center justify-between gap-2 px-2 py-2.5'>
															<label
																htmlFor='pos-right'
																className='flex w-full cursor-pointer items-center justify-between'
															>
																<div className='flex items-center gap-2'>
																	<div className='bg-primary flex size-8 items-center justify-center rounded-lg'>
																		<BiSolidRightArrow className='text-secondary-content size-5' />
																	</div>
																	<span className='text-base-content text-start! text-sm leading-none! font-medium'>
																		Direita
																	</span>
																</div>

																<RadioGroupItem
																	value='right'
																	id='pos-right'
																	className='border-primary mr-2'
																/>
															</label>
														</CardContent>
													</Card>
												</RadioGroup>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</CardContent>
							</ScrollArea>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>

			{settings.cursor === 'reading-mask' && <ReadingMask />}
			{settings.cursor === 'reading-guide' && <ReadingGuide />}
			{settings['page-structure'] === 'enable' && <PageStructure />}
		</>
	);
}
