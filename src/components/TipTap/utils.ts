import type { ShortcutKeyResult } from './interfaces/types';

export type FileError = {
	file: File | string;
	reason: 'type' | 'size' | 'invalidBase64' | 'base64NotAllowed';
};

export type FileValidationOptions = {
	allowedMimeTypes: string[];
	maxFileSize?: number;
	allowBase64: boolean;
};

type FileInput = File | { src: string | File; alt?: string; title?: string };

export const safeParse = (val: unknown): number => {
	const n = Number(val);
	return Number.isFinite(n) ? n : 0;
};

export function randomID(tamanho = 12): string {
	const CARACTERES =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	return Array.from({ length: tamanho }, () => {
		const index = Math.floor(Math.random() * CARACTERES.length);
		return CARACTERES.charAt(index);
	}).join('');
}

export const isClient = (): boolean => typeof window !== 'undefined';
export const isMacOS = (): boolean =>
	isClient() && window.navigator.platform === 'MacIntel';

const shortcut: Record<string, ShortcutKeyResult> = {
	mod: isMacOS()
		? { symbol: '⌘', readable: 'Command' }
		: { symbol: 'Ctrl', readable: 'Control' },
	alt: isMacOS()
		? { symbol: '⌥', readable: 'Option' }
		: { symbol: 'Alt', readable: 'Alt' },
	shift: { symbol: '⇧', readable: 'Shift' },
};

export const getShortcutKey = (key: string): ShortcutKeyResult =>
	shortcut[key.toLowerCase()] || { symbol: key, readable: key };

export const getShortcutKeys = (keys: string[]): ShortcutKeyResult[] =>
	keys.map(getShortcutKey);

export const isUrl = (
	text: string,
	options: { requireHostname: boolean; allowBase64?: boolean } = {
		requireHostname: false,
	},
): boolean => {
	if (text.includes('\n')) return false;

	try {
		const url = new URL(text);
		const blockedProtocols = [
			'javascript:',
			'file:',
			'vbscript:',
			...(options.allowBase64 ? [] : ['data:']),
		];

		if (blockedProtocols.includes(url.protocol)) return false;
		if (options.allowBase64 && url.protocol === 'data:')
			return /^data:image\/[a-z]+;base64,/.test(text);
		if (url.hostname) return true;

		return (
			url.protocol !== '' &&
			(url.pathname.startsWith('//') || url.pathname.startsWith('http')) &&
			!options.requireHostname
		);
	} catch {
		return false;
	}
};

export const sanitizeUrl = (
	url: string | null | undefined,
	options: { allowBase64?: boolean } = {},
): string | undefined => {
	if (!url) return undefined;

	if (options.allowBase64 && url.startsWith('data:image')) {
		return isUrl(url, { requireHostname: false, allowBase64: true })
			? url
			: undefined;
	}

	return isUrl(url, {
		requireHostname: false,
		allowBase64: options.allowBase64,
	}) || /^(\/|#|mailto:|sms:|fax:|tel:)/.test(url)
		? url
		: `https://${url}`;
};

export const blobUrlToBase64 = async (blobUrl: string): Promise<string> => {
	const response = await fetch(blobUrl);
	const blob = await response.blob();

	return fileToBase64(blob);
};

export const fileToBase64 = (file: File | Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			typeof reader.result === 'string'
				? resolve(reader.result)
				: reject(new Error('Falha ao converter o arquivo em base64'));
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};

const validateFileOrBase64 = <T extends FileInput>(
	input: File | string,
	options: FileValidationOptions,
	originalFile: T,
	validFiles: T[],
	errors: FileError[],
): void => {
	const { isValidType, isValidSize } = checkTypeAndSize(input, options);
	isValidType && isValidSize
		? validFiles.push(originalFile)
		: errors.push({ file: input, reason: isValidType ? 'size' : 'type' });
};

const checkTypeAndSize = (
	input: File | string,
	{ allowedMimeTypes, maxFileSize }: FileValidationOptions,
): { isValidType: boolean; isValidSize: boolean } => {
	const mime_type = input instanceof File ? input.type : base64MimeType(input);
	const size =
		input instanceof File ? input.size : atob(input.split(',')[1]).length;

	return {
		isValidType:
			allowedMimeTypes.length === 0 ||
			allowedMimeTypes.includes(mime_type) ||
			allowedMimeTypes.includes(`${mime_type.split('/')[0]}/*`),
		isValidSize: !maxFileSize || size <= maxFileSize,
	};
};

const base64MimeType = (encoded: string): string => {
	const result = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,/.exec(encoded);
	return result ? result[1] : 'unknown';
};

const isBase64 = (str: string): boolean => {
	const matches = str.startsWith('data:')
		? /^data:[^;]+;base64,(.+)$/.exec(str)
		: null;

	const data = matches ? matches[1] : str;

	try {
		return btoa(atob(data)) === data;
	} catch {
		return false;
	}
};

export const filterFiles = <T extends FileInput>(
	files: T[],
	options: FileValidationOptions,
): [T[], FileError[]] => {
	const valid_files: T[] = [];
	const errors: FileError[] = [];

	for (const file of files) {
		const actual_file = 'src' in file ? file.src : file;

		if (actual_file instanceof File) {
			validateFileOrBase64(actual_file, options, file, valid_files, errors);
		} else if (typeof actual_file === 'string') {
			if (isBase64(actual_file)) {
				if (options.allowBase64) {
					validateFileOrBase64(actual_file, options, file, valid_files, errors);
				} else {
					errors.push({ file: actual_file, reason: 'base64NotAllowed' });
				}
			} else {
				if (!sanitizeUrl(actual_file, { allowBase64: options.allowBase64 })) {
					errors.push({ file: actual_file, reason: 'invalidBase64' });
				} else {
					valid_files.push(file);
				}
			}
		}
	}

	return [valid_files, errors];
};

export function imageUrlAllowed(image: string) {
	const allowed_urls = [
		{ protocol: 'http:', hostname: 'sedam-cloud.sedam.ro.gov.br' },
		{ protocol: 'https:', hostname: 'sedam-cloud.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: '172.16.6.162' },
		{ protocol: 'https:', hostname: '172.16.6.162' },
		{ protocol: 'https:', hostname: 'www.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'www.sedam.ro.gov.br' },
		{ protocol: 'https:', hostname: '*.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: '*.sedam.ro.gov.br' },
		{ protocol: 'https:', hostname: 'cogeo.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'cogeo.sedam.ro.gov.br' },
		{ protocol: 'https:', hostname: 'coreh.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'coreh.sedam.ro.gov.br' },
		{ protocol: 'https:', hostname: 'rondonia.ro.gov.br' },
		{ protocol: 'http:', hostname: 'rondonia.ro.gov.br' },
		{ protocol: 'https:', hostname: 'data.portal.sistemas.ro.gov.br' },
		{ protocol: 'http:', hostname: 'data.portal.sistemas.ro.gov.br' },
		{ protocol: 'https:', hostname: 'picsum.photos' },
		{ protocol: 'http:', hostname: 'cuc.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'educacaoambiental.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'codef.sedam.ro.gov.br' },
		{ protocol: 'http:', hostname: 'ciearo.ro.gov.br' },
		{ protocol: 'https:', hostname: 'ciearo.ro.gov.br' },
		{ protocol: 'http:', hostname: 'copam.sedam.ro.gov.br' },
	];

	try {
		const image_url = new URL(image);

		return allowed_urls.some((allowed) => {
			if (allowed.protocol !== image_url.protocol) return false;

			// se tem curinga (*.dominio.com)
			if (allowed.hostname.startsWith('*.')) {
				const base = allowed.hostname.slice(2); // remove *.
				return (
					image_url.hostname === base || image_url.hostname.endsWith(`.${base}`)
				);
			}

			return image_url.hostname === allowed.hostname;
		});
	} catch (error) {
		console.log(error);
		return false;
	}
}

export const sanitizeStyle = (html: string): string => {
	return html.replace(
		/webkitTransitionTimingFunction:/gi,
		'WebkitTransitionTimingFunction:',
	);
};
