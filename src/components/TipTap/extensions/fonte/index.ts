import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { FonteComponent } from './fonte';
import { COORDENADORIAS_FONTE } from './ultis';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		fonte: {
			setFonteComponent: (options?: {
				texto?: string;
				foto?: string;
				coordenadoria?: string;
			}) => ReturnType;
		};
	}
}

export const FonteNode = Node.create({
	name: 'fonte',

	group: 'block',

	content: 'block*',

	isolating: true,

	defining: true,

	priority: 1000,

	addAttributes() {
		return {
			style: {
				default: null,
				parseHTML: (el) => el.getAttribute('style'),
				renderHTML: (attrs) => (attrs.style ? { style: attrs.style } : {}),
			},
			class: {
				default: null,
				parseHTML: (el) => el.getAttribute('class'),
				renderHTML: (attrs) => (attrs.class ? { class: attrs.class } : {}),
			},
			texto: {
				default: 'Nome do Autor',
				parseHTML: (el) => {
					const span = Array.from(el.querySelectorAll('span')).find((s) =>
						s.textContent?.toLowerCase().includes('texto:'),
					);
					return span ? span.textContent?.replace(/^.*?texto:\s*/i, '').trim() : 'Nome do Autor';
				},
				renderHTML: (attrs) => ({ 'data-texto': attrs.texto }),
			},
			foto: {
				default: 'Quem tirou a foto',
				parseHTML: (el) => {
					const span = Array.from(el.querySelectorAll('span')).find(
						(s) =>
							s.textContent?.toLowerCase().includes('foto') ||
							s.textContent?.toLowerCase().includes('mídia'),
					);
					return span ? span.textContent?.replace(/^.*?:(\s*)?/i, '').trim() : 'Quem tirou a foto';
				},
			},
			coordenadoria: {
				default: 'Ascom',
				parseHTML: (el) => {
					const spans = Array.from(el.querySelectorAll('span'));
					for (const span of spans) {
						const text = span.textContent?.toLowerCase() || '';
						const matched = COORDENADORIAS_FONTE.find((c) => text.includes(c.toLowerCase()));
						if (matched) return matched;
					}
					return 'Ascom';
				},
				renderHTML: (attrs) => ({ 'data-coordenadoria': attrs.coordenadoria }),
			},
			paragrafo: {
				default: [],
				parseHTML: (el) => Array.from(el.querySelectorAll('p')).map((p) => p.innerHTML.trim()),
			},
			rawContent: {
				default: null,
				parseHTML: (el) => el.innerHTML.trim() || null,
				renderHTML: (attrs) => ({ 'data-raw-content': attrs.rawContent }),
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'blockquote',
				getAttrs: (el) => {
					const text = el.textContent?.trim() || '';

					// detecta se o bloco veio "colado" (sem <p>)
					if (
						(/Fonte.*Texto:.*Fotos:.*(Secom|Ascom).*Rondônia/i.test(text) ||
							/Fonte.*Texto:.*Fotos:./i.test(text)) &&
						!el.querySelector('p')
					) {
						// cria quebras artificiais entre as seções
						const partes = text
							.replace(/\s+/g, ' ')
							.replace(/Fonte\s*/i, 'Fonte\n')
							.replace(/(Texto:)/i, '\n$1 ')
							.replace(/(Fotos:)/i, '\n$1 ')
							.replace(/(Secom|Ascom)/i, '\n$1');

						const linhas = partes
							.split('\n')
							.filter(Boolean)
							.map((l) => l.trim());

						const novo_html = linhas
							.map((linha) => {
								if (/^Fonte/i.test(linha)) return `<p class="font-extrabold block">${linha}</p>`;
								if (/^Texto:/i.test(linha))
									return `<p><strong class="font-bold">Texto: </strong>${linha.replace(/^Texto:\s*/i, '')}</p>`;
								if (/^Fotos:/i.test(linha))
									return `<p><strong class="font-bold">Fotos: </strong>${linha.replace(/^Fotos:\s*/i, '')}</p>`;
								if (/(Secom|Ascom)/i.test(linha)) return `<p>${linha}</p>`;
								return `<p>${linha}</p>`;
							})
							.join('');
						el.innerHTML = novo_html;
					}

					return null;
				},
			},
			{ tag: 'fonte' },
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ['blockquote', mergeAttributes(HTMLAttributes), 0];
	},

	addNodeView() {
		return ReactNodeViewRenderer(FonteComponent);
	},

	addCommands() {
		return {
			setFonteComponent:
				() =>
				({ state, dispatch }) => {
					const node = state.schema.nodes.fonte.create({}, [
						state.schema.nodes.paragraph.create({}, state.schema.text('Fonte')),
						state.schema.nodes.paragraph.create({}, [
							state.schema.text('Texto: ', [state.schema.marks.bold.create()]),
							state.schema.text('Nome do Autor'),
						]),
						state.schema.nodes.paragraph.create({}, [
							state.schema.text('Fotos: ', [state.schema.marks.bold.create()]),
							state.schema.text('Quem tirou a foto'),
						]),
						state.schema.nodes.paragraph.create(
							{},
							state.schema.text('Ascom - Governo de Rondônia'),
						),
					]);

					const tr = state.tr.replaceSelectionWith(node);

					if (dispatch) {
						dispatch(tr);
					}

					return true;
				},
		};
	},
});
