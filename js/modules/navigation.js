/**
 * Navigation Module
 * Handles mobile menu, scroll effects, and smooth scrolling
 */

import { debounce } from '../utils/debounce.js';
import { $, $$, smoothScrollTo } from '../utils/dom.js';

export class Navigation {
    constructor() {
        this.navbar = $('#navbar');
        this.hamburger = $('#hamburger');
        this.navMenu = $('#nav-menu');
        this.navLinks = $$('.nav-link');
        this.scrollToTopBtn = null;

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollEffects();
        this.createScrollToTopButton();
    }

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        if (!this.hamburger || !this.navMenu) return;

        // Toggle menu on hamburger click
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = this.navMenu.classList.contains('active');
        this.hamburger.setAttribute('aria-expanded', isExpanded);
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    smoothScrollTo(targetId);
                }
            });
        });
    }

    /**
     * Setup scroll effects (navbar and scroll-to-top button)
     */
    setupScrollEffects() {
        const handleScroll = debounce(() => {
            const scrollY = window.scrollY;

            // Navbar scroll effect
            if (this.navbar) {
                if (scrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }

            // Show/hide scroll to top button
            if (this.scrollToTopBtn) {
                if (scrollY > 300) {
                    this.scrollToTopBtn.classList.add('visible');
                } else {
                    this.scrollToTopBtn.classList.remove('visible');
                }
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Create and setup scroll to top button
     */
    createScrollToTopButton() {
        if ($('.scroll-to-top')) return;

        this.scrollToTopBtn = document.createElement('button');
        this.scrollToTopBtn.className = 'scroll-to-top';
        this.scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        this.scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');

        this.scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(this.scrollToTopBtn);
    }
}

/**
 * Initialize navigation
 * @returns {Navigation}
 */
export function initNavigation() {
    return new Navigation();
}
