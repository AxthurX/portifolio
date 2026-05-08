import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import Analytics from '../components/Analytics';
import { ThemeProvider } from '../components/ThemeProvider';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	weight: ['300', '400', '500', '600', '700', '800'],
	display: 'swap',
});

const playfair = Playfair_Display({
	subsets: ['latin'],
	style: ['italic', 'normal'],
	variable: '--font-playfair',
	weight: ['400', '500', '600'],
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://arthurmartins.dev'),
	title: {
		default: 'Arthur Martins | Desenvolvedor Fullstack',
		template: '%s | Arthur Martins',
	},
	description:
		'Portfolio pessoal de Arthur Martins, desenvolvedor fullstack especializado em React, Next.js, Node.js, TypeScript e experiencias web modernas.',
	keywords: [
		'Arthur Martins',
		'arthurmartins.dev',
		'desenvolvedor fullstack',
		'frontend developer',
		'backend developer',
		'Next.js',
		'React',
		'TypeScript',
		'Node.js',
		'Tailwind CSS',
		'UX/UI',
		'Portfolio',
		'Porto Velho',
		'Brasil',
	],
	authors: [
		{
			name: 'Arthur Martins',
			url: 'https://arthurmartins.dev',
		},
	],
	creator: 'Arthur Martins',
	publisher: 'Arthur Martins',
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: 'https://arthurmartins.dev',
		siteName: 'Arthur Martins',
		title: 'Arthur Martins | Desenvolvedor Fullstack',
		description:
			'Desenvolvedor fullstack focado em interfaces modernas, performance, arquitetura escalavel e experiencias digitais imersivas.',

		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Arthur Martins - Desenvolvedor Fullstack',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: 'https://arthurmartins.dev',
	},
	category: 'technology',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html
			lang='pt-BR'
			className={`${inter.variable} ${playfair.variable} bg-background`}
			suppressHydrationWarning
			data-theme='arthur'
		>
			<head>
				<link rel='icon' href='/logo-simbolo.png' type='image/png' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=5'
				/>
				<meta name='theme-color' content='#0a0a0b' />
				<meta property='og:url' content='https://arthurmartins.dev' />
			</head>

			<body className='min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased'>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem={false}
					disableTransitionOnChange={false}
				>
					{children}
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
