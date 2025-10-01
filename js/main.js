/**
 * LUMEN SALUD MENTAL - Main Entry Point
 * Modular JavaScript Architecture
 */

// Import modules
import { initNavigation } from './modules/navigation.js';
import { initializeCarousels } from './modules/carousel.js';
import { initializeContactForm } from './modules/forms.js';
import { initializeFAQ } from './modules/faq.js';
import { setupWhatsAppIntegration } from './modules/whatsapp.js';
import { showNotification } from './modules/notifications.js';
import { initScrollAnimations } from './modules/animations.js';

/**
 * Initialize all application modules
 */
function initializeApp() {
    try {
        console.log('🚀 Inicializando Lumen Salud Mental...');

        // Initialize navigation
        initNavigation();

        // Initialize scroll animations
        initScrollAnimations();

        // Initialize carousels
        initializeCarousels();

        // Initialize contact form
        initializeContactForm();

        // Initialize FAQ
        initializeFAQ();

        // Setup WhatsApp integration
        setupWhatsAppIntegration();

        console.log('✅ Aplicación inicializada correctamente');

        // Performance logging
        if ('performance' in window) {
            const initTime = performance.now();
            console.log(`📊 Inicialización completada en ${Math.round(initTime)} ms`);
        }
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        showNotification('Error al cargar algunas funcionalidades del sitio', 'error');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Performance tracking
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`📈 Tiempo total de carga: ${Math.round(loadTime)} ms`);
    }
});

// Global error handling
window.addEventListener('error', (event) => {
    console.error('Error no manejado:', event.error);
});

// Service Worker placeholder for future PWA implementation
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Ready for PWA implementation
        // navigator.serviceWorker.register('/sw.js');
    });
}
