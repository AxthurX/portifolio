import {
	Atom,
	BatteryCharging,
	Bot,
	Boxes,
	Braces,
	Cloud,
	Code,
	Component,
	Container,
	Database,
	Flame,
	FlaskConical,
	GitBranch,
	GitFork,
	Hexagon,
	type LucideIcon,
	Orbit,
	Package,
	Send,
	Server,
	Smartphone,
	Table,
	TestTube,
	Triangle,
	Wind,
	Workflow,
	Zap,
} from 'lucide-react';

export type TechCategory = 'Frontend' | 'Backend' | 'Dados' | 'Mobile' | 'Qualidade' | 'Infra';

export type TechLevel = 'especialidade' | 'profissional' | 'pratica';

export interface Tech {
	name: string;
	category: TechCategory;
	icon: LucideIcon;
	level: TechLevel;
	description: string;
}

export interface Tool {
	name: string;
	icon: LucideIcon;
}

export const TECH_LEVELS: Record<TechLevel, { label: string; short: string; steps: number }> = {
	especialidade: { label: 'Especialidade', short: 'Especialidade', steps: 3 },
	profissional: { label: 'Experiência profissional', short: 'Profissional', steps: 2 },
	pratica: { label: 'Experiência prática', short: 'Prática', steps: 1 },
};

export const CATEGORY_COLOR: Record<TechCategory, string> = {
	Frontend: 'hsl(205 90% 52%)',
	Backend: 'hsl(158 52% 36%)',
	Dados: 'hsl(272 45% 52%)',
	Mobile: 'hsl(16 78% 50%)',
	Qualidade: 'hsl(38 88% 46%)',
	Infra: 'hsl(215 32% 44%)',
};

export const TECHS: Tech[] = [
	{
		name: 'React',
		category: 'Frontend',
		icon: Atom,
		level: 'especialidade',
		description: 'Componentes, hooks, estado e renderização sob demanda.',
	},
	{
		name: 'Next.js',
		category: 'Frontend',
		icon: Zap,
		level: 'especialidade',
		description: 'App Router, Server Components, streaming e deploy na Vercel.',
	},
	{
		name: 'TypeScript',
		category: 'Frontend',
		icon: Braces,
		level: 'especialidade',
		description: 'Tipagem estrita, generics e refatoração segura em escala.',
	},
	{
		name: 'Tailwind CSS',
		category: 'Frontend',
		icon: Wind,
		level: 'especialidade',
		description: 'Design system utilitário, tokens e consistência visual.',
	},
	{
		name: 'Angular',
		category: 'Frontend',
		icon: Component,
		level: 'profissional',
		description: 'Componentes, RxJS, formulários reativos e arquitetura modular.',
	},
	{
		name: 'Node.js',
		category: 'Backend',
		icon: Hexagon,
		level: 'profissional',
		description: 'APIs REST, streams, jobs e integrações com serviços.',
	},
	{
		name: 'Fastify',
		category: 'Backend',
		icon: Server,
		level: 'profissional',
		description: 'Serviços rápidos, plugins, hooks e serialização enxuta.',
	},
	{
		name: 'C# / .NET',
		category: 'Backend',
		icon: Boxes,
		level: 'profissional',
		description: 'APIs, sistemas corporativos, WinForms e serviços Windows.',
	},
	{
		name: 'Firebase',
		category: 'Backend',
		icon: Flame,
		level: 'profissional',
		description: 'Firestore, autenticação e storage em tempo real.',
	},
	{
		name: 'PostgreSQL',
		category: 'Dados',
		icon: Database,
		level: 'profissional',
		description: 'Modelagem relacional, índices, views e performance de consulta.',
	},
	{
		name: 'Prisma',
		category: 'Dados',
		icon: Orbit,
		level: 'profissional',
		description: 'ORM tipado, migrations versionadas e seeds reproduzíveis.',
	},
	{
		name: 'SQL Server',
		category: 'Dados',
		icon: Table,
		level: 'profissional',
		description: 'Consultas avançadas, stored procedures e tuning de queries.',
	},
	{
		name: 'Ionic',
		category: 'Mobile',
		icon: Smartphone,
		level: 'profissional',
		description: 'Apps iOS e Android com uma única base de código web.',
	},
	{
		name: 'Capacitor',
		category: 'Mobile',
		icon: BatteryCharging,
		level: 'profissional',
		description: 'Bridge nativo, plugins de device e permissões do sistema.',
	},
	{
		name: 'Cordova',
		category: 'Mobile',
		icon: Package,
		level: 'profissional',
		description: 'Empacotamento de aplicações web em contêineres nativos.',
	},
	{
		name: 'Playwright',
		category: 'Qualidade',
		icon: Bot,
		level: 'profissional',
		description: 'E2E cross-browser, traces de falha e execução paralela.',
	},
	{
		name: 'Cypress',
		category: 'Qualidade',
		icon: FlaskConical,
		level: 'profissional',
		description: 'Testes de componente e integração com feedback em tempo real.',
	},
	{
		name: 'Jest',
		category: 'Qualidade',
		icon: TestTube,
		level: 'profissional',
		description: 'Testes unitários, mocks e cobertura de código.',
	},
	{
		name: 'Docker',
		category: 'Infra',
		icon: Container,
		level: 'profissional',
		description: 'Imagens multi-stage, Docker Compose e ambientes reprodutíveis.',
	},
	{
		name: 'AWS',
		category: 'Infra',
		icon: Cloud,
		level: 'pratica',
		description: 'EC2, S3, RDS, Lambda e infraestrutura como código.',
	},
	{
		name: 'Vercel',
		category: 'Infra',
		icon: Triangle,
		level: 'pratica',
		description: 'Preview por pull request, edge functions e analytics.',
	},
	{
		name: 'Argo CD',
		category: 'Infra',
		icon: Workflow,
		level: 'pratica',
		description: 'Entrega contínua GitOps e sincronização de clusters.',
	},
];

export const TOOLS: Tool[] = [
	{ name: 'Git', icon: GitBranch },
	{ name: 'GitLab', icon: GitFork },
	{ name: 'VS Code', icon: Code },
	{ name: 'Postman', icon: Send },
];

export const TECH_CATEGORIES: TechCategory[] = [
	'Frontend',
	'Backend',
	'Dados',
	'Mobile',
	'Qualidade',
	'Infra',
];

export const techsByCategory = (categoria: TechCategory) =>
	TECHS.filter((tech) => tech.category === categoria);
