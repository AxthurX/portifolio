'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ReadingMask() {
	const [position, setPosition] = useState({ y: 0 });

	const handleMouseMove = useCallback((e: MouseEvent) => {
		setPosition({ y: e.clientY });
	}, []);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	const mask_height = 100;

	return (
		<div className='pointer-events-none fixed inset-0 z-50'>
			<div
				className='absolute inset-x-0 top-0 bg-black/70'
				style={{ height: Math.max(0, position.y - mask_height / 2) }}
			/>

			<div
				className='border-t-primary/80 border-b-primary absolute inset-x-0 border-y-8'
				style={{
					top: position.y - mask_height / 2,
					height: mask_height,
				}}
			/>

			<div
				className='absolute inset-x-0 bottom-0 bg-black/70'
				style={{
					height: Math.max(0, window.innerHeight - (position.y + mask_height / 2)),
				}}
			/>
		</div>
	);
}
