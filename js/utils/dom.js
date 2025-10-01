/**
 * DOM utility functions
 */

/**
 * Safely query selector with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {HTMLElement|null}
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Safely query selector all with error handling
 * @param {string} selector - CSS selector
 * @param {HTMLElement} parent - Parent element (default: document)
 * @returns {NodeList}
 */
export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Checks if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Element or selector
 * @param {number} offset - Offset in pixels (default: 70)
 */
export function smoothScrollTo(target, offset = 70) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;

    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}
