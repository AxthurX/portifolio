import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

export interface CertificateInfo {
	title: string;
	image: string;
	content: string;
	pages: number;
	url: string;
	fileName: string;
}

export async function getCertificateInfo(file: File, url: string): Promise<CertificateInfo> {
	const buffer = await file.arrayBuffer();

	const pdf = await getDocument({
		data: buffer,
	}).promise;

	const metadata = await pdf.getMetadata().catch(() => null);

	const info = metadata?.info as Record<string, any> | undefined;

	const page = await pdf.getPage(1);

	const viewport = page.getViewport({
		scale: 2,
	});

	const canvas = document.createElement('canvas');

	canvas.width = viewport.width;
	canvas.height = viewport.height;

	const context = canvas.getContext('2d');

	if (!context) {
		throw new Error('Não foi possível criar o contexto do canvas.');
	}

	await page.render({
		canvas,
		canvasContext: context,
		viewport,
	}).promise;

	const image = canvas.toDataURL('image/png');

	const text = await page.getTextContent();

	const content = text.items.map((item) => ('str' in item ? item.str : '')).join(' ');

	const title =
		info?.Title ||
		content.match(/Curso de\s+(.+?)(?:\n|\.|,|totalizando)/i)?.[0] ||
		file.name.replace(/\.pdf$/i, '');

	return {
		title,
		image,
		content,
		pages: pdf.numPages,
		url,
		fileName: file.name,
	};
}

export async function loadCertificates(): Promise<CertificateInfo[]> {
	const response = await fetch('/api/certificados');

	if (!response.ok) {
		throw new Error('Erro ao listar certificados');
	}

	const files: {
		name: string;
		url: string;
	}[] = await response.json();

	return Promise.all(
		files.map(async ({ name, url }) => {
			const pdfResponse = await fetch(url);

			console.log({
				url,
				status: pdfResponse.status,
				type: pdfResponse.headers.get('content-type'),
			});

			if (!pdfResponse.ok) {
				throw new Error(`Erro ao carregar ${url}`);
			}

			const type = pdfResponse.headers.get('content-type');

			if (!type?.includes('pdf')) {
				throw new Error(`${url} não é um PDF (${type})`);
			}

			const blob = await pdfResponse.blob();

			const file = new File([blob], name, {
				type: 'application/pdf',
			});

			return getCertificateInfo(file, url);
		}),
	);
}
