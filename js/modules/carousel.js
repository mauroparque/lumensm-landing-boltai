/**
 * Carousel Module
 * Handles carousel/slider functionality with autoplay, navigation, and accessibility
 */

import { debounce } from '../utils/debounce.js';
import { $, $$, prefersReducedMotion } from '../utils/dom.js';

export class Carousel {
    constructor(element, options = {}) {
        this.carousel = element;
        this.options = {
            autoplay: element.getAttribute('data-autoplay') !== 'false',
            interval: parseInt(element.getAttribute('data-interval'), 10) || 8000,
            ...options
        };

        // DOM elements
        this.viewport = $('.process-window', element);
        this.track = $('.process-grid', element);
        this.slides = Array.from($$('.process-card', element));
        this.prevBtn = $('.process-nav--prev', element);
        this.nextBtn = $('.process-nav--next', element);
        this.dots = Array.from($$('.process-dot', element));

        // State
        this.currentIndex = 0;
        this.slidePositions = [];
        this.autoplayTimer = null;
        this.resumeTimer = null;
        this.isAutoScrolling = false;
        this.autoScrollReset = null;

        if (this.isValid()) {
            this.init();
        }
    }

    /**
     * Check if carousel has all required elements
     */
    isValid() {
        if (!this.viewport || !this.track || this.slides.length === 0) {
            console.warn('⚠️ Carrusel incompleto: faltan elementos esenciales.');
            return false;
        }
        return true;
    }

    /**
     * Initialize carousel
     */
    init() {
        if (this.carousel.dataset.carouselInitialized === 'true') {
            return;
        }

        this.carousel.dataset.carouselInitialized = 'true';
        this.setupAccessibility();
        this.setupEventListeners();
        this.computePositions();
        this.setActiveState(0);

        if (this.shouldAutoplay()) {
            this.startAutoplay();
        }

        console.log(`🎠 Carrusel inicializado con ${this.slides.length} slides.`);
    }

    /**
     * Setup accessibility attributes
     */
    setupAccessibility() {
        this.dots.forEach(dot => {
            dot.setAttribute('role', 'tab');
            dot.setAttribute('tabindex', '-1');
        });

        this.viewport.setAttribute('role', 'region');
        this.viewport.setAttribute('aria-live', 'polite');
    }

    /**
     * Check if autoplay should be enabled
     */
    shouldAutoplay() {
        return this.options.autoplay && 
               this.slides.length > 1 && 
               !prefersReducedMotion();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.handlePrev());
            this.prevBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handlePrev();
            }, { passive: false });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleNext());
            this.nextBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleNext();
            }, { passive: false });
        }

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.pauseAndResumeAutoplay();
                this.goToSlide(index, { animate: true, focus: true });
            });
        });

        // Scroll sync
        this.viewport.addEventListener('scroll', () => {
            if (this.isAutoScrolling) return;
            this.pauseAndResumeAutoplay();
            this.syncSlideFromScroll();
        }, { passive: true });

        // Pointer events
        this.viewport.addEventListener('pointerdown', () => {
            this.pauseAndResumeAutoplay();
        }, { passive: true });

        // Mouse events
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());

        // Focus events
        this.carousel.addEventListener('focusin', () => this.stopAutoplay());
        this.carousel.addEventListener('focusout', (e) => {
            if (!this.carousel.contains(e.relatedTarget)) {
                this.startAutoplay();
            }
        });

        // Resize
        window.addEventListener('resize', debounce(() => this.handleResize(), 150));
    }

    /**
     * Compute slide positions
     */
    computePositions() {
        const viewportCenter = this.viewport.clientWidth / 2;
        this.slidePositions = this.slides.map((slide, index) => {
            const slideCenter = (slide.offsetLeft - this.track.offsetLeft) + (slide.offsetWidth / 2);
            const targetPosition = slideCenter - viewportCenter;

            // Ensure the last slide doesn't go too far right
            if (index === this.slides.length - 1) {
                const maxScroll = this.track.scrollWidth - this.viewport.clientWidth;
                return Math.min(targetPosition, maxScroll);
            }

            return Math.max(0, targetPosition);
        });
    }

    /**
     * Set active state for slide and dot
     */
    setActiveState(index) {
        this.slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === index;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', (!isActive).toString());
            slide.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        this.dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === index;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            dot.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    /**
     * Go to specific slide
     */
    goToSlide(targetIndex, { animate = true, focus = false } = {}) {
        if (this.slides.length === 0) return;

        // Wrap around
        if (targetIndex < 0) {
            targetIndex = this.slides.length - 1;
        } else if (targetIndex >= this.slides.length) {
            targetIndex = 0;
        }

        this.currentIndex = targetIndex;
        const position = this.slidePositions[targetIndex] || 0;

        this.isAutoScrolling = animate;
        if (this.autoScrollReset) {
            clearTimeout(this.autoScrollReset);
        }

        this.viewport.scrollTo({
            left: Math.max(0, position),
            behavior: animate ? 'smooth' : 'auto'
        });

        if (animate) {
            this.autoScrollReset = setTimeout(() => {
                this.isAutoScrolling = false;
            }, 450);
        } else {
            this.isAutoScrolling = false;
        }

        this.setActiveState(this.currentIndex);

        if (focus) {
            requestAnimationFrame(() => {
                this.slides[this.currentIndex].focus({ preventScroll: true });
            });
        }
    }

    /**
     * Go to previous slide
     */
    handlePrev() {
        this.pauseAndResumeAutoplay();
        this.goToSlide(this.currentIndex - 1, { animate: true, focus: true });
    }

    /**
     * Go to next slide
     */
    handleNext() {
        this.pauseAndResumeAutoplay();
        this.goToSlide(this.currentIndex + 1, { animate: true, focus: true });
    }

    /**
     * Sync slide from scroll position
     */
    syncSlideFromScroll = debounce(() => {
        if (this.isAutoScrolling) return;

        const currentScroll = this.viewport.scrollLeft;
        let nearestIndex = 0;
        let nearestDistance = Infinity;

        this.slidePositions.forEach((position, index) => {
            const distance = Math.abs(currentScroll - position);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
            }
        });

        if (nearestIndex !== this.currentIndex) {
            this.currentIndex = nearestIndex;
            this.setActiveState(this.currentIndex);
        }
    }, 80);

    /**
     * Handle window resize
     */
    handleResize() {
        this.computePositions();
        this.goToSlide(this.currentIndex, { animate: false });
    }

    /**
     * Start autoplay
     */
    startAutoplay() {
        if (!this.shouldAutoplay()) return;

        this.stopAutoplay();
        this.autoplayTimer = setInterval(() => {
            this.goToSlide(this.currentIndex + 1, { animate: true });
        }, this.options.interval);
    }

    /**
     * Stop autoplay
     */
    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
        if (this.resumeTimer) {
            clearTimeout(this.resumeTimer);
            this.resumeTimer = null;
        }
    }

    /**
     * Pause autoplay and resume after delay
     */
    pauseAndResumeAutoplay() {
        if (!this.shouldAutoplay()) return;

        this.stopAutoplay();
        this.resumeTimer = setTimeout(() => {
            this.startAutoplay();
        }, this.options.interval * 1.2);
    }

    /**
     * Destroy carousel and cleanup
     */
    destroy() {
        this.stopAutoplay();
        this.carousel.dataset.carouselInitialized = 'false';
    }
}

/**
 * Initialize all carousels on the page
 */
export function initializeCarousels() {
    const carousels = $$('.process-carousel');
    const instances = [];

    carousels.forEach(element => {
        instances.push(new Carousel(element));
    });

    return instances;
}
