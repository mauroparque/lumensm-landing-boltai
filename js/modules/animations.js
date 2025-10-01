/**
 * Animations Module
 * Handles scroll animations and IntersectionObserver for fade-in effects
 */

import { $$ } from '../utils/dom.js';

export class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            this.showAllElements();
            return;
        }

        this.setupObserver();
        this.observeElements();
    }

    /**
     * Setup IntersectionObserver
     */
    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    /**
     * Observe all animatable elements
     */
    observeElements() {
        const selectors = [
            '.service-card',
            '.blog-card',
            '.testimonial-card',
            '.about-text',
            '.contact-info'
        ];

        selectors.forEach(selector => {
            const elements = $$(selector);
            elements.forEach(el => {
                if (this.observer) {
                    this.observer.observe(el);
                }
            });
        });
    }

    /**
     * Fallback: show all elements immediately
     */
    showAllElements() {
        const selectors = [
            '.service-card',
            '.blog-card',
            '.testimonial-card',
            '.about-text',
            '.contact-info'
        ];

        selectors.forEach(selector => {
            const elements = $$(selector);
            elements.forEach(el => {
                el.classList.add('fade-in-up');
            });
        });
    }

    /**
     * Destroy observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

/**
 * Initialize scroll animations
 */
export function initScrollAnimations() {
    return new ScrollAnimations();
}
