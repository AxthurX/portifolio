import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Home Hub',
	description:
		'Painel pessoal para organizar tarefas, agenda, despesas, refeições e inventário da casa.',
	robots: {
		index: false,
		follow: false,
	},
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return children;
}
