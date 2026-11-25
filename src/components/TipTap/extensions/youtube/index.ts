import { createAtomBlockMarkdownSpec, mergeAttributes, Node, nodePasteRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { getEmbedUrlFromYoutubeUrl, isValidYoutubeUrl, YOUTUBE_REGEX_GLOBAL } from './utils';
import { YoutubeComponent } from './youtube';

export interface YoutubeOptions {
	/**
	 * Controls if the paste handler for youtube videos should be added.
	 * @default true
	 * @example false
	 */
	addPasteHandler: boolean;

	/**
	 * Controls if the youtube video should be allowed to go fullscreen.
	 * @default true
	 * @example false
	 */
	allowFullscreen: boolean;

	/**
	 * Controls if the youtube video should autoplay.
	 * @default false
	 * @example true
	 */
	autoplay: boolean;

	/**
	 * The language of the captions shown in the youtube video.
	 * @default undefined
	 * @example 'en'
	 */
	ccLanguage?: string;

	/**
	 * Controls if the captions should be shown in the youtube video.
	 * @default undefined
	 * @example true
	 */
	ccLoadPolicy?: boolean;

	/**
	 * Controls if the controls should be shown in the youtube video.
	 * @default true
	 * @example false
	 */
	controls: boolean;

	/**
	 * Controls if the keyboard controls should be disabled in the youtube video.
	 * @default false
	 * @example true
	 */
	disableKBcontrols: boolean;

	/**
	 * Controls if the iframe api should be enabled in the youtube video.
	 * @default true
	 * @example true
	 */
	enableIFrameApi: boolean;

	/**
	 * The end time of the youtube video.
	 * @default 0
	 * @example 120
	 */
	endTime: number;

	/**
	 * The height of the youtube video.
	 * @default 480
	 * @example 720
	 */
	height: number;

	/**
	 * The language of the youtube video.
	 * @default undefined
	 * @example 'en'
	 */
	interfaceLanguage?: string;

	/**
	 * Controls if the video annotations should be shown in the youtube video.
	 * @default 0
	 * @example 1
	 */
	ivLoadPolicy: number;

	/**
	 * Controls if the youtube video should loop.
	 * @default false
	 * @example true
	 */
	loop: boolean;

	/**
	 * Controls if the youtube video should show a small youtube logo.
	 * @default false
	 * @example true
	 */
	modestBranding: boolean;

	/**
	 * The HTML attributes for a youtube video node.
	 * @default {}
	 * @example { class: 'foo' }
	 */
	HTMLAttributes: Record<string, any>;

	/**
	 * Controls if the youtube node should be inline or not.
	 * @default false
	 * @example true
	 */
	inline: boolean;

	/**
	 * Controls if the youtube video should be loaded from youtube-nocookie.com.
	 * @default false
	 * @example true
	 */
	nocookie: boolean;

	/**
	 * The origin of the youtube video.
	 * @default ''
	 * @example 'https://tiptap.dev'
	 */
	origin: string;

	/**
	 * The playlist of the youtube video.
	 * @default ''
	 * @example 'PLQg6GaokU5CwiVmsZ0dZm6VeIg0V5z1tK'
	 */
	playlist: string;

	/**
	 * The color of the youtube video progress bar.
	 * @default undefined
	 * @example 'red'
	 */
	progressBarColor?: string;

	/**
	 * The width of the youtube video.
	 * @default 640
	 * @example 1280
	 */
	width: number;

	/**
	 * Controls if the related youtube videos at the end are from the same channel.
	 * @default 1
	 * @example 0
	 */
	rel: number;
}

/**
 * The options for setting a youtube video.
 */
type SetYoutubeVideoOptions = {
	src: string;
	width?: number;
	height?: number;
	start?: number;
};

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		youtube: {
			/**
			 * Insert a youtube video
			 * @param options The youtube video attributes
			 * @example editor.commands.setYoutubeVideo({ src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' })
			 */
			setYoutubeVideo: (options: SetYoutubeVideoOptions) => ReturnType;
			setYoutubeAlign: (align: string) => ReturnType;
		};
	}
}

/**
 * This extension adds support for youtube videos.
 * @see https://www.tiptap.dev/api/nodes/youtube
 */
export const Youtube = Node.create<YoutubeOptions>({
	name: 'youtube',

	priority: 1000,

	addOptions() {
		return {
			addPasteHandler: true,
			allowFullscreen: true,
			autoplay: false,
			ccLanguage: undefined,
			ccLoadPolicy: undefined,
			controls: true,
			disableKBcontrols: false,
			enableIFrameApi: true,
			endTime: 0,
			height: 480,
			interfaceLanguage: undefined,
			ivLoadPolicy: 0,
			loop: false,
			modestBranding: false,
			HTMLAttributes: {},
			inline: false,
			nocookie: false,
			origin: '',
			playlist: '',
			progressBarColor: undefined,
			width: 640,
			rel: 1,
		};
	},

	inline() {
		return this.options.inline;
	},

	group() {
		return this.options.inline ? 'inline' : 'block';
	},

	atom: true,
	draggable: true,
	selectable: true,

	addAttributes() {
		return {
			...this.parent?.(),
			src: { default: null },
			start: { default: 0 },
			width: { default: this.options.width },
			height: { default: this.options.height },
			float: { default: 'none' },
			margin: { default: null },
			display: { default: null },
		};
	},

	parseHTML() {
		return [
			{
				tag: 'div[data-youtube-video]',
				getAttrs: (node) => {
					if (!(node instanceof HTMLElement)) return false;

					const iframe = node.querySelector('iframe');
					if (!iframe) return false;

					return {
						src: iframe.getAttribute('src'),
						width: iframe.getAttribute('width'),
						height: iframe.getAttribute('height'),
						start: iframe.getAttribute('start') ?? 0,
					};
				},
			},
			{
				tag: 'iframe[src*="youtube"]',
				getAttrs: (node) => {
					if (!(node instanceof HTMLElement)) return false;

					return {
						src: node.getAttribute('src'),
						width: node.getAttribute('width'),
						height: node.getAttribute('height'),
					};
				},
			},
			{
				tag: 'youtube',
				getAttrs: (node) => {
					if (!(node instanceof HTMLElement)) return false;

					return {
						src: node.getAttribute('src'),
						width: node.getAttribute('width'),
						height: node.getAttribute('height'),
						start: node.getAttribute('start') ?? 0,
					};
				},
			},
		];
	},

	addCommands() {
		return {
			setYoutubeVideo:
				(options: SetYoutubeVideoOptions) =>
				({ commands }) => {
					if (!isValidYoutubeUrl(options.src)) {
						return false;
					}

					const embedUrl = getEmbedUrlFromYoutubeUrl({
						url: options.src,
					});

					if (!embedUrl) return false;

					return commands.insertContent({
						type: this.name,
						attrs: {
							src: embedUrl,
							width: options.width ?? this.options.width,
							height: options.height ?? this.options.height,
							start: options.start ?? 0,
						},
					});
				},
			setYoutubeAlign:
				(alignment: string) =>
				({ commands }) => {
					const attrs =
						alignment === 'center'
							? { float: 'none', margin: '0 auto', display: 'block' }
							: alignment === 'none'
								? { float: 'none', margin: null }
								: { float: alignment, margin: null };

					return commands.updateAttributes('youtube', attrs);
				},
		};
	},

	addPasteRules() {
		if (!this.options.addPasteHandler) {
			return [];
		}

		return [
			nodePasteRule({
				find: YOUTUBE_REGEX_GLOBAL,
				type: this.type,
				getAttributes: (match) => {
					const url = match[0];

					const embed = getEmbedUrlFromYoutubeUrl({
						url,
					});

					if (!embed) return {};

					return { src: embed };
				},
			}),
		];
	},

	renderHTML({ HTMLAttributes }) {
		const embedUrl = getEmbedUrlFromYoutubeUrl({
			url: HTMLAttributes.src,
			allowFullscreen: this.options.allowFullscreen,
			autoplay: this.options.autoplay,
			ccLanguage: this.options.ccLanguage,
			ccLoadPolicy: this.options.ccLoadPolicy,
			controls: this.options.controls,
			disableKBcontrols: this.options.disableKBcontrols,
			enableIFrameApi: this.options.enableIFrameApi,
			endTime: this.options.endTime,
			interfaceLanguage: this.options.interfaceLanguage,
			ivLoadPolicy: this.options.ivLoadPolicy,
			loop: this.options.loop,
			modestBranding: this.options.modestBranding,
			nocookie: this.options.nocookie,
			origin: this.options.origin,
			playlist: this.options.playlist,
			progressBarColor: this.options.progressBarColor,
			startAt: HTMLAttributes.start || 0,
			rel: this.options.rel,
		});

		HTMLAttributes.src = embedUrl;

		return [
			'div',
			{ 'data-youtube-video': '' },
			[
				'iframe',
				mergeAttributes(
					this.options.HTMLAttributes,
					{
						src: embedUrl,
						width: HTMLAttributes.width,
						height: HTMLAttributes.height,
						frameborder: '0',
						allowfullscreen: 'true',
						allow:
							'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
					},
					HTMLAttributes,
				),
			],
		];
	},

	...createAtomBlockMarkdownSpec({
		nodeName: 'youtube',
		allowedAttributes: ['src', 'width', 'height', 'start'],
	}),

	addNodeView() {
		return ReactNodeViewRenderer(YoutubeComponent);
	},
});
