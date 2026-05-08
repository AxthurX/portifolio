/**
 * WHYS — GSAP Cinematic Animation Library
 *
 * Usage: import and call inside a useEffect() after gsap.registerPlugin(ScrollTrigger)
 * All functions are client-side only.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

type RevealTextOptions = {
	delay?: number;
	stagger?: number;
	duration?: number;
	trigger?: Element | string | null;
};

type RevealFadeUpOptions = {
	stagger?: number;
	duration?: number;
	y?: number;
	delay?: number;
};

type RevealLineOptions = {
	duration?: number;
	delay?: number;
	origin?: string;
};

type AnimateCounterOptions = {
	end: number;
	duration?: number;
	suffix?: string;
};

type GSAPTarget =
	| string
	| Element
	| HTMLElement
	| NodeListOf<Element>
	| Element[];

export function wrapLines(el: HTMLElement | null): HTMLElement[] {
	if (!el) return [];

	const text = el.innerText;

	const words = text.split(' ');

	el.innerHTML = words
		.map(
			(word) =>
				`<span class="gsap-word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;">
					<span class="gsap-word" style="display:inline-block;">
						${word}
					</span>
				</span>`,
		)
		.join(' ');

	return Array.from(el.querySelectorAll<HTMLElement>('.gsap-word'));
}

/**
 * Cinematic text reveal
 */
export function revealText(
	selector: string,
	{
		delay = 0,
		stagger = 0.04,
		duration = 0.9,
		trigger = null,
	}: RevealTextOptions = {},
): void {
	const elements = document.querySelectorAll<HTMLElement>(selector);

	elements.forEach((el) => {
		const words = wrapLines(el);

		if (!words.length) return;

		gsap.fromTo(
			words,
			{
				y: '110%',
				opacity: 0,
			},
			{
				y: '0%',
				opacity: 1,
				duration,
				stagger,
				delay,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: trigger || el,
					start: 'top 88%',
					once: true,
				},
			},
		);
	});
}

/**
 * Fade + slide up reveal
 */
export function revealFadeUp(
	selector: GSAPTarget,
	{
		stagger = 0.12,
		duration = 0.8,
		y = 40,
		delay = 0,
	}: RevealFadeUpOptions = {},
): void {
	gsap.fromTo(
		selector,
		{
			opacity: 0,
			y,
		},
		{
			opacity: 1,
			y: 0,
			duration,
			stagger,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: typeof selector === 'string' ? selector : undefined,
				start: 'top 85%',
				once: true,
			},
		},
	);
}

/**
 * Horizontal line reveal
 */
export function revealLine(
	selector: GSAPTarget,
	{ duration = 0.8, delay = 0, origin = 'left' }: RevealLineOptions = {},
): void {
	gsap.fromTo(
		selector,
		{
			scaleX: 0,
			transformOrigin: origin,
		},
		{
			scaleX: 1,
			duration,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: typeof selector === 'string' ? selector : undefined,
				start: 'top 90%',
				once: true,
			},
		},
	);
}

/**
 * Counter animation
 */
export function animateCounter(
	selector: string,
	{ end, duration = 1.5, suffix = '' }: AnimateCounterOptions,
): void {
	const elements = document.querySelectorAll<HTMLElement>(selector);

	elements.forEach((el) => {
		const obj = { val: 0 };

		gsap.to(obj, {
			val: end,
			duration,
			ease: 'power2.out',
			onUpdate: () => {
				el.innerText = Math.floor(obj.val) + suffix;
			},
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				once: true,
			},
		});
	});
}

/**
 * Cleanup all ScrollTriggers
 */
export function killAllTriggers(): void {
	ScrollTrigger.getAll().flatMap((trigger) => trigger.kill());
}
