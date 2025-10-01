/**
 * FAQ Module
 * Handles accordion functionality for FAQ section
 */

import { $$ } from '../utils/dom.js';

export class FAQ {
    constructor() {
        this.faqButtons = [];
        this.init();
    }

    init() {
        // Wait for DOM to be fully rendered
        setTimeout(() => {
            this.faqButtons = $$('.faq-question');

            if (this.faqButtons.length === 0) {
                console.warn('⚠️ No se encontraron botones FAQ');
                return;
            }

            this.setupEventListeners();
            console.log(`✅ FAQ inicializado con ${this.faqButtons.length} preguntas`);
        }, 100);
    }

    setupEventListeners() {
        this.faqButtons.forEach((button, index) => {
            // Ensure proper structure
            if (!button.querySelector('.faq-icon')) {
                console.warn(`⚠️ FAQ ${index} missing icon`);
                return;
            }

            // Setup attributes
            button.setAttribute('type', 'button');
            button.setAttribute('aria-expanded', 'false');

            // Click event
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFaqItem(button);
            });

            // Keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFaqItem(button);
                }
            });
        });
    }

    toggleFaqItem(button) {
        if (!button || !button.parentElement) {
            console.error('❌ Invalid FAQ button or structure');
            return;
        }

        const faqItem = button.parentElement;
        const faqAnswer = faqItem.querySelector('.faq-answer');

        if (!faqItem || !faqAnswer) {
            console.error('❌ FAQ elements not found');
            return;
        }

        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        this.closeAllExcept(faqItem);

        // Toggle current FAQ item
        setTimeout(() => {
            if (isActive) {
                // Closing
                faqAnswer.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
                setTimeout(() => {
                    faqItem.classList.remove('active');
                }, 100);
            } else {
                // Opening
                faqItem.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                    faqAnswer.classList.add('active');
                }, 100);
            }
        }, 100);
    }

    closeAllExcept(currentItem) {
        $$('.faq-item.active').forEach((item, index) => {
            if (item !== currentItem) {
                setTimeout(() => {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    const button = item.querySelector('.faq-question');

                    if (answer) {
                        answer.classList.remove('active');
                    }
                    if (button) {
                        button.setAttribute('aria-expanded', 'false');
                    }
                }, index * 50);
            }
        });
    }
}

/**
 * Initialize FAQ
 */
export function initializeFAQ() {
    return new FAQ();
}
