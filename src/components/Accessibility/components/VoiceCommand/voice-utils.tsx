let currentMatches: HTMLElement[] = [];
let currentIndex = -1;

const clean = (str: string | null | undefined) =>
	(str || '')
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\w\s]/g, '')
		.replace(/\n/g, ' ')
		.trim();

export const clickElement = {
	search: (
		textToFind: string,
		prioritySelector?: string,
		setFeedback?: (msg: string | null, persistent?: boolean) => void,
	) => {
		const target = clean(textToFind);

		const regex = new RegExp(`\\b${target}\\b`, 'gi');

		const matches: HTMLElement[] = [];

		const elements = document.querySelectorAll(
			prioritySelector ?? 'button, a, input, [role="button"]',
		);

		for (const el of elements) {
			const element = el as HTMLElement;

			if (!element.offsetWidth && !element.offsetHeight) continue;

			const content = clean(element.innerText);
			const placeholder = clean(element.getAttribute('placeholder'));

			if (
				content === target ||
				placeholder === target ||
				regex.test(content) ||
				regex.test(placeholder)
			) {
				matches.push(element);
			}
		}

		currentMatches = matches as HTMLElement[];
		currentIndex = 0;

		if (matches.length === 1) {
			const el = matches[0];
			el.focus();
			el.click();
			return true;
		}

		if (matches.length > 1) {
			setFeedback?.(
				`Múltiplas opções encontradas para: <i>"${textToFind}"</i>.<br><b>Opção ${currentIndex + 1} de ${currentMatches.length}</b>. Diga <b>Próximo</b>, <b>Anterior</b> ou <b>Confirmar</b> para navegar entre as opções encontradas.`,
				true,
			);
			focusElement(matches[0] as HTMLElement);

			return true;
		}

		return false;
	},

	next: (setFeedback?: (msg: string | null, persistent?: boolean) => void) => {
		if (!currentMatches.length) return;

		currentIndex = (currentIndex + 1) % currentMatches.length;
		focusElement(currentMatches[currentIndex]);
		setFeedback?.(
			`<b>Opção ${currentIndex + 1} de ${currentMatches.length}</b>. Diga <b>Próximo</b>, <b>Anterior</b> ou <b>Confirmar</b> para navegar entre as opções encontradas.`,
			true,
		);
	},

	previous: (setFeedback?: (msg: string | null, persistent?: boolean) => void) => {
		if (!currentMatches.length) return;

		currentIndex = (currentIndex - 1 + currentMatches.length) % currentMatches.length;
		focusElement(currentMatches[currentIndex]);
		setFeedback?.(
			`<b>Opção ${currentIndex + 1} de ${currentMatches.length}</b>. Diga <b>Próximo</b>, <b>Anterior</b> ou <b>Confirmar</b> para navegar entre as opções encontradas.`,
			true,
		);
	},

	confirm: (setFeedback?: (msg: string | null, persistent?: boolean) => void) => {
		if (currentMatches.length > 0) {
			const target = currentMatches[currentIndex];
			target.focus();
			target.click();
			currentMatches = [];
			currentIndex = -1;
			target.classList.remove(
				'outline-2',
				'outline-white',
				'border-2',
				'border-black',
				'scale-105',
			);
		} else if (
			document.activeElement instanceof HTMLInputElement ||
			document.activeElement instanceof HTMLTextAreaElement
		) {
			document.activeElement.form?.requestSubmit();
		} else {
			const target = document.activeElement as HTMLElement;
			if (target) target.click();
		}

		setFeedback?.(null);
	},
};

const focusElement = (el: HTMLElement) => {
	currentMatches.forEach((item) => {
		item.classList.remove('outline-2', 'outline-white', 'border-2', 'border-black', 'scale-105');
	});

	el.focus();
	el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	el.classList.add('outline-2', 'outline-white', 'border-2', 'border-black', 'scale-105');
};

export const fillInput = (element: HTMLInputElement | HTMLTextAreaElement, value: string) => {
	if (value !== undefined && element) {
		const native_input_value_setter = Object.getOwnPropertyDescriptor(
			window.HTMLInputElement.prototype,
			'value',
		)?.set;

		if (native_input_value_setter) {
			native_input_value_setter.call(element, value);
		} else {
			element.value = value;
		}

		element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
		element.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

		return true;
	}
	return false;
};
