import { Extension } from '@tiptap/core';
import { Alert } from '@/lib/utils';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		print: {
			print: () => ReturnType;
		};
	}
}

export const Print = Extension.create({
	name: 'print',

	addOptions() {
		return {
			...this.parent?.(),
		};
	},

	addCommands() {
		return {
			print:
				() =>
				({ view }) => {
					const dom = view.dom.closest('.tiptap-editor');
					if (!dom) return false;

					try {
						const styles: string = Array.from(document.querySelectorAll('style, link'))
							.map((style) => style.outerHTML)
							.join('');

						const content = `${styles}${dom.outerHTML}`;

						const iframe: HTMLIFrameElement = document.createElement('iframe');
						iframe.id = 'tiptap-iframe';
						iframe.style.position = 'absolute';
						iframe.style.width = '0';
						iframe.style.height = '0';
						iframe.style.top = '-10px';
						iframe.style.left = '-10px';
						document.body.appendChild(iframe);

						const { contentWindow } = iframe;

						const doc = contentWindow?.document;

						if (doc) {
							doc.open();
							doc.write(content);
							doc.close();
						}

						if (contentWindow) {
							iframe.onload = () => {
								try {
									setTimeout(() => {
										contentWindow.focus();
										try {
											if (!contentWindow.document.execCommand('print', false)) {
												contentWindow.print();
											}
										} catch (e) {
											contentWindow.print();
											console.error(e);
										}

										contentWindow.close();
									}, 10);
								} catch (err) {
									Alert('Erro', `Erro: ${err}`, 'destructive');
								}

								setTimeout(() => {
									document.body.removeChild(iframe);
								}, 100);
							};
						}

						return true;
					} catch (err) {
						Alert('Erro', `Erro: ${err}`, 'destructive');
					}
					return false;
				},
		};
	},

	addKeyboardShortcuts() {
		return {
			'Mod-p': () => this.editor.commands.print(),
		};
	},
});
