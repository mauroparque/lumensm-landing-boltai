/**
 * LUMEN SALUD MENTAL - Contacts Configuration
 * Configuración centralizada de contactos y URLs de terceros
 * 
 * @module config/contacts
 * @author Lumen Salud Mental
 * @version 1.0.0
 */

/**
 * Información de contacto principal
 * Centraliza todos los datos de contacto en un solo lugar
 * 
 * NOTA: Servicio con alcance internacional - aceptamos pacientes de todo el mundo
 */
export const CONTACTS = {
    whatsapp: {
        number: '543547340673',          // Número completo con código de país
        countryCode: '+54',               // Código de país Argentina
        areaCode: '3547',                 // Código de área
        localNumber: '340673',            // Número local
        displayNumber: '+54 (3547) 340673', // Formato de visualización
        international: true               // Indica que acepta llamadas internacionales
    },
    email: {
        main: 'contacto@lumensaludmental.com',
        support: 'info@lumensaludmental.com'
    },
    phone: {
        formatted: '+54 (3547) 340673',
        raw: '543547340673',
        international: true               // Acepta llamadas internacionales
    },
    social: {
        instagram: 'https://www.instagram.com/lumensaludmental',
        facebook: 'https://www.facebook.com/lumensaludmental',
        linkedin: 'https://www.linkedin.com/company/lumensaludmental'
    },
    address: {
        street: 'Dirección de la consulta',
        city: 'Ciudad',
        province: 'Provincia',
        country: 'Argentina'
    },
    serviceAreas: {
        online: 'Mundial',                // Consultas virtuales disponibles globalmente
        inPerson: 'Argentina',            // Consultas presenciales solo en Argentina
        languages: ['Español', 'English'] // Idiomas soportados
    }
};

/**
 * Configuración de Formspree
 */
export const FORMSPREE = {
    endpoint: 'https://formspree.io/f/xnngadeq',
    apiUrl: 'https://formspree.io/f/xnngadeq'
};

/**
 * URLs permitidas (whitelist) para validación de seguridad
 */
export const ALLOWED_DOMAINS = [
    'wa.me',
    'api.whatsapp.com',
    'instagram.com',
    'facebook.com',
    'linkedin.com',
    'formspree.io',
    'lumensaludmental.com'
];

/**
 * Mensajes predefinidos para WhatsApp
 */
export const WHATSAPP_MESSAGES = {
    general: 'Hola! Me gustaría obtener más información sobre los servicios.',
    consultation: 'Hola! Me gustaría agendar una consulta.',
    emergency: 'Hola! Necesito ayuda urgente.',
    info: 'Hola! Quisiera información sobre {service}.',
};

/**
 * Genera URL de WhatsApp de forma segura
 * 
 * @param {string} message - Mensaje a enviar (opcional)
 * @param {number} maxLength - Longitud máxima del mensaje (default: 500)
 * @returns {string} URL de WhatsApp formateada
 * @example
 * generateWhatsAppURL('Hola, necesito información')
 * // Returns: 'https://wa.me/543547340673?text=Hola%2C%20necesito%20informaci%C3%B3n'
 */
export function generateWhatsAppURL(message = '', maxLength = 500) {
    // Validar y truncar mensaje
    const cleanMessage = message
        .trim()
        .substring(0, maxLength)
        .replace(/[<>]/g, ''); // Remover caracteres peligrosos

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(cleanMessage);

    // Construir URL
    return `https://wa.me/${CONTACTS.whatsapp.number}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Valida que una URL pertenezca a un dominio permitido
 * 
 * @param {string} url - URL a validar
 * @returns {boolean} true si la URL es de un dominio permitido
 */
export function isAllowedURL(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }

    try {
        const urlObj = new URL(url);
        
        // Solo permitir https (excepto localhost en desarrollo)
        if (urlObj.protocol !== 'https:' && urlObj.hostname !== 'localhost') {
            return false;
        }

        // Verificar si el dominio está en la whitelist
        return ALLOWED_DOMAINS.some(domain => 
            urlObj.hostname === domain || 
            urlObj.hostname.endsWith('.' + domain)
        );
    } catch (e) {
        return false;
    }
}

/**
 * Genera mailto link de forma segura
 * 
 * @param {string} subject - Asunto del email
 * @param {string} body - Cuerpo del email (opcional)
 * @returns {string} mailto: link formateado
 */
export function generateMailtoLink(subject = '', body = '') {
    const encodedSubject = encodeURIComponent(subject.substring(0, 200));
    const encodedBody = encodeURIComponent(body.substring(0, 1000));

    let mailto = `mailto:${CONTACTS.email.main}`;
    
    const params = [];
    if (encodedSubject) params.push(`subject=${encodedSubject}`);
    if (encodedBody) params.push(`body=${encodedBody}`);
    
    if (params.length > 0) {
        mailto += '?' + params.join('&');
    }

    return mailto;
}

/**
 * Formatea número de teléfono para visualización
 * Detecta automáticamente el país o usa el formato proporcionado
 * 
 * @param {string} phoneNumber - Número de teléfono crudo
 * @param {string} format - Formato deseado ('international' | 'local' | 'e164')
 * @returns {string} Número formateado
 * @example
 * formatPhoneNumber('543547340673', 'international') // '+54 (3547) 340673'
 * formatPhoneNumber('15551234567', 'international')  // '+1 (555) 123-4567'
 * formatPhoneNumber('34612345678', 'international')  // '+34 612 34 56 78'
 */
export function formatPhoneNumber(phoneNumber, format = 'international') {
    if (!phoneNumber) return '';

    const cleaned = phoneNumber.replace(/\D/g, '');

    if (format === 'e164') {
        // Formato E.164: +543547340673 (estándar internacional)
        return cleaned.startsWith('+') ? cleaned : '+' + cleaned;
    }

    if (format === 'international' && cleaned.length >= 10) {
        // Intentar detectar país por código
        const countryCode = cleaned.substring(0, 2);
        
        // Argentina (54)
        if (countryCode === '54') {
            const areaCode = cleaned.substring(2, 6);
            const number = cleaned.substring(6);
            return `+${countryCode} (${areaCode}) ${number}`;
        }
        
        // USA/Canadá (1)
        if (countryCode === '1' || cleaned.length === 10) {
            const offset = countryCode === '1' ? 1 : 0;
            const area = cleaned.substring(offset, offset + 3);
            const exchange = cleaned.substring(offset + 3, offset + 6);
            const number = cleaned.substring(offset + 6);
            return countryCode === '1' ? `+1 (${area}) ${exchange}-${number}` : `(${area}) ${exchange}-${number}`;
        }
        
        // España (34)
        if (countryCode === '34') {
            const mobile = cleaned.substring(2);
            return `+${countryCode} ${mobile.substring(0, 3)} ${mobile.substring(3, 5)} ${mobile.substring(5, 7)} ${mobile.substring(7)}`;
        }
        
        // México (52)
        if (countryCode === '52') {
            const area = cleaned.substring(2, 4);
            const number = cleaned.substring(4);
            return `+${countryCode} ${area} ${number.substring(0, 4)} ${number.substring(4)}`;
        }
        
        // Formato genérico para otros países
        return '+' + cleaned;
    }

    // Formato local (sin código de país)
    if (cleaned.length >= 10) {
        const areaCode = cleaned.substring(0, 4);
        const number = cleaned.substring(4);
        return `(${areaCode}) ${number}`;
    }

    return cleaned;
}

/**
 * Obtiene el mensaje de WhatsApp según el contexto
 * 
 * @param {string} context - Contexto del mensaje ('general' | 'consultation' | 'emergency' | 'info')
 * @param {Object} params - Parámetros adicionales (service, nombre, etc.)
 * @returns {string} Mensaje formateado
 */
export function getWhatsAppMessage(context = 'general', params = {}) {
    let message = WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES.general;

    // Reemplazar placeholders
    if (params.service) {
        message = message.replace('{service}', params.service);
    }
    if (params.nombre) {
        message = `Hola! Soy ${params.nombre}. ${message}`;
    }

    return message;
}

/**
 * Valida que un número de WhatsApp sea válido
 * 
 * @param {string} phoneNumber - Número a validar
 * @returns {boolean} true si es válido
 */
export function isValidWhatsAppNumber(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return false;
    }

    // Remover caracteres no numéricos
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Debe tener entre 10 y 15 dígitos (estándar internacional)
    return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Detecta el tipo de dispositivo para optimizar enlaces
 * 
 * @returns {Object} Información del dispositivo
 */
export function getDeviceInfo() {
    const userAgent = navigator.userAgent || '';
    
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent),
        isAndroid: /Android/.test(userAgent),
        isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    };
}

/**
 * Abre WhatsApp de manera optimizada según el dispositivo
 * 
 * @param {string} message - Mensaje a enviar
 */
export function openWhatsAppOptimized(message = '') {
    const device = getDeviceInfo();
    const url = generateWhatsAppURL(message);

    // En móvil, usar intent para abrir la app directamente
    if (device.isMobile) {
        window.location.href = url;
    } else {
        // En desktop, abrir en nueva pestaña
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// Exportar todo como objeto por defecto
export default {
    CONTACTS,
    FORMSPREE,
    ALLOWED_DOMAINS,
    WHATSAPP_MESSAGES,
    generateWhatsAppURL,
    isAllowedURL,
    generateMailtoLink,
    formatPhoneNumber,
    getWhatsAppMessage,
    isValidWhatsAppNumber,
    getDeviceInfo,
    openWhatsAppOptimized
};
