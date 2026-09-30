'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, {
	type CSSProperties,
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

interface ProgressSliderContextType {
	active: string;
	progress: number;
	handleButtonClick: (value: string) => void;
	vertical: boolean;
}

const ProgressSliderContext = createContext<ProgressSliderContextType | null>(null);

export function useProgressSliderContext() {
	const context = useContext(ProgressSliderContext);

	if (!context) {
		throw new Error('Must be used within a ProgressSlider');
	}

	return context;
}

type ProgressSliderProps = {
	children: ReactNode;
	duration?: number;
	fastDuration?: number;
	vertical?: boolean;
	activeSlider: string;
	className?: string;
};

export const ProgressSlider = ({
	children,
	duration = 5000,
	fastDuration = 400,
	vertical = false,
	activeSlider,
	className = '',
}: ProgressSliderProps) => {
	const [active, setActive] = useState(activeSlider);
	const [progress, setProgress] = useState(0);
	const [isFastForward, setIsFastForward] = useState(false);

	const frame = useRef(0);
	const firstFrameTime = useRef(performance.now());
	const targetValue = useRef<string | null>(null);
	const progressRef = useRef(0);

	const [sliderValues, setSliderValues] = useState<string[]>([]);

	const animate = useCallback(
		(now: number) => {
			const current_duration = isFastForward ? fastDuration : duration;

			const elapsed_time = now - firstFrameTime.current;

			const time_fraction = elapsed_time / current_duration;

			if (time_fraction <= 1) {
				const newProgress = isFastForward
					? progressRef.current + (100 - progressRef.current) * time_fraction
					: time_fraction * 100;

				progressRef.current = newProgress;

				setProgress(newProgress);

				frame.current = requestAnimationFrame(animate);

				return;
			}

			if (isFastForward) {
				setIsFastForward(false);

				if (targetValue.current !== null) {
					setActive(targetValue.current);

					targetValue.current = null;
				}
			} else {
				const current_index = sliderValues.indexOf(active);

				const next_index = (current_index + 1) % sliderValues.length;

				setActive(sliderValues[next_index]);
			}

			progressRef.current = 0;

			setProgress(0);

			firstFrameTime.current = performance.now();
		},
		[active, duration, fastDuration, isFastForward, sliderValues],
	);

	useEffect(() => {
		const content_child = React.Children.toArray(children).find(
			(child): child is React.ReactElement<{ children: React.ReactNode }> =>
				React.isValidElement(child) && child.type === SliderContent,
		);

		if (!content_child) return;

		const values = React.Children.toArray(content_child.props.children)
			.filter((child): child is React.ReactElement<{ value: string }> =>
				React.isValidElement(child),
			)
			.map((child) => child.props.value);

		setSliderValues(values);
	}, [children]);

	useEffect(() => {
		if (!sliderValues.length) return;

		firstFrameTime.current = performance.now();

		frame.current = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(frame.current);
	}, [animate, sliderValues]);

	const handleButtonClick = (value: string) => {
		if (value === active) return;

		const elapsed_time = performance.now() - firstFrameTime.current;

		progressRef.current = (elapsed_time / duration) * 100;

		if (value) targetValue.current = value;

		setIsFastForward(true);

		firstFrameTime.current = performance.now();
	};

	return (
		<ProgressSliderContext.Provider
			value={{
				active,
				progress,
				handleButtonClick,
				vertical,
			}}
		>
			<div className={`relative ${className}`}>{children}</div>
		</ProgressSliderContext.Provider>
	);
};

interface SliderContentProps {
	children: ReactNode;
	className?: string;
}

export function SliderContent({ children, className = '' }: SliderContentProps) {
	return <div className={className}>{children}</div>;
}

interface SliderWrapperProps {
	children: ReactNode;
	value: string;
	className?: string;
}

export function SliderWrapper({ children, value, className = '' }: SliderWrapperProps) {
	const { active } = useProgressSliderContext();

	return (
		<AnimatePresence mode='popLayout'>
			{active === value && (
				<motion.div
					key={value}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className={className}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

interface SliderBtnGroupProps {
	children: ReactNode;
	className?: string;
}

export function SliderBtnGroup({ children, className = '' }: SliderBtnGroupProps) {
	return <div className={className}>{children}</div>;
}

interface SliderBtnProps {
	children: ReactNode;
	value: string;
	className?: string;
	progressBarClass?: string;
	progressStyle?: CSSProperties;
}

export function SliderBtn({
	children,
	value,
	className = '',
	progressBarClass = '',
	progressStyle = {},
}: SliderBtnProps) {
	const { active, progress, handleButtonClick, vertical } = useProgressSliderContext();

	return (
		<button
			type='button'
			style={{ isolation: 'isolate' }}
			onClick={() => handleButtonClick(value)}
			className={`relative overflow-hidden rounded-base border-2 border-border bg-secondary-background transition-all ${
				active === value ? 'opacity-100' : 'opacity-60 hover:opacity-85'
			} transition-opacity ${className}`}
		>
			<div className='relative z-10'>{children}</div>

			<div
				className='pointer-events-none absolute inset-0 z-20'
				role='progressbar'
				aria-valuenow={active === value ? progress : 0}
				aria-valuemin={0}
				aria-valuemax={100}
			>
				<div
					className={`h-full w-full border-border border-r-2 bg-main transition-none${progressBarClass}
			`}
					style={{
						transform: vertical
							? `translateY(${100 - (active === value ? progress : 0)}%)`
							: `translateX(-${100 - (active === value ? progress : 0)}%)`,
						...progressStyle,
					}}
				/>
			</div>
		</button>
	);
}
