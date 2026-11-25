import { Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { randomID } from '../../utils';
import {
	getEmbedUrlFromYoutubeUrl,
	isValidYoutubeUrl,
	YOUTUBE_REGEX_GLOBAL,
} from '../youtube/utils';
import { VideoComponent } from './video';

export interface VideoOptions {
	inline: boolean;
	addPasteHandler: boolean;
	HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		setVideo: {
			setVideo: (options: { src: string | File; width: number; height: number }) => ReturnType;
		};
		setVideoAlign: {
			setVideoAlign: (align: string) => ReturnType;
		};
	}
}

export const Video = Node.create<VideoOptions>({
	name: 'video',

	addOptions() {
		return {
			HTMLAttributes: {},
			inline: false,
			addPasteHandler: true,
		};
	},

	inline() {
		return this.options.inline;
	},

	group() {
		return this.options.inline ? 'inline' : 'block';
	},

	addAttributes() {
		return {
			...this.parent?.(),
			id: { default: null },
			src: { default: null },
			name: { default: null },
			className: { default: null },
			captions: { default: null },
			provider: { default: 'file' }, // file | youtube
			type: { default: 'video/mp4' },
			width: { default: 417 },
			height: { default: 235 },
			float: { default: 'none' },
			margin: { default: null },
			start: { default: 0 },
		};
	},

	parseHTML() {
		return [
			{
				tag: 'video',
				getAttrs: (element) => {
					const video = element as HTMLVideoElement;

					return {
						src: video.querySelector('source')?.getAttribute('src') ?? video.getAttribute('src'),
						className: video.getAttribute('class'),
						controls: video.hasAttribute('controls'),
						loading: video.getAttribute('loading'),
						width: Number(video.getAttribute('width') ?? 417),
						height: Number(video.getAttribute('height') ?? 235),
						provider: 'file',
					};
				},
			},
			{
				tag: 'div[data-video="youtube"] iframe',
				getAttrs: (element) => ({
					src: (element as HTMLIFrameElement).src,
					provider: 'youtube',
				}),
			},
		];
	},

	renderHTML({ node, HTMLAttributes }) {
		if (node.attrs.provider === 'youtube') {
			return [
				'div',
				{ 'data-video': 'youtube' },
				[
					'iframe',
					{
						src: node.attrs.src,
						width: node.attrs.width,
						height: node.attrs.height,
						allowfullscreen: 'true',
					},
				],
			];
		}

		return [
			'video',
			HTMLAttributes,
			['source', { src: HTMLAttributes.src, type: HTMLAttributes.type }],
		];
	},

	addCommands() {
		return {
			setVideo:
				(options: { src: string | File; width: number; height: number }) =>
				({ commands }) => {
					const { src, width = 417, height = 235 } = options;

					if (src instanceof File) {
						const id = src.name.split('-')[0];
						const name = src.name;
						const blobUrl = URL.createObjectURL(src);

						return commands.insertContent({
							type: this.name,
							attrs: {
								id,
								src: blobUrl,
								provider: 'file',
								width,
								height,
								name,
							},
						});
					} else {
						const youtube = isValidYoutubeUrl(src as string);

						return commands.insertContent({
							type: this.name,
							attrs: {
								id: randomID(12),
								src: youtube ? getEmbedUrlFromYoutubeUrl({ url: src }) : src,
								provider: youtube ? 'youtube' : 'file',
								width,
								height,
								name: src.split('?')[0],
							},
						});
					}
				},
			setVideoAlign:
				(align: string) =>
				({ commands }) => {
					if (align === 'center') {
						return commands.updateAttributes('video', {
							float: 'none',
							margin: '0 auto',
						});
					} else {
						return commands.updateAttributes('video', { float: align });
					}
				},
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(VideoComponent);
	},

	addInputRules() {
		return [
			nodeInputRule({
				find: YOUTUBE_REGEX_GLOBAL,
				type: this.type,
				getAttributes(match) {
					const url = match.input;
					const [src] = match;

					return {
						src: getEmbedUrlFromYoutubeUrl({ url: url ?? src }),
						provider: 'youtube',
					};
				},
			}),

			nodeInputRule({
				find: /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/,
				type: this.type,
				getAttributes: (match) => {
					const url = match[2];
					return { src: url, provider: 'file' };
				},
			}),
		];
	},
});
