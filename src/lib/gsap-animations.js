/**
 * WHYS — GSAP Cinematic Animation Library
 * 
 * Usage: import and call inside a useEffect() after gsap.registerPlugin(ScrollTrigger)
 * All functions are client-side only.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wraps each word of a text element into a <span> for reveal animations.
 * Used when SplitText (GSAP Club) is not available.
 */
export function wrapLines(el) {
  if (!el) return [];
  const text = el.innerText;
  const words = text.split(" ");
  el.innerHTML = words
    .map((w) => `<span class="gsap-word-wrap" style="display:inline-block; overflow:hidden; vertical-align:bottom;"><span class="gsap-word" style="display:inline-block;">${w}</span></span>`)
    .join(" ");
  return el.querySelectorAll(".gsap-word");
}

/**
 * Cinematic text reveal: each word slides up from below.
 * Mimics premium agency sites (Akaru, Locomotive, etc.)
 */
export function revealText(selector, { delay = 0, stagger = 0.04, duration = 0.9, trigger = null } = {}) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const words = wrapLines(el);
    if (!words.length) return;

    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || el,
          start: "top 88%",
          once: true,
        },
      }
    );
  });
}

/**
 * Fade + slide up reveal for block elements (cards, images, sections).
 */
export function revealFadeUp(selector, { stagger = 0.12, duration = 0.8, y = 40, delay = 0 } = {}) {
  gsap.fromTo(
    selector,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        once: true,
      },
    }
  );
}

/**
 * Horizontal line scale-in reveal (for dividers and branch lines).
 */
export function revealLine(selector, { duration = 0.8, delay = 0, origin = "left" } = {}) {
  gsap.fromTo(
    selector,
    { scaleX: 0, transformOrigin: origin },
    {
      scaleX: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: selector,
        start: "top 90%",
        once: true,
      },
    }
  );
}

/**
 * Counter animation (e.g. "50+" number metrics)
 */
export function animateCounter(selector, { end, duration = 1.5, suffix = "" } = {}) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.innerText = Math.floor(obj.val) + suffix;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });
}

/**
 * Cleanup all ScrollTrigger instances (call on component unmount)
 */
export function killAllTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
