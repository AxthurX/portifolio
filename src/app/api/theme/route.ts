import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const TEMAS = new Set(['arthur', 'black']);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const theme = typeof body?.theme === 'string' ? body.theme : '';

		if (!TEMAS.has(theme)) {
			return NextResponse.json({ error: 'Tema inválido.' }, { status: 400 });
		}

		(await cookies()).set('theme', theme);

		return NextResponse.json(theme);
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.json({ error: 'Não foi possível mudar o tema.' });
	}
}
