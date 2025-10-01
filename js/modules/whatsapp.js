/**
 * WhatsApp Integration Module
 */

const WHATSAPP_CONFIG = {
    phoneNumber: '543547340673',
    defaultMessage: 'Hola! Me interesa obtener más información sobre los servicios de Lumen Salud Mental.'
};

/**
 * Open WhatsApp with optional message
 * @param {string} message - Custom message
 */
export function openWhatsApp(message = '') {
    const encodedMessage = encodeURIComponent(message || WHATSAPP_CONFIG.defaultMessage);
    const whatsappURL = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank', 'noopener');
}

/**
 * Setup WhatsApp integration for all buttons
 */
export function setupWhatsAppIntegration() {
    // Float button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    }

    // All WhatsApp buttons and links
    document.querySelectorAll('[href*="wa.me"], .whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const customMessage = btn.dataset.message || '';
            openWhatsApp(customMessage);
        });
    });
}
