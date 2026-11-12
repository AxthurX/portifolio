import axios from 'axios';
import { redirect } from 'next/navigation';
import type { Key } from './components/items';

const handleStyle = (style: string, id: string) => {
	const existing_element = document.getElementById(id);
	if (existing_element) existing_element.remove();

	if (style) {
		const style_el = document.createElement('style');
		style_el.id = id;
		style_el.innerHTML = style;
		document.head.appendChild(style_el);
	}
};

const handleThemeChange = async (value: string) => {
	const theme = value || 'sedam';
	document.documentElement.setAttribute('data-theme', theme);
	await axios.post('/api/theme', { theme: theme });
};

const handleClasses = (modifier: (element: HTMLElement) => void, id: string) => {
	const modifier_class = `modified-${id}`;

	if (id) {
		const elements = document.querySelectorAll(`.${modifier_class}`);

		for (const element of elements) {
			if (element instanceof HTMLElement) {
				element.classList.remove(modifier_class);
				// Remove classes específicas do destaque
				if (id === 'link-highlight') {
					element.classList.remove('underline', '!text-black', '!bg-neutral-content');
				} else if (id === 'title-highlight') {
					element.classList.remove('bg-neutral-content', '!text-black');
				}
			}
		}
	}

	if (modifier) {
		let element_modifier: NodeListOf<Element>;

		if (id === 'link-highlight') {
			element_modifier = document.querySelectorAll('a');
		} else if (id === 'title-highlight') {
			element_modifier = document.querySelectorAll(
				'.text-xl, .text-2xl, .text-3xl, .text-4xl, .text-5xl, .text-6xl, .text-7xl, h1, h2',
			);
		} else if (id === 'reading-mode-hide') {
			element_modifier = document.querySelectorAll('.reading-mode-hide');
		} else if (id === 'reading-mode') {
			element_modifier = document.querySelectorAll('.reading-mode');
		} else {
			return;
		}

		for (const element of element_modifier) {
			if (element instanceof HTMLElement) {
				modifier(element);
				element.classList.add(modifier_class);
			}
		}
	}
};

export const handleSettings = async (
	key: string,
	value: string,
	accessibilityContext?: { toggleMenu: (status?: boolean) => void },
) => {
	switch (key as Key) {
		case 'alignment': {
			handleStyle(`* { text-align: ${value} !important; }`, 'text-center');

			break;
		}
		case 'contrast': {
			await handleThemeChange(value);

			break;
		}
		case 'cursor': {
			['large-cursor'].map((id) => document.getElementById(id)?.remove());

			if (value === 'large-cursor') {
				handleStyle(
					`* { cursor: url('/accessibility/cursor.svg') 16 16, auto !important }`,
					'large-cursor',
				);
			}

			break;
		}
		case 'font': {
			const main = document.querySelector('main');
			if (main) main.style.fontFamily = value;

			break;
		}
		case 'height': {
			handleStyle(`* { line-height: ${value} !important; }`, 'line-height');

			break;
		}
		case 'text': {
			document.documentElement.style.fontSize = `${value}px`;

			break;
		}
		case 'saturation': {
			document.documentElement.style.filter = `saturate(${value})`;
			break;
		}
		case 'spacing': {
			const spacing_value = value === 'normal' ? value : `.${16 + Number.parseInt(value)}em`;
			document.documentElement.style.wordSpacing = spacing_value;
			document.documentElement.style.letterSpacing = spacing_value;

			break;
		}
		case 'link-highlight': {
			handleClasses(
				value === 'enable'
					? (element) => {
							element.classList.add('underline', '!text-black', '!bg-neutral-content');
						}
					: (element) => {
							element.classList.remove('underline', '!text-black', '!bg-neutral-content');
						},
				'link-highlight',
			);

			break;
		}
		case 'title-highlight': {
			handleClasses(
				value === 'enable'
					? (element) => {
							element.classList.add('bg-neutral-content', '!text-black');
						}
					: (element) => {
							element.classList.remove('bg-neutral-content', '!text-black');
						},
				'title-highlight',
			);

			break;
		}
		case 'pause-animation': {
			handleStyle(
				value === 'enable' ? ' * { transition: none !important; animation: none !important; }' : '',
				'pause',
			);

			break;
		}
		case 'hidden-images': {
			handleStyle(value === 'enable' ? 'img { visibility: hidden !important; }' : '', 'hidden');

			break;
		}
		case 'reading-mode': {
			handleClasses(
				value === 'enable'
					? (element) => {
							element.classList.add('hidden', '!text-black');
						}
					: (element) => {
							element.classList.remove('hidden', '!text-black');
						},
				'reading-mode-hide',
			);
			handleClasses(
				value === 'enable'
					? (element) => {
							element.classList.add('!w-full', '!max-w-none', '!text-2xl');
						}
					: (element) => {
							element.classList.remove('!w-full', '!max-w-none', '!text-2xl');
						},
				'reading-mode',
			);

			break;
		}
		case 'enlarge-cursor': {
			const target_elements =
				'p, h1, h2, h3, h4, h5, h6, li, a, button, input, textarea, label, select, img, span';
			const target_divs =
				'div:not(:has(div, section, article, main, header, footer, ul, ol, table, nav))';
			handleStyle(
				value === 'enable'
					? `:is(${target_elements}, ${target_divs}):hover:not(:has(:hover)):not(:empty) { scale: 110% 110% 110% !important; background-color: rgba(255, 255, 255, 0.5) !important; color: black !important; padding: 10px; border: 2px solid black !important; border-radius: 10px !important; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important; z-index: 999999 !important;}`
					: '',
				'enlarge-cursor',
			);

			break;
		}
		case 'site-map': {
			redirect('/mapa-do-site');
			break;
		}
		case 'vlibras': {
			if (accessibilityContext?.toggleMenu) {
				accessibilityContext.toggleMenu(false);
			}

			setTimeout(() => {
				const wrapper = document.querySelector('[vw-plugin-wrapper]') as HTMLElement | null;
				const button = document.querySelector('[vw-access-button]') as HTMLElement | null;

				if (!button || !wrapper || wrapper.classList.contains('active')) {
					return;
				}

				button.click();
			}, 300);

			break;
		}
		case 'position': {
			break;
		}
		case 'page-structure': {
			break;
		}
		default:
			console.warn(`Não existe acessibilidade para essa: ${key}`, false);
			break;
	}
};
