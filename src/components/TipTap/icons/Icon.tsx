import type React from 'react';
import { icons } from './icons';

export interface IconComponentProps {
	name: keyof typeof icons;
	className?: string;
	onClick?: React.MouseEventHandler<SVGElement>;
}

function IconComponent({ name, className, onClick }: IconComponentProps) {
	const Icon = icons[name];

	return Icon ? (
		<Icon onClick={onClick} className={`h-4 w-4 ${className}`} />
	) : null;
}

export { IconComponent };
