export interface CertificateInfo {
	title: string;
	image: string;
	content: string;
	pages: number;
	url: string;
	fileName: string;
}

interface PdfMetadataInfo {
	Title?: string;
	[key: string]: unknown;
}

interface PdfMetadata {
	info?: PdfMetadataInfo;
}

interface PdfTextItem {
	str?: string;
}

export async function getCertificateInfo(file: File, url: string): Promise<CertificateInfo> {
	if (typeof window === 'undefined') {
		throw new Error('A leitura de certificados só pode ser executada no navegador.');
	}

	const { GlobalWorkerOptions, getDocument } = await import('pdfjs-dist');

	GlobalWorkerOptions.workerSrc = new URL(
		'pdfjs-dist/build/pdf.worker.min.mjs',
		import.meta.url,
	).toString();

	const buffer = await file.arrayBuffer();

	const pdf = await getDocument({
		data: buffer,
	}).promise;

	const pages = pdf.numPages;

	const metadata = (await pdf.getMetadata().catch(() => null)) as PdfMetadata | null;

	const page = await pdf.getPage(1);

	const viewport = page.getViewport({
		scale: 2,
	});

	const canvas = document.createElement('canvas');

	canvas.width = Math.ceil(viewport.width);
	canvas.height = Math.ceil(viewport.height);

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

	const content = text.items
		.map((item) => {
			const textItem = item as PdfTextItem;

			return textItem.str ?? '';
		})
		.join(' ');

	const title =
		metadata?.info?.Title ||
		content.match(/Curso de\s+(.+?)(?:\n|\.|,|totalizando)/i)?.[1] ||
		file.name.replace(/\.pdf$/i, '');

	return {
		title: title.trim(),
		image,
		content,
		pages,
		url,
		fileName: file.name,
	};
}

export async function loadCertificates(): Promise<CertificateInfo[]> {
	if (typeof window === 'undefined') {
		return [];
	}

	const response = await fetch('/api/certificados');

	if (!response.ok) {
		throw new Error('Erro ao listar certificados');
	}

	const files = (await response.json()) as Array<{
		name: string;
		url: string;
	}>;

	return Promise.all(
		files.map(async ({ name, url }) => {
			const pdfResponse = await fetch(url);

			if (!pdfResponse.ok) {
				throw new Error(`Erro ao carregar ${url}`);
			}

			const type = pdfResponse.headers.get('content-type');

			if (!type?.toLowerCase().includes('pdf')) {
				throw new Error(`${url} não é um PDF (${type ?? 'tipo desconhecido'})`);
			}

			const blob = await pdfResponse.blob();

			const file = new File([blob], name, {
				type: 'application/pdf',
			});

			return getCertificateInfo(file, url);
		}),
	);
}
