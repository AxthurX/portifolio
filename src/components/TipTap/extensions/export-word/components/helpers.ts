import { AlignmentType, ExternalHyperlink, TextRun } from 'docx';
import type { Alignment, ParsedRun, TextRunProps } from './types';

export function getAlign(el: HTMLElement): Alignment | undefined {
	const a: string | null = el.style.textAlign || el.getAttribute('align');
	if (a === 'center') return AlignmentType.CENTER;
	if (a === 'right') return AlignmentType.RIGHT;
	if (a === 'justify') return AlignmentType.JUSTIFIED;
	return undefined;
}

export function applyInlineStyle(run: ParsedRun, el: HTMLElement): ParsedRun {
	const style = el.style;
	if (
		style.fontWeight === 'bold' ||
		el.tagName === 'STRONG' ||
		el.tagName === 'B'
	)
		run.bold = true;
	if (style.fontStyle === 'italic' || el.tagName === 'EM' || el.tagName === 'I')
		run.italics = true;
	if (style.textDecoration?.includes('underline') || el.tagName === 'U')
		run.underline = {};
	if (style.textDecoration?.includes('line-through') || el.tagName === 'S')
		run.strike = true;
	if (el.tagName === 'CODE') run.font = 'Courier New';
	if (style.color) run.color = parseColorToHex(style.color);
	if (style.fontSize)
		run.size = Math.round(Number.parseFloat(style.fontSize) * 2);
	return run;
}

export function parseColorToHex(color: string): string {
	if (!color) return '';

	if (color.startsWith('#')) {
		return color.replace('#', '').toUpperCase();
	}

	const rgb_match = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
	if (rgb_match) {
		const r = Number.parseInt(rgb_match[1], 10).toString(16).padStart(2, '0');
		const g = Number.parseInt(rgb_match[2], 10).toString(16).padStart(2, '0');
		const b = Number.parseInt(rgb_match[3], 10).toString(16).padStart(2, '0');
		return `${r}${g}${b}`.toUpperCase();
	}

	return color.replace('#', '').toUpperCase();
}

export async function fetchImage(src: string): Promise<Uint8Array | null> {
	try {
		const url = src.startsWith('http')
			? src
			: `${window.location.origin}${src}`;
		const res = await fetch(url);
		if (!res.ok) return null;
		return new Uint8Array(await res.arrayBuffer());
	} catch {
		return null;
	}
}

export function imgType(src: string): 'png' | 'jpg' | 'gif' | 'bmp' {
	const ext = src.split('.').pop()?.toLowerCase();
	if (ext === 'jpg' || ext === 'jpeg') return 'jpg';
	if (ext === 'gif') return 'gif';
	if (ext === 'bmp') return 'bmp';
	return 'png';
}

export function extractRuns(
	node: Node,
	inherited: ParsedRun = {},
): ParsedRun[] {
	const runs: ParsedRun[] = [];

	if (node.nodeType === Node.TEXT_NODE) {
		const text = node.textContent ?? '';
		if (text) runs.push({ text, ...inherited });
		return runs;
	}

	if (node.nodeType !== Node.ELEMENT_NODE) return runs;

	const el = node as HTMLElement;
	const tag = el.tagName;

	if (['SCRIPT', 'STYLE', 'SVG', 'CANVAS'].includes(tag)) return runs;

	if (tag === 'BR') {
		runs.push({ break: 1 });
		return runs;
	}

	const props = applyInlineStyle({ ...inherited }, el);

	if (tag === 'A') {
		const href = el.getAttribute('href') ?? '';
		const link_runs = Array.from(el.childNodes).flatMap((c) =>
			extractRuns(c, { ...props, color: '1155CC', underline: {} }),
		);
		if (link_runs.length && href) {
			runs.push({ _link: href, children: link_runs });
		} else {
			runs.push(...link_runs);
		}
		return runs;
	}

	for (const child of Array.from(el.childNodes)) {
		runs.push(...extractRuns(child, props));
	}

	return runs;
}

export function runsToDocx(
	rawRuns: ParsedRun[],
): (TextRun | ExternalHyperlink)[] {
	return rawRuns.map((r) => {
		if (r._link && r.children) {
			return new ExternalHyperlink({
				link: r._link,
				children: r.children.map((c) => new TextRun(c as TextRunProps)),
			});
		}
		if (r.break) return new TextRun({ break: 1 });
		return new TextRun(r as TextRunProps);
	});
}
