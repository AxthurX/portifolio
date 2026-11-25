import type { Editor } from '@tiptap/core';

export function exportToWord(editor: Editor, filename = 'documento.doc') {
	const content = editor.getHTML();

	const header = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office'
              xmlns:w='urn:schemas-microsoft-com:office:word'
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Exportado do Echo Editor</title>
            <style>
                /* CSS básico que o Word consegue entender */
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; width: 100%; }
                td, th { border: 1px solid black; padding: 8px; }
            </style>
        </head>
        <body>
    `;
	const footer = '</body></html>';
	const source_html = header + content + footer;

	const blob = new Blob(['\ufeff', source_html], {
		type: 'application/msword',
	});

	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;

	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
