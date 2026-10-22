import { useId } from 'react';
import {
	ENAMELS,
	type EnamelKey,
	type IconKey,
	METALS,
	type MetalKey,
	PIN_ASPECT,
	PIN_CAPTION_RATIO,
	PIN_ICONS,
	PIN_MARGIN_RATIO,
	type PinShape,
} from './pins';
import { cn } from './utils';

type ShapeProps = {
	shape: PinShape;
	fill: string;
	stroke?: string;
	strokeWidth?: number;
};

const ShapeBase = ({ shape, fill, stroke, strokeWidth = 1 }: ShapeProps) => {
	const common = { fill, stroke, strokeWidth };

	switch (shape) {
		case 'hex':
			return <path d='M50 3 L91 26.5 V73.5 L50 97 L9 73.5 V26.5 Z' {...common} />;
		case 'shield':
			return (
				<path
					d='M50 4 C70 9 86 13 90 20 C90 46 79 74 50 96 C21 74 10 46 10 20 C14 13 30 9 50 4 Z'
					{...common}
				/>
			);
		case 'squircle':
			return <rect x='5' y='5' width='90' height='90' rx='24' {...common} />;
		default:
			return <circle cx='50' cy='50' r='46' {...common} />;
	}
};

export interface PinArtProps {
	/** miniatura do certificado — quando presente, o pin vira uma foto emoldurada */
	image?: string;
	imageSrcSet?: string;
	/** dica de largura para o navegador escolher a miniatura certa */
	sizes?: string;
	/** carrega a imagem na hora (usado nos pins já visíveis no quadro) */
	priority?: boolean;
	/** título escrito na faixa de baixo, no estilo polaroid */
	label?: string;
	icon?: IconKey;
	shape?: PinShape;
	enamel?: EnamelKey;
	metal?: MetalKey;
	/** largura do pin, em px */
	size?: number;
	selected?: boolean;
	className?: string;
}

export const PinArt = ({
	image,
	imageSrcSet,
	sizes,
	priority = false,
	label,
	icon,
	shape = 'round',
	enamel = 'cream',
	metal = 'gold',
	size = 290,
	selected = false,
	className,
}: PinArtProps) => {
	const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

	const metal_recipe = METALS[metal];
	const altura_letra = Math.round(size / PIN_ASPECT);

	if (image) {
		const margem = Math.round(size * PIN_MARGIN_RATIO);
		const legenda = Boolean(label);
		const altura_legenda = legenda ? Math.max(20, Math.round(size * PIN_CAPTION_RATIO)) : 0;
		const altura = legenda ? margem + altura_letra + altura_legenda : altura_letra;
		const letra = Math.max(8, Math.round(size * 0.072));

		return (
			<div
				className={cn('relative select-none', className)}
				style={{ width: size, height: altura }}
				aria-hidden='true'
			>
				{/* cartão de papel (polaroid) com a foto do certificado */}
				<div className='absolute inset-0 overflow-hidden rounded-sm bg-[hsl(42_32%_96%)]'>
					{/*
					 * <img> puro de propósito: as miniaturas já são WebP otimizadas,
					 * servidas com cache imutável pelo next.config — sem passar pelo
					 * otimizador de imagens do Next.
					 *
					 * `draggable={false}` + `pointer-events-none`: sem isso o navegador
					 * inicia o arrasto nativo da imagem e cancela o arraste do pin.
					 */}
					{/* biome-ignore lint/performance/noImgElement: miniatura WebP já otimizada */}
					<img
						src={image}
						srcSet={imageSrcSet}
						sizes={sizes}
						width={size}
						height={altura_letra}
						alt={label}
						draggable={false}
						loading={priority ? 'eager' : 'lazy'}
						decoding='async'
						className='pointer-events-none absolute object-cover'
						style={
							legenda
								? {
										left: margem,
										top: margem,
										width: size - margem * 2,
										height: altura_letra,
									}
								: { inset: 0, width: size, height: altura_letra }
						}
					/>
					<div className='pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_hsl(38_28%_88%)]' />
					<div className='pointer-events-none absolute inset-0 bg-[linear-gradient(128deg,hsl(0_0%_100%/0.22),transparent_42%,hsl(0_0%_0%/0.1))]' />
				</div>

				{legenda && (
					<div
						className='pointer-events-none absolute flex items-center justify-center px-[9%] text-center'
						style={{ top: margem + altura_letra, height: altura_legenda }}
					>
						<p
							className='line-clamp-2 font-serif text-[hsl(28_28%_26%)] italic leading-[1.15]'
							style={{ fontSize: letra }}
						>
							{label}
						</p>
					</div>
				)}

				{/* tarugador metálico segurando a foto */}
				<svg
					viewBox='0 0 100 100'
					aria-hidden='true'
					className='pointer-events-none absolute top-[-5%] left-1/2 h-[14%] w-[14%] -translate-x-1/2 overflow-visible'
				>
					<title>Tarugador</title>
					<defs>
						<radialGradient id={`tack-${uid}`} cx='34%' cy='26%' r='82%'>
							<stop offset='0%' stopColor={metal_recipe.light} />
							<stop offset='52%' stopColor={metal_recipe.mid} />
							<stop offset='100%' stopColor={metal_recipe.dark} />
						</radialGradient>
					</defs>
					<ellipse cx='50' cy='92' rx='24' ry='6' fill='hsl(20 45% 5% / 0.32)' />
					<circle
						cx='50'
						cy='50'
						r='42'
						fill={`url(#tack-${uid})`}
						stroke={metal_recipe.dark}
						strokeWidth='4'
					/>
					<ellipse
						cx='37'
						cy='34'
						rx='12'
						ry='7'
						fill='hsl(0 0% 100% / 0.55)'
						transform='rotate(-28 37 34)'
					/>
				</svg>

				{selected && (
					<span className='pointer-events-none absolute -inset-1 rounded-base border-2 border-[hsl(45_66%_78%)] border-dashed' />
				)}
			</div>
		);
	}

	const Icon = PIN_ICONS[icon ?? 'star'];
	const enamel_recipe = ENAMELS[enamel];

	const metal_gradient = `metal-${uid}`;
	const enamel_gradient = `enamel-${uid}`;
	const gloss_gradient = `gloss-${uid}`;
	const clip = `clip-${uid}`;

	return (
		<div
			className={cn('relative select-none', className)}
			style={{ width: size, height: size }}
			aria-hidden='true'
		>
			<svg viewBox='0 0 100 100' width={size} height={size} className='block overflow-visible'>
				<title>Pin</title>
				<defs>
					<linearGradient id={metal_gradient} x1='0' y1='0' x2='1' y2='1'>
						<stop offset='0%' stopColor={metal_recipe.light} />
						<stop offset='34%' stopColor={metal_recipe.mid} />
						<stop offset='52%' stopColor={metal_recipe.light} />
						<stop offset='78%' stopColor={metal_recipe.mid} />
						<stop offset='100%' stopColor={metal_recipe.dark} />
					</linearGradient>
					<radialGradient id={enamel_gradient} cx='34%' cy='24%' r='86%'>
						<stop offset='0%' stopColor={enamel_recipe.light} />
						<stop offset='52%' stopColor={enamel_recipe.base} />
						<stop offset='100%' stopColor={enamel_recipe.dark} />
					</radialGradient>
					<linearGradient id={gloss_gradient} x1='0' y1='0' x2='0.4' y2='1'>
						<stop offset='0%' stopColor='hsl(0 0% 100%)' stopOpacity='0.5' />
						<stop offset='55%' stopColor='hsl(0 0% 100%)' stopOpacity='0.08' />
						<stop offset='100%' stopColor='hsl(0 0% 100%)' stopOpacity='0' />
					</linearGradient>
					<clipPath id={clip}>
						<g transform='translate(50 50) scale(0.83) translate(-50 -50)'>
							<ShapeBase shape={shape} fill='#000' />
						</g>
					</clipPath>
				</defs>

				{/* aro metálico */}
				<ShapeBase
					shape={shape}
					fill={`url(#${metal_gradient})`}
					stroke={metal_recipe.dark}
					strokeWidth={1.1}
				/>

				{/* esmalte */}
				<g transform='translate(50 50) scale(0.83) translate(-50 -50)'>
					<ShapeBase
						shape={shape}
						fill={`url(#${enamel_gradient})`}
						stroke={enamel_recipe.dark}
						strokeWidth={1.4}
					/>
				</g>

				{/* brilho do esmalte */}
				<g clipPath={`url(#${clip})`}>
					<ellipse
						cx='36'
						cy='26'
						rx='30'
						ry='16'
						fill={`url(#${gloss_gradient})`}
						transform='rotate(-26 36 26)'
					/>
					<ellipse
						cx='68'
						cy='78'
						rx='24'
						ry='12'
						fill='hsl(0 0% 0%)'
						opacity='0.14'
						transform='rotate(-22 68 78)'
					/>
				</g>

				{/* motivo gravado */}
				<Icon
					x={27}
					y={27}
					width={46}
					height={46}
					strokeWidth={1.65}
					strokeLinecap='round'
					strokeLinejoin='round'
					color={enamel_recipe.line}
					opacity={0.92}
				/>

				{selected && (
					<circle
						cx='50'
						cy='50'
						r='48.5'
						fill='none'
						stroke='hsl(45 66% 78%)'
						strokeWidth='1.4'
						strokeDasharray='3.5 4.5'
						opacity='0.95'
					/>
				)}
			</svg>
		</div>
	);
};
