import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

interface CertificateResponse {
	id: string;
	title: string;
	url: string;
}

function formatTitle(fileName: string) {
	return fileName
		.replace(/\.pdf$/i, '')
		.replace(/[-_]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

export async function GET() {
	try {
		const directory = path.join(process.cwd(), 'public', 'certificados');

		const files = await fs.readdir(directory);

		const certificates: CertificateResponse[] = files
			.filter((file) => file.toLowerCase().endsWith('.pdf'))
			.sort((a, b) => a.localeCompare(b))
			.map((file) => ({
				id: file,
				title: formatTitle(file),
				url: `/certificados/${encodeURIComponent(file)}`,
			}));

		return NextResponse.json(certificates);
	} catch (error) {
		console.error('Erro ao carregar certificados:', error);

		return NextResponse.json(
			{
				error: 'Não foi possível carregar os certificados.',
			},
			{
				status: 500,
			},
		);
	}
}
