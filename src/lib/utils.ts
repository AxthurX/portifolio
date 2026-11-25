import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import unidecode from 'unidecode';
import { toast } from '@/components/ui/use-toast';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const extractNumbers = (value: string): number => {
	const match = value.match(/-?\d+(?:[.,]\d+)?/);
	return match ? Number.parseFloat(match[0].replace(',', '.')) : Number.NaN;
};

export const formatDescription = (description: string): string =>
	description ? description.trimStart().replace(/\n/g, '<br />') : '';

export function Alert(
	title: string,
	description: string,
	variant: 'default' | 'destructive' | 'warning',
) {
	toast({
		title,
		description,
		variant,
	});
}

export function clearFileName(name: string) {
	return unidecode(name).replaceAll(' ', '-').replace(/-+/gm, '-');
}

export function formatFileName(sector: string, filename: string) {
	return `/admin/ext-files/${sector || 'sedam'}/${format(new Date(), 'yyyy/MM')}/${clearFileName(filename)}`;
}
