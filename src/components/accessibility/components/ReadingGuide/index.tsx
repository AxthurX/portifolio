'use client';

import { useCallback, useEffect, useState } from 'react';

interface ReadingGuideProps {
	backgroundColor?: string;
	borderColor?: string;
	height?: number;
	width?: string;
}

export default function ReadingGuide({
	backgroundColor = '#576f41',
	borderColor = '#8ea972',
	height = 16,
	width = '40vw',
}: ReadingGuideProps) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		setPosition({ x: e.clientX, y: e.clientY });
		setIsVisible(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsVisible(false);
	}, []);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [handleMouseMove, handleMouseLeave]);

	if (!isVisible) return null;

	return (
		<div
			className='pointer-events-none fixed flex flex-col items-center'
			style={{
				left: position.x,
				top: position.y,
				width: width,
				zIndex: 9999,
				height: `${height + 13}px`,
				transform: 'translate(-50%, -100%)',
			}}
		>
			{/* Triângulo */}
			<div className='relative h-4.25 w-7.5'>
				<div
					className='absolute'
					style={{
						bottom: '-3px',
						borderLeft: '15px solid transparent',
						borderRight: '15px solid transparent',
						borderBottom: `15px solid ${backgroundColor}`,
					}}
				/>
				<div
					className='absolute -bottom-0.75 left-0.75'
					style={{
						borderLeft: '8px solid transparent',
						borderRight: '8px solid transparent',
					}}
				/>
			</div>

			{/* Barra horizontal */}
			<div
				className='w-full'
				style={{
					height: `${height}px`,
					backgroundColor: backgroundColor,
					border: `solid 3px ${borderColor}`,
					borderRadius: '4px',
				}}
			/>
		</div>
	);
}
