import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export async function GET() {
	const dir = path.join(process.cwd(), 'public', 'certificados');

	const files = await fs.readdir(dir);

	const pdfs = files
		.filter((file) => file.endsWith('.pdf'))
		.map((file) => ({
			name: file,
			url: `/certificados/${file}`,
		}));

	return NextResponse.json(pdfs);
}
