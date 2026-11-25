import type { Editor } from '@tiptap/core';
import type { ExportPdfOptions } from '../extensions/export-pdf';

function printHtml(content: string, exportPdfOptions: ExportPdfOptions) {
	const iframe: HTMLIFrameElement = document.createElement('iframe');
	iframe.setAttribute(
		'style',
		'position: absolute; width: 0; height: 0; top: 0; left: 0;',
	);
	document.body.appendChild(iframe);

	const doc = iframe.contentDocument || iframe.contentWindow?.document;

	if (!doc) return;

	const {
		paperSize,
		margins: {
			top: marginTop,
			right: marginRight,
			bottom: marginBottom,
			left: marginLeft,
		},
	} = exportPdfOptions;

    const stylesElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    const stylesHtml = stylesElements.map((el) => el.outerHTML).join('\n');

	const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <title>Echo Editor</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      ${stylesHtml}
      
      <style>
        .list-decimal { list-style-type: decimal; }
        .list-disc { list-style-type: disc; }
        .list-[lower-alpha] { list-style-type: lower-alpha; }
        .list-[upper-alpha] { list-style-type: upper-alpha; }
        .list-[lower-roman] { list-style-type: lower-roman; }

        @media print {
            @page {
                size: ${paperSize};
                margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft};
            }

            body {
                background: none !important;
                background-color: white !important;
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }

            /* Essa parte aqui pra baixo é pra esconder o visual de editor do Excalidraw  */
	
			[data-node-view-wrapper],
            [data-node-view-wrapper] > div,
            [data-node-view-wrapper] .render-wrapper {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
                background: transparent !important;
            }

            [data-node-view-wrapper] button {
                display: none !important;
            }

            [data-node-view-wrapper] [class*="handlerWrap"] {
                display: none !important;
            }
        }
      </style>
    </head>
    <body>
      <div class="print-container w-full max-w-full bg-white">
        ${content}
      </div>
    </body>
    </html>
  `;

	doc.open();
	doc.write(html);
	doc.close();

	iframe.addEventListener('load', () => {
		setTimeout(() => {
			try {
				iframe.contentWindow?.focus();
				iframe.contentWindow?.print();
			} catch (err) {
				console.error('Print failed', err);
			}
			setTimeout(() => {
				document.body.removeChild(iframe);
			}, 100);
		}, 50);
	});
}

export function printEditorContent(editor: Editor, options: ExportPdfOptions) {
    const content = editor.view.dom.innerHTML;

	if (content) {
		printHtml(content, options);
		return true;
	}

	return false;
}