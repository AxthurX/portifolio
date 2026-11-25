import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from '@tiptap/react';

function RawHtml({ html }: { html: string }) {
	return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export const FonteComponent = ({ node }: NodeViewProps) => {
	const { texto, foto, coordenadoria, paragrafo, rawContent } = node.attrs;

	return (
		<NodeViewWrapper as='blockquote' className='block-node my-4'>
			{texto || foto || coordenadoria ? (
				<NodeViewContent />
			) : rawContent ? (
				<RawHtml html={rawContent} />
			) : Array.isArray(paragrafo) && paragrafo ? (
				paragrafo.map((html) => (
					<p key={html} className='mb-2'>
						<RawHtml html={html} />
					</p>
				))
			) : (
				<div>
					<p className='font-extrabold'>Fonte</p>
					<p>
						<strong className='font-bold'>Texto: </strong>
						<span>Nome do Autor</span>
					</p>
					<p>
						<strong className='font-bold'>Fotos: </strong>
						<span>Quem tirou a foto</span>
					</p>
					<p>
						<strong>Ascom - Governo de Rondônia</strong>
					</p>
				</div>
			)}
		</NodeViewWrapper>
	);
};
