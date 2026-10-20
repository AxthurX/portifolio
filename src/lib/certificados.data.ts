/**
 * Dados dos certificados que viram pins no quadro.
 *
 * Arquivo gerado por `pnpm assets:pins` — não editar à mão.
 * As miniaturas em `public/pins` são WebP leves; o PNG original só é
 * baixado quando o visitante abre o certificado completo.
 */
export interface CertificadoPin {
	id: string;
	titulo: string;
	emissor: string;
	data: string;
	ano: number;
	nota: string;
	/** miniatura leve usada no quadro */
	imagem: string;
	/** conjunto responsivo da miniatura */
	imagemSrcSet: string;
	/** certificado original em PDF/PNG (abre em nova aba) */
	original: string;
}

export const CERTIFICADOS: CertificadoPin[] = [
	{
		id: 'coursera-accelerate-your-job-search-with-ai',
		titulo: 'Accelerate Your Job Search with AI',
		emissor: 'Coursera',
		data: '29 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "Accelerate Your Job Search with AI" pela Coursera, em 29 de agosto de 2025.',
		imagem: '/pins/coursera-accelerate-your-job-search-with-ai-320.webp',
		imagemSrcSet:
			'/pins/coursera-accelerate-your-job-search-with-ai-160.webp 160w, /pins/coursera-accelerate-your-job-search-with-ai-320.webp 320w',
		original: '/certificados/Coursera%20Accelerate%20Your%20Job%20Search%20with%20AI-1.png',
	},
	{
		id: 'alura-acessibilidade-web-tornando-seu-front-end-inclusivo',
		titulo: 'Acessibilidade web: tornando seu front-end inclusivo',
		emissor: 'Alura',
		data: '13 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Acessibilidade web: tornando seu front-end inclusivo" pela Alura, em 13 de junho de 2022.',
		imagem: '/pins/alura-acessibilidade-web-tornando-seu-front-end-inclusivo-320.webp',
		imagemSrcSet:
			'/pins/alura-acessibilidade-web-tornando-seu-front-end-inclusivo-160.webp 160w, /pins/alura-acessibilidade-web-tornando-seu-front-end-inclusivo-320.webp 320w',
		original:
			'/certificados/Curso%20Acessibilidade%20web%20parte%201_%20tornando%20seu%20front-end%20inclusivo%20-%20Alura-1.png',
	},
	{
		id: 'coursera-agile-project-management',
		titulo: 'Agile Project Management',
		emissor: 'Coursera',
		data: '29 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "Agile Project Management" pela Coursera, em 29 de agosto de 2025.',
		imagem: '/pins/coursera-agile-project-management-320.webp',
		imagemSrcSet:
			'/pins/coursera-agile-project-management-160.webp 160w, /pins/coursera-agile-project-management-320.webp 320w',
		original: '/certificados/Coursera%20Agile%20Project%20Management-1.png',
	},
	{
		id: 'alura-algoritmos-com-javascript-ii-ordenacao-e-busca',
		titulo: 'Algoritmos com JavaScript II: ordenação e busca',
		emissor: 'Alura',
		data: '4 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "Algoritmos com JavaScript II: ordenação e busca" pela Alura, em 4 de agosto de 2022.',
		imagem: '/pins/alura-algoritmos-com-javascript-ii-ordenacao-e-busca-320.webp',
		imagemSrcSet:
			'/pins/alura-algoritmos-com-javascript-ii-ordenacao-e-busca-160.webp 160w, /pins/alura-algoritmos-com-javascript-ii-ordenacao-e-busca-320.webp 320w',
		original:
			'/certificados/Curso%20Algoritmos%20com%20JavaScript%20II_%20aprofundando%20em%20algoritmos%20de%20ordena%C3%A7%C3%A3o%20e%20busca%20-%20Alura-1.png',
	},
	{
		id: 'alura-angular-boas-praticas-em-arquiteturas-e-formularios',
		titulo: 'Angular: boas práticas em arquiteturas e formulários',
		emissor: 'Alura',
		data: '25 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "Angular: boas práticas em arquiteturas e formulários" pela Alura, em 25 de novembro de 2022.',
		imagem: '/pins/alura-angular-boas-praticas-em-arquiteturas-e-formularios-320.webp',
		imagemSrcSet:
			'/pins/alura-angular-boas-praticas-em-arquiteturas-e-formularios-160.webp 160w, /pins/alura-angular-boas-praticas-em-arquiteturas-e-formularios-320.webp 320w',
		original:
			'/certificados/Curso%20Angular_%20boas%20pr%C3%A1ticas%20em%20arquiteturas%20e%20formul%C3%A1rios%20-%20Alura-1.png',
	},
	{
		id: 'alura-angular-explorando-o-framework',
		titulo: 'Angular: explorando o framework',
		emissor: 'Alura',
		data: '19 de setembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "Angular: explorando o framework" pela Alura, em 19 de setembro de 2022.',
		imagem: '/pins/alura-angular-explorando-o-framework-320.webp',
		imagemSrcSet:
			'/pins/alura-angular-explorando-o-framework-160.webp 160w, /pins/alura-angular-explorando-o-framework-320.webp 320w',
		original: '/certificados/Curso%20Angular_%20explorando%20o%20framework%20-%20Alura-1.png',
	},
	{
		id: 'alura-arquitetura-css-descomplicando-os-problemas',
		titulo: 'Arquitetura CSS: descomplicando os problemas',
		emissor: 'Alura',
		data: '26 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "Arquitetura CSS: descomplicando os problemas" pela Alura, em 26 de agosto de 2022.',
		imagem: '/pins/alura-arquitetura-css-descomplicando-os-problemas-320.webp',
		imagemSrcSet:
			'/pins/alura-arquitetura-css-descomplicando-os-problemas-160.webp 160w, /pins/alura-arquitetura-css-descomplicando-os-problemas-320.webp 320w',
		original:
			'/certificados/Curso%20Arquitetura%20CSS_%20descomplicando%20os%20problemas%20-%20Alura-1.png',
	},
	{
		id: 'alura-arquitetura-de-computadores-por-tras-de-como-seu-progr-',
		titulo: 'Arquitetura de computadores: por trás de como seu programa funciona',
		emissor: 'Alura',
		data: '23 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Arquitetura de computadores: por trás de como seu programa funciona" pela Alura, em 23 de junho de 2022.',
		imagem: '/pins/alura-arquitetura-de-computadores-por-tras-de-como-seu-progr--320.webp',
		imagemSrcSet:
			'/pins/alura-arquitetura-de-computadores-por-tras-de-como-seu-progr--160.webp 160w, /pins/alura-arquitetura-de-computadores-por-tras-de-como-seu-progr--320.webp 320w',
		original:
			'/certificados/Curso%20Arquitetura%20de%20computadores_%20por%20tr%C3%A1s%20de%20como%20seu%20programa%20funciona%20-%20Alura-1.png',
	},
	{
		id: 'coursera-capstone-applying-project-management-in-the-real-wo-',
		titulo: 'Capstone: Applying Project Management in the Real World',
		emissor: 'Coursera',
		data: '29 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "Capstone: Applying Project Management in the Real World" pela Coursera, em 29 de agosto de 2025.',
		imagem: '/pins/coursera-capstone-applying-project-management-in-the-real-wo--320.webp',
		imagemSrcSet:
			'/pins/coursera-capstone-applying-project-management-in-the-real-wo--160.webp 160w, /pins/coursera-capstone-applying-project-management-in-the-real-wo--320.webp 320w',
		original:
			'/certificados/Coursera%20Capstone_%20Applying%20Project%20Management%20in%20the%20Real%20World-1.png',
	},
	{
		id: 'alura-css-grid-simplificando-layouts',
		titulo: 'CSS Grid: simplificando layouts',
		emissor: 'Alura',
		data: '31 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "CSS Grid: simplificando layouts" pela Alura, em 31 de agosto de 2022.',
		imagem: '/pins/alura-css-grid-simplificando-layouts-320.webp',
		imagemSrcSet:
			'/pins/alura-css-grid-simplificando-layouts-160.webp 160w, /pins/alura-css-grid-simplificando-layouts-320.webp 320w',
		original: '/certificados/Curso%20CSS%20Grid_%20simplificando%20layouts%20-%20Alura-1.png',
	},
	{
		id: 'alura-css-dispondo-elementos-com-flexbox-e-grid',
		titulo: 'CSS: dispondo elementos com Flexbox e Grid',
		emissor: 'Alura',
		data: '10 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "CSS: dispondo elementos com Flexbox e Grid" pela Alura, em 10 de junho de 2022.',
		imagem: '/pins/alura-css-dispondo-elementos-com-flexbox-e-grid-320.webp',
		imagemSrcSet:
			'/pins/alura-css-dispondo-elementos-com-flexbox-e-grid-160.webp 160w, /pins/alura-css-dispondo-elementos-com-flexbox-e-grid-320.webp 320w',
		original:
			'/certificados/Curso%20CSS_%20dispondo%20elementos%20com%20Flexbox%20e%20Grid%20-%20Alura-1.png',
	},
	{
		id: 'alura-expressoes-regulares-capturando-textos-de-forma-magica',
		titulo: 'Expressões regulares: capturando textos de forma mágica',
		emissor: 'Alura',
		data: '15 de dezembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "Expressões regulares: capturando textos de forma mágica" pela Alura, em 15 de dezembro de 2022.',
		imagem: '/pins/alura-expressoes-regulares-capturando-textos-de-forma-magica-320.webp',
		imagemSrcSet:
			'/pins/alura-expressoes-regulares-capturando-textos-de-forma-magica-160.webp 160w, /pins/alura-expressoes-regulares-capturando-textos-de-forma-magica-320.webp 320w',
		original:
			'/certificados/Curso%20Express%C3%B5es%20regulares_%20capturando%20textos%20de%20forma%20m%C3%A1gica%20-%20Alura-1.png',
	},
	{
		id: 'alura-flexbox-posicione-elementos-na-tela',
		titulo: 'Flexbox: posicione elementos na tela',
		emissor: 'Alura',
		data: '30 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "Flexbox: posicione elementos na tela" pela Alura, em 30 de agosto de 2022.',
		imagem: '/pins/alura-flexbox-posicione-elementos-na-tela-320.webp',
		imagemSrcSet:
			'/pins/alura-flexbox-posicione-elementos-na-tela-160.webp 160w, /pins/alura-flexbox-posicione-elementos-na-tela-320.webp 320w',
		original:
			'/certificados/Curso%20Flexbox_%20posicione%20elementos%20na%20tela%20-%20Alura-1.png',
	},
	{
		id: 'alura-formacao-front-end',
		titulo: 'Formação Front-end',
		emissor: 'Alura',
		data: '15 de dezembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "Formação Front-end" pela Alura, em 15 de dezembro de 2022.',
		imagem: '/pins/alura-formacao-front-end-320.webp',
		imagemSrcSet:
			'/pins/alura-formacao-front-end-160.webp 160w, /pins/alura-formacao-front-end-320.webp 320w',
		original: '/certificados/Forma%C3%A7%C3%A3o%20Front-end%20-%20Alura-1.png',
	},
	{
		id: 'alura-formacao-html-e-css',
		titulo: 'Formação HTML e CSS',
		emissor: 'Alura',
		data: '10 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Formação HTML e CSS" pela Alura, em 10 de junho de 2022.',
		imagem: '/pins/alura-formacao-html-e-css-320.webp',
		imagemSrcSet:
			'/pins/alura-formacao-html-e-css-160.webp 160w, /pins/alura-formacao-html-e-css-320.webp 320w',
		original: '/certificados/Forma%C3%A7%C3%A3o%20HTML%20e%20CSS%20-%20Alura-1.png',
	},
	{
		id: 'alura-formacao-melhore-sua-experiencia-com-typescript',
		titulo: 'Formação: melhore sua experiência com TypeScript',
		emissor: 'Alura',
		data: '4 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "Formação: melhore sua experiência com TypeScript" pela Alura, em 4 de novembro de 2022.',
		imagem: '/pins/alura-formacao-melhore-sua-experiencia-com-typescript-320.webp',
		imagemSrcSet:
			'/pins/alura-formacao-melhore-sua-experiencia-com-typescript-160.webp 160w, /pins/alura-formacao-melhore-sua-experiencia-com-typescript-320.webp 320w',
		original:
			'/certificados/Forma%C3%A7%C3%A3o%20Melhore%20sua%20experi%C3%AAncia%20de%20desenvolvimento%20com%20TypeScript%20-%20Alura-1.png',
	},
	{
		id: 'coursera-foundations-of-project-management',
		titulo: 'Foundations of Project Management',
		emissor: 'Coursera',
		data: '19 de junho de 2025',
		ano: 2025,
		nota: 'Conclusão de "Foundations of Project Management" pela Coursera, em 19 de junho de 2025.',
		imagem: '/pins/coursera-foundations-of-project-management-320.webp',
		imagemSrcSet:
			'/pins/coursera-foundations-of-project-management-160.webp 160w, /pins/coursera-foundations-of-project-management-320.webp 320w',
		original: '/certificados/Coursera%20Foundations%20of%20Project%20Management-1.png',
	},
	{
		id: 'alura-git-e-github-controle-e-compartilhe-seu-codigo',
		titulo: 'Git e Github: controle e compartilhe seu código',
		emissor: 'Alura',
		data: '4 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "Git e Github: controle e compartilhe seu código" pela Alura, em 4 de agosto de 2022.',
		imagem: '/pins/alura-git-e-github-controle-e-compartilhe-seu-codigo-320.webp',
		imagemSrcSet:
			'/pins/alura-git-e-github-controle-e-compartilhe-seu-codigo-160.webp 160w, /pins/alura-git-e-github-controle-e-compartilhe-seu-codigo-320.webp 320w',
		original:
			'/certificados/Curso%20Git%20e%20Github_%20controle%20e%20compartilhe%20seu%20c%C3%B3digo%20-%20Alura-1.png',
	},
	{
		id: 'coursera-google-project-management',
		titulo: 'Google Project Management',
		emissor: 'Coursera',
		data: '29 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "Google Project Management" pela Coursera, em 29 de agosto de 2025.',
		imagem: '/pins/coursera-google-project-management-320.webp',
		imagemSrcSet:
			'/pins/coursera-google-project-management-160.webp 160w, /pins/coursera-google-project-management-320.webp 320w',
		original: '/certificados/Coursera%20Google%20Project-1.png',
	},
	{
		id: 'alura-html-e-css-praticando-html-e-css',
		titulo: 'HTML e CSS: praticando HTML e CSS',
		emissor: 'Alura',
		data: '2 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTML e CSS: praticando HTML e CSS" pela Alura, em 2 de junho de 2022.',
		imagem: '/pins/alura-html-e-css-praticando-html-e-css-320.webp',
		imagemSrcSet:
			'/pins/alura-html-e-css-praticando-html-e-css-160.webp 160w, /pins/alura-html-e-css-praticando-html-e-css-320.webp 320w',
		original: '/certificados/Curso%20HTML%20e%20CSS_%20praticando%20HTML_CSS%20-%20Alura-1.png',
	},
	{
		id: 'alura-html5-e-css3-parte-1-crie-uma-pagina-da-web',
		titulo: 'HTML5 e CSS3 parte 1: crie uma página da Web',
		emissor: 'Alura',
		data: '26 de maio de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTML5 e CSS3 parte 1: crie uma página da Web" pela Alura, em 26 de maio de 2022.',
		imagem: '/pins/alura-html5-e-css3-parte-1-crie-uma-pagina-da-web-320.webp',
		imagemSrcSet:
			'/pins/alura-html5-e-css3-parte-1-crie-uma-pagina-da-web-160.webp 160w, /pins/alura-html5-e-css3-parte-1-crie-uma-pagina-da-web-320.webp 320w',
		original:
			'/certificados/Curso%20HTML5%20e%20CSS3%20parte%201_%20crie%20uma%20p%C3%A1gina%20da%20Web%20-%20Alura-1.png',
	},
	{
		id: 'alura-html5-e-css3-parte-2-posicionamento-listas-e-navegacao',
		titulo: 'HTML5 e CSS3 parte 2: posicionamento, listas e navegação',
		emissor: 'Alura',
		data: '27 de maio de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTML5 e CSS3 parte 2: posicionamento, listas e navegação" pela Alura, em 27 de maio de 2022.',
		imagem: '/pins/alura-html5-e-css3-parte-2-posicionamento-listas-e-navegacao-320.webp',
		imagemSrcSet:
			'/pins/alura-html5-e-css3-parte-2-posicionamento-listas-e-navegacao-160.webp 160w, /pins/alura-html5-e-css3-parte-2-posicionamento-listas-e-navegacao-320.webp 320w',
		original:
			'/certificados/Curso%20HTML5%20e%20CSS3%20parte%202_%20posicionamento%2C%20listas%20e%20navega%C3%A7%C3%A3o%20-%20Alura-1.png',
	},
	{
		id: 'alura-html5-e-css3-parte-3-formularios-e-tabelas',
		titulo: 'HTML5 e CSS3 parte 3: formulários e tabelas',
		emissor: 'Alura',
		data: '30 de maio de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTML5 e CSS3 parte 3: formulários e tabelas" pela Alura, em 30 de maio de 2022.',
		imagem: '/pins/alura-html5-e-css3-parte-3-formularios-e-tabelas-320.webp',
		imagemSrcSet:
			'/pins/alura-html5-e-css3-parte-3-formularios-e-tabelas-160.webp 160w, /pins/alura-html5-e-css3-parte-3-formularios-e-tabelas-320.webp 320w',
		original:
			'/certificados/Curso%20HTML5%20e%20CSS3%20parte%203_%20trabalhando%20com%20formul%C3%A1rios%20e%20tabelas%20-%20Alura-1.png',
	},
	{
		id: 'alura-html5-e-css3-parte-4-avancando-no-css',
		titulo: 'HTML5 e CSS3 parte 4: avançando no CSS',
		emissor: 'Alura',
		data: '30 de maio de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTML5 e CSS3 parte 4: avançando no CSS" pela Alura, em 30 de maio de 2022.',
		imagem: '/pins/alura-html5-e-css3-parte-4-avancando-no-css-320.webp',
		imagemSrcSet:
			'/pins/alura-html5-e-css3-parte-4-avancando-no-css-160.webp 160w, /pins/alura-html5-e-css3-parte-4-avancando-no-css-320.webp 320w',
		original:
			'/certificados/Curso%20HTML5%20e%20CSS3%20parte%204_%20avan%C3%A7ando%20no%20CSS%20-%20Alura-1.png',
	},
	{
		id: 'alura-http-entendendo-a-web-por-baixo-dos-panos',
		titulo: 'HTTP: entendendo a web por baixo dos panos',
		emissor: 'Alura',
		data: '28 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "HTTP: entendendo a web por baixo dos panos" pela Alura, em 28 de novembro de 2022.',
		imagem: '/pins/alura-http-entendendo-a-web-por-baixo-dos-panos-320.webp',
		imagemSrcSet:
			'/pins/alura-http-entendendo-a-web-por-baixo-dos-panos-160.webp 160w, /pins/alura-http-entendendo-a-web-por-baixo-dos-panos-320.webp 320w',
		original:
			'/certificados/Curso%20HTTP_%20Entendendo%20a%20web%20por%20baixo%20dos%20panos%20-%20Alura-1.png',
	},
	{
		id: 'prime-informatica-intermediaria',
		titulo: 'Informática intermediária',
		emissor: 'Prime Cursos',
		data: 'Janeiro de 2021',
		ano: 2021,
		nota: 'Conclusão de "Informática intermediária" pela Prime Cursos, em Janeiro de 2021.',
		imagem: '/pins/prime-informatica-intermediaria-320.webp',
		imagemSrcSet:
			'/pins/prime-informatica-intermediaria-160.webp 160w, /pins/prime-informatica-intermediaria-320.webp 320w',
		original: '/certificados/Certificado-10356-8712516%20inform%C3%A1tica-1.png',
	},
	{
		id: 'prime-ingles-intermediario',
		titulo: 'Inglês intermediário',
		emissor: 'Prime Cursos',
		data: 'Janeiro de 2021',
		ano: 2021,
		nota: 'Conclusão de "Inglês intermediário" pela Prime Cursos, em Janeiro de 2021.',
		imagem: '/pins/prime-ingles-intermediario-320.webp',
		imagemSrcSet:
			'/pins/prime-ingles-intermediario-160.webp 160w, /pins/prime-ingles-intermediario-320.webp 320w',
		original: '/certificados/Certificado-10091-8712516%20Ingl%C3%AAs-1.png',
	},
	{
		id: 'prime-ingles-intermediario-2',
		titulo: 'Inglês intermediário',
		emissor: 'Prime Cursos',
		data: 'Janeiro de 2021',
		ano: 2021,
		nota: 'Conclusão de "Inglês intermediário" pela Prime Cursos, em Janeiro de 2021.',
		imagem: '/pins/prime-ingles-intermediario-2-320.webp',
		imagemSrcSet:
			'/pins/prime-ingles-intermediario-2-160.webp 160w, /pins/prime-ingles-intermediario-2-320.webp 320w',
		original: '/certificados/Certificado-10091-8712516%20ingles(1)-1.png',
	},
	{
		id: 'udemy-ionic-4-angular-firebase-firestore-e-login-com-faceboo-',
		titulo: 'Ionic 4: Angular, Firebase, Firestore e Login com Facebook',
		emissor: 'Udemy',
		data: '20 de outubro de 2019',
		ano: 2019,
		nota: 'Conclusão de "Ionic 4: Angular, Firebase, Firestore e Login com Facebook" pela Udemy, em 20 de outubro de 2019.',
		imagem: '/pins/udemy-ionic-4-angular-firebase-firestore-e-login-com-faceboo--320.webp',
		imagemSrcSet:
			'/pins/udemy-ionic-4-angular-firebase-firestore-e-login-com-faceboo--160.webp 160w, /pins/udemy-ionic-4-angular-firebase-firestore-e-login-com-faceboo--320.webp 320w',
		original: '/certificados/Ionic4A-1.png',
	},
	{
		id: 'alura-java-jre-e-jdk-compile-e-execute-o-seu-programa',
		titulo: 'Java JRE e JDK: compile e execute o seu programa',
		emissor: 'Alura',
		data: '5 de julho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Java JRE e JDK: compile e execute o seu programa" pela Alura, em 5 de julho de 2022.',
		imagem: '/pins/alura-java-jre-e-jdk-compile-e-execute-o-seu-programa-320.webp',
		imagemSrcSet:
			'/pins/alura-java-jre-e-jdk-compile-e-execute-o-seu-programa-160.webp 160w, /pins/alura-java-jre-e-jdk-compile-e-execute-o-seu-programa-320.webp 320w',
		original:
			'/certificados/Curso%20Java%20JRE%20e%20JDK_%20compile%20e%20execute%20o%20seu%20programa%20-%20Alura-1.png',
	},
	{
		id: 'alura-java-oo-entendendo-a-orientacao-a-objetos',
		titulo: 'Java OO: entendendo a Orientação a Objetos',
		emissor: 'Alura',
		data: '7 de julho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Java OO: entendendo a Orientação a Objetos" pela Alura, em 7 de julho de 2022.',
		imagem: '/pins/alura-java-oo-entendendo-a-orientacao-a-objetos-320.webp',
		imagemSrcSet:
			'/pins/alura-java-oo-entendendo-a-orientacao-a-objetos-160.webp 160w, /pins/alura-java-oo-entendendo-a-orientacao-a-objetos-320.webp 320w',
		original:
			'/certificados/Curso%20Java%20OO_%20entendendo%20a%20Orienta%C3%A7%C3%A3o%20a%20Objetos%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-e-html-desenhe-anime-e-jogue',
		titulo: 'JavaScript e HTML: desenhe, anime e jogue',
		emissor: 'Alura',
		data: '27 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript e HTML: desenhe, anime e jogue" pela Alura, em 27 de junho de 2022.',
		imagem: '/pins/alura-javascript-e-html-desenhe-anime-e-jogue-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-e-html-desenhe-anime-e-jogue-160.webp 160w, /pins/alura-javascript-e-html-desenhe-anime-e-jogue-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20e%20HTML_%20pratique%20l%C3%B3gica%20com%20desenhos%2C%20anima%C3%A7%C3%B5es%20e%20um%20jogo%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-e-html-desenvolva-um-jogo-e-pratique-logica',
		titulo: 'JavaScript e HTML: desenvolva um jogo e pratique lógica',
		emissor: 'Alura',
		data: '24 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript e HTML: desenvolva um jogo e pratique lógica" pela Alura, em 24 de junho de 2022.',
		imagem: '/pins/alura-javascript-e-html-desenvolva-um-jogo-e-pratique-logica-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-e-html-desenvolva-um-jogo-e-pratique-logica-160.webp 160w, /pins/alura-javascript-e-html-desenvolva-um-jogo-e-pratique-logica-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20e%20HTML_%20desenvolva%20um%20jogo%20e%20pratique%20l%C3%B3gica%20de%20programa%C3%A7%C3%A3o%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-i-algoritmos-de-ordenacao',
		titulo: 'JavaScript I: algoritmos de ordenação',
		emissor: 'Alura',
		data: '27 de julho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript I: algoritmos de ordenação" pela Alura, em 27 de julho de 2022.',
		imagem: '/pins/alura-javascript-i-algoritmos-de-ordenacao-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-i-algoritmos-de-ordenacao-160.webp 160w, /pins/alura-javascript-i-algoritmos-de-ordenacao-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20I_%20algoritmos%20de%20ordena%C3%A7%C3%A3o%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-na-web-armazenando-dados-no-navegador',
		titulo: 'JavaScript na Web: armazenando dados no navegador',
		emissor: 'Alura',
		data: '18 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript na Web: armazenando dados no navegador" pela Alura, em 18 de agosto de 2022.',
		imagem: '/pins/alura-javascript-na-web-armazenando-dados-no-navegador-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-na-web-armazenando-dados-no-navegador-160.webp 160w, /pins/alura-javascript-na-web-armazenando-dados-no-navegador-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20na%20Web_%20armazenando%20dados%20no%20navegador%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-na-web-validacao-de-formularios-e-html5',
		titulo: 'JavaScript na Web: validação de formulários e HTML5',
		emissor: 'Alura',
		data: '28 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript na Web: validação de formulários e HTML5" pela Alura, em 28 de novembro de 2022.',
		imagem: '/pins/alura-javascript-na-web-validacao-de-formularios-e-html5-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-na-web-validacao-de-formularios-e-html5-160.webp 160w, /pins/alura-javascript-na-web-validacao-de-formularios-e-html5-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20na%20Web_%20valida%C3%A7%C3%A3o%20de%20Formul%C3%A1rios%20e%20HTML5%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-para-web-crie-paginas-dinamicas',
		titulo: 'JavaScript para Web: crie páginas dinâmicas',
		emissor: 'Alura',
		data: '14 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript para Web: crie páginas dinâmicas" pela Alura, em 14 de junho de 2022.',
		imagem: '/pins/alura-javascript-para-web-crie-paginas-dinamicas-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-para-web-crie-paginas-dinamicas-160.webp 160w, /pins/alura-javascript-para-web-crie-paginas-dinamicas-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript%20para%20Web_%20Crie%20p%C3%A1ginas%20din%C3%A2micas%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-arrays',
		titulo: 'JavaScript: Arrays',
		emissor: 'Alura',
		data: '7 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: Arrays" pela Alura, em 7 de junho de 2022.',
		imagem: '/pins/alura-javascript-arrays-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-arrays-160.webp 160w, /pins/alura-javascript-arrays-320.webp 320w',
		original: '/certificados/Curso%20JavaScript_%20Arrays%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-conhecendo-o-browser-e-padroes-de-projeto',
		titulo: 'JavaScript: conhecendo o Browser e padrões de projeto',
		emissor: 'Alura',
		data: '19 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: conhecendo o Browser e padrões de projeto" pela Alura, em 19 de junho de 2022.',
		imagem: '/pins/alura-javascript-conhecendo-o-browser-e-padroes-de-projeto-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-conhecendo-o-browser-e-padroes-de-projeto-160.webp 160w, /pins/alura-javascript-conhecendo-o-browser-e-padroes-de-projeto-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20conhecendo%20o%20Browser%20e%20padr%C3%B5es%20de%20projeto%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-consumindo-e-tratando-dados-de-uma-api',
		titulo: 'JavaScript: consumindo e tratando dados de uma API',
		emissor: 'Alura',
		data: '1 de setembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: consumindo e tratando dados de uma API" pela Alura, em 1 de setembro de 2022.',
		imagem: '/pins/alura-javascript-consumindo-e-tratando-dados-de-uma-api-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-consumindo-e-tratando-dados-de-uma-api-160.webp 160w, /pins/alura-javascript-consumindo-e-tratando-dados-de-uma-api-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20consumindo%20e%20tratando%20dados%20de%20uma%20API%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-explorando-a-linguagem',
		titulo: 'JavaScript: explorando a linguagem',
		emissor: 'Alura',
		data: '27 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: explorando a linguagem" pela Alura, em 27 de junho de 2022.',
		imagem: '/pins/alura-javascript-explorando-a-linguagem-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-explorando-a-linguagem-160.webp 160w, /pins/alura-javascript-explorando-a-linguagem-320.webp 320w',
		original: '/certificados/Curso%20JavaScript_%20explorando%20a%20linguagem%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-interfaces-e-heranca-em-orientacao-a-objeto-',
		titulo: 'JavaScript: interfaces e Herança em Orientação a Objetos',
		emissor: 'Alura',
		data: '11 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: interfaces e Herança em Orientação a Objetos" pela Alura, em 11 de junho de 2022.',
		imagem: '/pins/alura-javascript-interfaces-e-heranca-em-orientacao-a-objeto--320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-interfaces-e-heranca-em-orientacao-a-objeto--160.webp 160w, /pins/alura-javascript-interfaces-e-heranca-em-orientacao-a-objeto--320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20interfaces%20e%20Heran%C3%A7a%20em%20Orienta%C3%A7%C3%A3o%20a%20Objetos%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-manipulando-o-dom',
		titulo: 'JavaScript: manipulando o DOM',
		emissor: 'Alura',
		data: '11 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: manipulando o DOM" pela Alura, em 11 de agosto de 2022.',
		imagem: '/pins/alura-javascript-manipulando-o-dom-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-manipulando-o-dom-160.webp 160w, /pins/alura-javascript-manipulando-o-dom-320.webp 320w',
		original: '/certificados/Curso%20JavaScript_%20manipulando%20o%20DOM%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-metodos-de-array',
		titulo: 'JavaScript: métodos de array',
		emissor: 'Alura',
		data: '15 de setembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: métodos de array" pela Alura, em 15 de setembro de 2022.',
		imagem: '/pins/alura-javascript-metodos-de-array-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-metodos-de-array-160.webp 160w, /pins/alura-javascript-metodos-de-array-320.webp 320w',
		original: '/certificados/Curso%20JavaScript_%20m%C3%A9todos%20de%20array%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-objetos',
		titulo: 'JavaScript: objetos',
		emissor: 'Alura',
		data: '17 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: objetos" pela Alura, em 17 de junho de 2022.',
		imagem: '/pins/alura-javascript-objetos-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-objetos-160.webp 160w, /pins/alura-javascript-objetos-320.webp 320w',
		original: '/certificados/Curso%20JavaScript_%20objetos%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-programacao-orientada-a-objetos',
		titulo: 'JavaScript: programação orientada a objetos',
		emissor: 'Alura',
		data: '9 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: programação orientada a objetos" pela Alura, em 9 de agosto de 2022.',
		imagem: '/pins/alura-javascript-programacao-orientada-a-objetos-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-programacao-orientada-a-objetos-160.webp 160w, /pins/alura-javascript-programacao-orientada-a-objetos-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20programa%C3%A7%C3%A3o%20orientada%20a%20objetos%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-programando-a-orientacao-a-objetos',
		titulo: 'JavaScript: programando a Orientação a Objetos',
		emissor: 'Alura',
		data: '4 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: programando a Orientação a Objetos" pela Alura, em 4 de junho de 2022.',
		imagem: '/pins/alura-javascript-programando-a-orientacao-a-objetos-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-programando-a-orientacao-a-objetos-160.webp 160w, /pins/alura-javascript-programando-a-orientacao-a-objetos-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20programando%20a%20Orienta%C3%A7%C3%A3o%20a%20Objetos%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-tipos-variaveis-e-funcoes',
		titulo: 'JavaScript: tipos, variáveis e funções',
		emissor: 'Alura',
		data: '28 de janeiro de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: tipos, variáveis e funções" pela Alura, em 28 de janeiro de 2022.',
		imagem: '/pins/alura-javascript-tipos-variaveis-e-funcoes-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-tipos-variaveis-e-funcoes-160.webp 160w, /pins/alura-javascript-tipos-variaveis-e-funcoes-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20tipos%2C%20vari%C3%A1veis%20e%20fun%C3%A7%C3%B5es%20-%20Alura-1.png',
	},
	{
		id: 'alura-javascript-validacoes-e-reconhecimento-de-voz',
		titulo: 'JavaScript: validações e reconhecimento de voz',
		emissor: 'Alura',
		data: '26 de agosto de 2022',
		ano: 2022,
		nota: 'Conclusão de "JavaScript: validações e reconhecimento de voz" pela Alura, em 26 de agosto de 2022.',
		imagem: '/pins/alura-javascript-validacoes-e-reconhecimento-de-voz-320.webp',
		imagemSrcSet:
			'/pins/alura-javascript-validacoes-e-reconhecimento-de-voz-160.webp 160w, /pins/alura-javascript-validacoes-e-reconhecimento-de-voz-320.webp 320w',
		original:
			'/certificados/Curso%20JavaScript_%20valida%C3%A7%C3%B5es%20e%20reconhecimento%20de%20voz%20-%20Alura-1.png',
	},
	{
		id: 'alura-layouts-responsivos-trabalhando-com-layouts-mobile',
		titulo: 'Layouts responsivos: trabalhando com layouts mobile',
		emissor: 'Alura',
		data: '10 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Layouts responsivos: trabalhando com layouts mobile" pela Alura, em 10 de junho de 2022.',
		imagem: '/pins/alura-layouts-responsivos-trabalhando-com-layouts-mobile-320.webp',
		imagemSrcSet:
			'/pins/alura-layouts-responsivos-trabalhando-com-layouts-mobile-160.webp 160w, /pins/alura-layouts-responsivos-trabalhando-com-layouts-mobile-320.webp 320w',
		original:
			'/certificados/Curso%20Layouts%20Responsivos_%20trabalhando%20com%20layouts%20mobile%20-%20Alura-1.png',
	},
	{
		id: 'alura-linux-i-conhecendo-e-utilizando-o-terminal',
		titulo: 'Linux I: conhecendo e utilizando o terminal',
		emissor: 'Alura',
		data: '13 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "Linux I: conhecendo e utilizando o terminal" pela Alura, em 13 de junho de 2022.',
		imagem: '/pins/alura-linux-i-conhecendo-e-utilizando-o-terminal-320.webp',
		imagemSrcSet:
			'/pins/alura-linux-i-conhecendo-e-utilizando-o-terminal-160.webp 160w, /pins/alura-linux-i-conhecendo-e-utilizando-o-terminal-320.webp 320w',
		original:
			'/certificados/Curso%20Linux%20I_%20conhecendo%20e%20utilizando%20o%20terminal%20-%20Alura-1.png',
	},
	{
		id: 'alura-logica-de-programacao-pong-e-javascript',
		titulo: 'Lógica de programação: Pong e JavaScript',
		emissor: 'Alura',
		data: '31 de maio de 2022',
		ano: 2022,
		nota: 'Conclusão de "Lógica de programação: Pong e JavaScript" pela Alura, em 31 de maio de 2022.',
		imagem: '/pins/alura-logica-de-programacao-pong-e-javascript-320.webp',
		imagemSrcSet:
			'/pins/alura-logica-de-programacao-pong-e-javascript-160.webp 160w, /pins/alura-logica-de-programacao-pong-e-javascript-320.webp 320w',
		original:
			'/certificados/Curso%20L%C3%B3gica%20de%20programa%C3%A7%C3%A3o_%20comece%20em%20l%C3%B3gica%20com%20o%20jogo%20Pong%20e%20JavaScript%20-%20Alura-1.png',
	},
	{
		id: 'prime-pacote-office',
		titulo: 'Pacote Office',
		emissor: 'Prime Cursos',
		data: 'Janeiro de 2021',
		ano: 2021,
		nota: 'Conclusão de "Pacote Office" pela Prime Cursos, em Janeiro de 2021.',
		imagem: '/pins/prime-pacote-office-320.webp',
		imagemSrcSet:
			'/pins/prime-pacote-office-160.webp 160w, /pins/prime-pacote-office-320.webp 320w',
		original: '/certificados/Certificado-10344-8712516%20(1)-1.png',
	},
	{
		id: 'coursera-project-execution-running-the-project',
		titulo: 'Project Execution: Running the Project',
		emissor: 'Coursera',
		data: '28 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "Project Execution: Running the Project" pela Coursera, em 28 de agosto de 2025.',
		imagem: '/pins/coursera-project-execution-running-the-project-320.webp',
		imagemSrcSet:
			'/pins/coursera-project-execution-running-the-project-160.webp 160w, /pins/coursera-project-execution-running-the-project-320.webp 320w',
		original: '/certificados/Coursera%20Project%20Execution_%20Running%20the%20Project-1.png',
	},
	{
		id: 'coursera-project-initiation-starting-a-successful-project',
		titulo: 'Project Initiation: Starting a Successful Project',
		emissor: 'Coursera',
		data: '7 de julho de 2025',
		ano: 2025,
		nota: 'Conclusão de "Project Initiation: Starting a Successful Project" pela Coursera, em 7 de julho de 2025.',
		imagem: '/pins/coursera-project-initiation-starting-a-successful-project-320.webp',
		imagemSrcSet:
			'/pins/coursera-project-initiation-starting-a-successful-project-160.webp 160w, /pins/coursera-project-initiation-starting-a-successful-project-320.webp 320w',
		original:
			'/certificados/Coursera%20Project%20Initiation_%20Starting%20a%20Successful%20Project.pdf-1.png',
	},
	{
		id: 'coursera-project-planning-putting-it-all-together',
		titulo: 'Project Planning: Putting It All Together',
		emissor: 'Coursera',
		data: '22 de julho de 2025',
		ano: 2025,
		nota: 'Conclusão de "Project Planning: Putting It All Together" pela Coursera, em 22 de julho de 2025.',
		imagem: '/pins/coursera-project-planning-putting-it-all-together-320.webp',
		imagemSrcSet:
			'/pins/coursera-project-planning-putting-it-all-together-160.webp 160w, /pins/coursera-project-planning-putting-it-all-together-320.webp 320w',
		original: '/certificados/Coursera%20Project%20Planning_%20Putting%20It%20All%20Together-1.png',
	},
	{
		id: 'sapiens-seminario-nas-faculdades-agua-tratada-e-educacao-amb-',
		titulo: 'Seminário nas Faculdades: água tratada e educação ambiental',
		emissor: 'UNISAPIENS',
		data: '28 de outubro de 2024',
		ano: 2024,
		nota: 'Participação no Seminário nas Faculdades: água tratada e educação ambiental, em 28 de outubro de 2024.',
		imagem: '/pins/sapiens-seminario-nas-faculdades-agua-tratada-e-educacao-amb--320.webp',
		imagemSrcSet:
			'/pins/sapiens-seminario-nas-faculdades-agua-tratada-e-educacao-amb--160.webp 160w, /pins/sapiens-seminario-nas-faculdades-agua-tratada-e-educacao-amb--320.webp 320w',
		original: '/certificados/ARTHUR%20MARTINS%20-%20SAPIENS-1.png',
	},
	{
		id: 'alura-seo-otimizacao-de-sites',
		titulo: 'SEO: otimização de sites',
		emissor: 'Alura',
		data: '14 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "SEO: otimização de sites" pela Alura, em 14 de novembro de 2022.',
		imagem: '/pins/alura-seo-otimizacao-de-sites-320.webp',
		imagemSrcSet:
			'/pins/alura-seo-otimizacao-de-sites-160.webp 160w, /pins/alura-seo-otimizacao-de-sites-320.webp 320w',
		original: '/certificados/Curso%20SEO_%20otimiza%C3%A7%C3%A3o%20de%20sites%20-%20Alura-1.png',
	},
	{
		id: 'udemy-sql-server-para-desenvolvedores-do-basico-ao-avancado',
		titulo: 'SQL Server para desenvolvedores: do básico ao avançado',
		emissor: 'Udemy',
		data: '28 de agosto de 2025',
		ano: 2025,
		nota: 'Conclusão de "SQL Server para desenvolvedores: do básico ao avançado" pela Udemy, em 28 de agosto de 2025.',
		imagem: '/pins/udemy-sql-server-para-desenvolvedores-do-basico-ao-avancado-320.webp',
		imagemSrcSet:
			'/pins/udemy-sql-server-para-desenvolvedores-do-basico-ao-avancado-160.webp 160w, /pins/udemy-sql-server-para-desenvolvedores-do-basico-ao-avancado-320.webp 320w',
		original: '/certificados/UC-eef72880-a375-4e52-92df-852a2857fb78-1.png',
	},
	{
		id: 'senai-tecnologia-da-informacao-e-comunicacao',
		titulo: 'Tecnologia da informação e comunicação',
		emissor: 'SENAI',
		data: '11 de dezembro de 2021',
		ano: 2021,
		nota: 'Conclusão de "Tecnologia da informação e comunicação" pela SENAI, em 11 de dezembro de 2021.',
		imagem: '/pins/senai-tecnologia-da-informacao-e-comunicacao-320.webp',
		imagemSrcSet:
			'/pins/senai-tecnologia-da-informacao-e-comunicacao-160.webp 160w, /pins/senai-tecnologia-da-informacao-e-comunicacao-320.webp 320w',
		original: '/certificados/Curso%20Tecnologia%20da%20informa%C3%A7%C3%A3o-1.png',
	},
	{
		id: 'alura-typescript-parte-1-evoluindo-seu-javascript',
		titulo: 'TypeScript parte 1: evoluindo seu JavaScript',
		emissor: 'Alura',
		data: '28 de junho de 2022',
		ano: 2022,
		nota: 'Conclusão de "TypeScript parte 1: evoluindo seu JavaScript" pela Alura, em 28 de junho de 2022.',
		imagem: '/pins/alura-typescript-parte-1-evoluindo-seu-javascript-320.webp',
		imagemSrcSet:
			'/pins/alura-typescript-parte-1-evoluindo-seu-javascript-160.webp 160w, /pins/alura-typescript-parte-1-evoluindo-seu-javascript-320.webp 320w',
		original:
			'/certificados/Curso%20TypeScript%20parte%201_%20evoluindo%20seu%20JavaScript%20-%20Alura-1.png',
	},
	{
		id: 'alura-typescript-parte-2-avancando-na-linguagem',
		titulo: 'TypeScript parte 2: avançando na linguagem',
		emissor: 'Alura',
		data: '22 de julho de 2022',
		ano: 2022,
		nota: 'Conclusão de "TypeScript parte 2: avançando na linguagem" pela Alura, em 22 de julho de 2022.',
		imagem: '/pins/alura-typescript-parte-2-avancando-na-linguagem-320.webp',
		imagemSrcSet:
			'/pins/alura-typescript-parte-2-avancando-na-linguagem-160.webp 160w, /pins/alura-typescript-parte-2-avancando-na-linguagem-320.webp 320w',
		original:
			'/certificados/Curso%20TypeScript%20parte%202_%20avan%C3%A7ando%20na%20linguagem%20-%20Alura-1.png',
	},
	{
		id: 'alura-typescript-parte-3-mais-tecnicas-e-boas-praticas',
		titulo: 'TypeScript parte 3: mais técnicas e boas práticas',
		emissor: 'Alura',
		data: '4 de novembro de 2022',
		ano: 2022,
		nota: 'Conclusão de "TypeScript parte 3: mais técnicas e boas práticas" pela Alura, em 4 de novembro de 2022.',
		imagem: '/pins/alura-typescript-parte-3-mais-tecnicas-e-boas-praticas-320.webp',
		imagemSrcSet:
			'/pins/alura-typescript-parte-3-mais-tecnicas-e-boas-praticas-160.webp 160w, /pins/alura-typescript-parte-3-mais-tecnicas-e-boas-praticas-320.webp 320w',
		original:
			'/certificados/Curso%20Typescript%20parte%203_%20mais%20t%C3%A9cnicas%20e%20boas%20pr%C3%A1ticas%20-%20Alura-1.png',
	},
];
