/**
 * LUMEN SALUD MENTAL - Security Sanitizer
 * Módulo de sanitización y validación para prevenir ataques XSS y spam
 * 
 * @module utils/sanitizer
 * @author Lumen Salud Mental
 * @version 1.0.0
 */

/**
 * Sanitiza entrada de usuario para prevenir XSS
 * Escapa caracteres HTML peligrosos
 * 
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 * @example
 * sanitizeInput('<script>alert("XSS")</script>') 
 * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    
    const reg = /[&<>"'/]/ig;
    return input.replace(reg, (match) => map[match]);
}

/**
 * Detecta contenido peligroso en el input
 * Busca patrones comunes de ataques XSS e inyección
 * 
 * @param {string} input - Texto a validar
 * @returns {boolean} true si contiene contenido peligroso
 * @example
 * containsDangerousContent('<script>alert(1)</script>') // Returns: true
 * containsDangerousContent('Hola mundo') // Returns: false
 */
export function containsDangerousContent(input) {
    const dangerousPatterns = [
        /<script/i,                 // Scripts
        /javascript:/i,             // JavaScript protocol
        /on\w+\s*=/i,              // Event handlers (onclick, onerror, etc.)
        /<iframe/i,                // Iframes
        /<object/i,                // Object tags
        /<embed/i,                 // Embed tags
        /data:text\/html/i,        // Data URLs con HTML
        /<link/i,                  // Link tags
        /<meta/i,                  // Meta tags
        /vbscript:/i,              // VBScript protocol
        /<svg.*onload/i,           // SVG con eventos
    ];
    
    return dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Valida email con patrón restrictivo RFC 5322
 * Más estricto que la validación HTML5 estándar
 * 
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 * @example
 * isValidEmail('usuario@ejemplo.com') // Returns: true
 * isValidEmail('invalid.email') // Returns: false
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // Patrón RFC 5322 simplificado
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Validaciones adicionales
    return emailRegex.test(email) && 
           email.length <= 254 &&              // Límite RFC 5321
           !email.includes('..') &&            // Sin puntos consecutivos
           !email.startsWith('.') &&           // Sin punto al inicio
           !email.endsWith('.');               // Sin punto al final
}

/**
 * Valida teléfono internacional
 * Soporta formatos de múltiples países con flexibilidad
 * 
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} true si es válido
 * @example
 * isValidPhone('+54 11 1234-5678') // Returns: true (Argentina)
 * isValidPhone('+1 555 123 4567') // Returns: true (USA)
 * isValidPhone('+34 612 34 56 78') // Returns: true (España)
 * isValidPhone('+52 55 1234 5678') // Returns: true (México)
 * isValidPhone('0351 123 4567') // Returns: true (Argentina formato local)
 */
export function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }

    // Remover espacios, guiones, paréntesis y puntos para validación
    const cleanPhone = phone.replace(/[\s\-().]/g, '');
    
    // Validaciones básicas:
    // 1. Solo dígitos (opcionalmente con + al inicio)
    if (!/^\+?\d+$/.test(cleanPhone)) {
        return false;
    }
    
    // 2. Longitud entre 7 y 15 dígitos (estándar E.164)
    // Ejemplos:
    // - Mínimo: 7 dígitos (algunos países pequeños o números locales)
    // - Máximo: 15 dígitos (límite internacional E.164)
    const digitCount = cleanPhone.replace(/\+/g, '').length;
    
    if (digitCount < 7 || digitCount > 15) {
        return false;
    }
    
    // 3. Si tiene código de país (+), debe tener al menos 10 dígitos totales
    if (cleanPhone.startsWith('+') && digitCount < 10) {
        return false;
    }
    
    return true;
}

/**
 * Detecta patrones comunes de spam en texto
 * Analiza contenido, estructura y patrones sospechosos
 * 
 * @param {string} text - Texto a analizar
 * @returns {boolean} true si parece spam
 * @example
 * isSpam('CLICK HERE TO WIN $$$') // Returns: true
 * isSpam('Hola, necesito información sobre terapia') // Returns: false
 */
export function isSpam(text) {
    if (!text || typeof text !== 'string') {
        return false;
    }

    // Patrones de spam comunes
    const spamPatterns = [
        /viagra/i,
        /cialis/i,
        /casino/i,
        /lottery/i,
        /\$\$\$/,
        /click\s+here/i,
        /free\s+money/i,
        /(won|win)\s+(money|prize)/i,
        /enlarge/i,
        /weight\s+loss/i,
        /make\s+money\s+fast/i,
        /miracle\s+cure/i,
        /limited\s+time\s+offer/i,
    ];
    
    // Detectar exceso de mayúsculas (>60% del texto)
    const letters = text.replace(/[^a-zA-Z]/g, '');
    if (letters.length > 10) {
        const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / letters.length;
        if (upperCaseRatio > 0.6) {
            return true;
        }
    }
    
    // Detectar exceso de signos de exclamación
    const exclamationCount = (text.match(/!/g) || []).length;
    if (exclamationCount > 5) {
        return true;
    }
    
    // Detectar exceso de links (>3 URLs)
    const linkCount = (text.match(/https?:\/\//gi) || []).length;
    if (linkCount > 3) {
        return true;
    }
    
    // Detectar repetición excesiva de caracteres
    if (/(.)\1{5,}/.test(text)) {
        return true;
    }
    
    return spamPatterns.some(pattern => pattern.test(text));
}

/**
 * Limita longitud de texto de forma segura
 * Evita ataques de denegación de servicio por inputs enormes
 * 
 * @param {string} text - Texto a limitar
 * @param {number} maxLength - Longitud máxima (default: 5000)
 * @returns {string} Texto limitado
 * @example
 * truncate('texto muy largo...', 10) // Returns: 'texto muy '
 */
export function truncate(text, maxLength = 5000) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    return text.substring(0, maxLength);
}

/**
 * Valida nombre completo
 * Permite letras, espacios, acentos y algunos caracteres especiales
 * 
 * @param {string} name - Nombre a validar
 * @returns {boolean} true si es válido
 * @example
 * isValidName('Juan Pérez') // Returns: true
 * isValidName('John123') // Returns: false
 */
export function isValidName(name) {
    if (!name || typeof name !== 'string') {
        return false;
    }

    // Solo letras, espacios, acentos, apóstrofes y guiones
    const nameRegex = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/;
    
    return nameRegex.test(name) && 
           name.length >= 2 && 
           name.length <= 100 &&
           !name.includes('  ') &&            // Sin espacios dobles
           name.trim().length === name.length; // Sin espacios al inicio/fin
}

/**
 * Valida longitud de mensaje
 * Asegura que el mensaje tenga contenido suficiente y no sea excesivo
 * 
 * @param {string} message - Mensaje a validar
 * @param {number} minLength - Longitud mínima (default: 10)
 * @param {number} maxLength - Longitud máxima (default: 5000)
 * @returns {Object} {valid: boolean, error: string}
 */
export function validateMessageLength(message, minLength = 10, maxLength = 5000) {
    if (!message || typeof message !== 'string') {
        return { valid: false, error: 'El mensaje no puede estar vacío' };
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < minLength) {
        return { 
            valid: false, 
            error: `El mensaje debe tener al menos ${minLength} caracteres` 
        };
    }

    if (trimmedMessage.length > maxLength) {
        return { 
            valid: false, 
            error: `El mensaje es demasiado largo (máximo ${maxLength} caracteres)` 
        };
    }

    return { valid: true, error: null };
}

/**
 * Sanitiza URL para prevenir ataques de redirección abierta
 * Solo permite URLs seguras del dominio o whitelisted
 * 
 * @param {string} url - URL a validar
 * @param {Array<string>} whitelist - Dominios permitidos
 * @returns {string|null} URL sanitizada o null si es peligrosa
 */
export function sanitizeURL(url, whitelist = ['wa.me', 'instagram.com', 'facebook.com']) {
    if (!url || typeof url !== 'string') {
        return null;
    }

    try {
        const urlObj = new URL(url);
        
        // Solo permitir https
        if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
            return null;
        }
        
        // Verificar dominio en whitelist
        const isWhitelisted = whitelist.some(domain => 
            urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
        );
        
        return isWhitelisted ? url : null;
    } catch (e) {
        return null;
    }
}

/**
 * Detecta si un texto contiene información sensible
 * Útil para evitar que se envíen datos sensibles por error
 * 
 * @param {string} text - Texto a analizar
 * @returns {Object} {hasSensitiveData: boolean, types: Array<string>}
 */
export function detectSensitiveData(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitiveData: false, types: [] };
    }

    const sensitivePatterns = {
        creditCard: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
        dni: /\b\d{7,8}\b/,
        cuit: /\b\d{2}[-\s]?\d{8}[-\s]?\d{1}\b/,
        password: /\b(password|contraseña|clave)\s*[:=]\s*\S+/i,
    };

    const detectedTypes = [];

    for (const [type, pattern] of Object.entries(sensitivePatterns)) {
        if (pattern.test(text)) {
            detectedTypes.push(type);
        }
    }

    return {
        hasSensitiveData: detectedTypes.length > 0,
        types: detectedTypes
    };
}

// Exportar objeto con todas las funciones para uso flexible
export default {
    sanitizeInput,
    containsDangerousContent,
    isValidEmail,
    isValidPhone,
    isSpam,
    truncate,
    isValidName,
    validateMessageLength,
    sanitizeURL,
    detectSensitiveData
};
