import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { theme } = body;

		console.log('Theme received:', theme);

		(await cookies()).set('theme', theme);

		return NextResponse.json(theme);
	} catch (error) {
		console.log('Error:', error);
		return NextResponse.json({ error: 'Não foi possível mudar o tema.' });
	}
}
