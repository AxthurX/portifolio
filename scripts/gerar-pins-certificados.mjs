/**
 * Gera os pins (miniaturas) dos certificados e o arquivo de dados usado pelo quadro.
 *
 *   pnpm assets:pins
 *
 * Entradas:  public/certificados/*.png  +  scripts/certificados.json (metadados)
 * Saídas:    public/pins/*.webp          +  src/lib/certificados.data.ts
 *
 * As miniaturas são WebP (~10–25 kB) no mesmo aspecto do quadro do pin, para que
 * a página nunca precise baixar os PNGs originais (300–600 kB cada).
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR_CERTIFICADOS = path.join(RAIZ, 'public', 'certificados');
const DIR_PINS = path.join(RAIZ, 'public', 'pins');
const ARQUIVO_METADADOS = path.join(RAIZ, 'scripts', 'certificados.json');
const ARQUIVO_DADOS = path.join(RAIZ, 'src', 'lib', 'certificados.data.ts');

/** Proporção do quadro do pin (√2, o mesmo do papel A4 deitado). */
const ASPECTO = Math.SQRT2;
const LARGURA = 320;
const ALTURA = Math.round(LARGURA / ASPECTO);

/**
 * Recorte de interesse de cada família de certificado (fração da imagem).
 * A caixa é expandida depois até atingir o ASPECTO, sem distorcer.
 */
const RECORTES = {
	alura: { x0: 0.03, y0: 0.03, x1: 0.62, y1: 0.52 },
	coursera: { x0: 0.03, y0: 0.04, x1: 0.6, y1: 0.46 },
	prime: { x0: 0.26, y0: 0.05, x1: 0.92, y1: 0.45 },
	sapiens: { x0: 0.05, y0: 0.03, x1: 0.95, y1: 0.42 },
	senai: { x0: 0.2, y0: 0.22, x1: 0.8, y1: 0.46 },
	udemy: { x0: 0.03, y0: 0.05, x1: 0.97, y1: 0.45 },
};

const semAcento = (texto) =>
	texto
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[ç]/g, 'c');

const slug = (texto) =>
	semAcento(texto)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const limitar = (texto, max) => (texto.length <= max ? texto : `${texto.slice(0, max).trimEnd()}-`);

/** Expande a caixa de interesse até o aspecto do quadro, mantendo o centro. */
const caixa = (recorte, largura, altura) => {
	const cx = ((recorte.x0 + recorte.x1) / 2) * largura;
	const cy = ((recorte.y0 + recorte.y1) / 2) * altura;
	let w = (recorte.x1 - recorte.x0) * largura;
	let h = (recorte.y1 - recorte.y0) * altura;

	// ajusta para o aspecto do quadro
	if (w / h > ASPECTO) h = w / ASPECTO;
	else w = h * ASPECTO;

	// nunca maior que a imagem
	if (w > largura) {
		w = largura;
		h = w / ASPECTO;
	}
	if (h > altura) {
		h = altura;
		w = h * ASPECTO;
	}

	const left = Math.max(0, Math.min(largura - Math.round(w), Math.round(cx - w / 2)));
	const top = Math.max(0, Math.min(altura - Math.round(h), Math.round(cy - h / 2)));

	return {
		left,
		top,
		width: Math.round(w),
		height: Math.round(h),
	};
};

const nota = (meta) =>
	meta.familia === 'sapiens'
		? `Participação no ${meta.titulo}, em ${meta.data}.`
		: `Conclusão de "${meta.titulo}" pela ${meta.emissor}, em ${meta.data}.`;

async function principal() {
	const metadados = JSON.parse(await readFile(ARQUIVO_METADADOS, 'utf8'));
	const arquivos = (await readdir(DIR_CERTIFICADOS)).filter((f) =>
		f.toLowerCase().endsWith('.png'),
	);

	await rm(DIR_PINS, { recursive: true, force: true });
	await mkdir(DIR_PINS, { recursive: true });

	const usados = new Set();
	const registros = [];
	const faltando = [];

	for (const arquivo of arquivos) {
		const meta = metadados[arquivo];
		if (!meta) {
			faltando.push(arquivo);
			continue;
		}

		let id = `${meta.familia}-${slug(meta.titulo)}`;
		id = limitar(id, 60);
		while (usados.has(id)) id = `${id}-2`;
		usados.add(id);

		const origem = path.join(DIR_CERTIFICADOS, arquivo);
		const imagem = sharp(origem);
		const { width, height } = await imagem.metadata();
		const recorte = caixa(meta.recorte ?? RECORTES[meta.familia] ?? RECORTES.alura, width, height);

		const base = path.join(DIR_PINS, id);
		await sharp(origem)
			.extract(recorte)
			.resize(LARGURA, ALTURA, { fit: 'fill' })
			.webp({ quality: 72, effort: 5 })
			.toFile(`${base}-320.webp`);

		await sharp(origem)
			.extract(recorte)
			.resize(LARGURA / 2, ALTURA / 2, { fit: 'fill' })
			.webp({ quality: 70, effort: 5 })
			.toFile(`${base}-160.webp`);

		registros.push({
			id,
			titulo: meta.titulo,
			emissor: meta.emissor,
			data: meta.data,
			ano: meta.ano,
			nota: nota(meta),
			imagem: `/pins/${id}-320.webp`,
			imagemSrcSet: `/pins/${id}-160.webp 160w, /pins/${id}-320.webp 320w`,
			original: `/certificados/${encodeURIComponent(arquivo)}`,
		});
	}

	registros.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));

	const corpo = `/**
 * Dados dos certificados que viram pins no quadro.
 *
 * Arquivo gerado por \`pnpm assets:pins\` — não editar à mão.
 * As miniaturas em \`public/pins\` são WebP leves; o PNG original só é
 * baixado quando o visitante abre o certificado completo.
 */
export interface CertificadoPin {
\tid: string;
\ttitulo: string;
\temissor: string;
\tdata: string;
\tano: number;
\tnota: string;
\t/** miniatura leve usada no quadro */
\timagem: string;
\t/** conjunto responsivo da miniatura */
\timagemSrcSet: string;
\t/** certificado original em PDF/PNG (abre em nova aba) */
\toriginal: string;
}

export const CERTIFICADOS: CertificadoPin[] = ${JSON.stringify(registros, null, '\t').replace(/\n/g, '\n')};
`;

	await writeFile(ARQUIVO_DADOS, corpo, 'utf8');

	console.log(`✓ ${registros.length} pins gerados em public/pins`);
	console.log(`✓ dados escritos em ${path.relative(RAIZ, ARQUIVO_DADOS)}`);
	if (faltando.length) {
		console.warn('\n⚠ sem metadados em scripts/certificados.json:');
		for (const arquivo of faltando) console.warn(`  - ${arquivo}`);
	}
}

principal().catch((erro) => {
	console.error(erro);
	process.exit(1);
});
