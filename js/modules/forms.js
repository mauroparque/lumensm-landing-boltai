/**
 * Forms Module
 * Handles form validation, submission, and floating labels
 * Enhanced with XSS protection, spam detection, and rate limiting
 * 
 * INTERNACIONAL: Soporta teléfonos de cualquier país (E.164 estándar)
 * Acepta pacientes de todo el mundo para consultas virtuales
 */

import { 
    validateFormData, 
    validateField,
    clearFieldError,
    clearAllFieldErrors,
    highlightErrorFields 
} from '../utils/validators.js';
import { 
    sanitizeInput,
    containsDangerousContent,
    isValidEmail,
    isValidPhone,
    isSpam,
    truncate,
    isValidName,
    validateMessageLength,
    detectSensitiveData
} from '../utils/sanitizer.js';
import { showNotification } from './notifications.js';
import { openWhatsApp } from './whatsapp.js';
import { $ } from '../utils/dom.js';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
    cooldownPeriod: 60000, // 1 minuto entre envíos
    maxAttemptsPerHour: 5,  // Máximo 5 intentos por hora
    blockDuration: 3600000  // Bloquear por 1 hora si excede límite
};

// Store submission attempts
const submissionAttempts = new Map();
const blockedEmails = new Map();

export class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton ? this.submitButton.textContent : '';

        this.init();
    }

    init() {
        this.setupFormSubmission();
        this.setupFloatingLabels();
        this.setupRealtimeValidation();
        this.setupHoneypot();
    }

    /**
     * Setup honeypot field for spam detection
     * Hidden field that bots will fill but humans won't
     */
    setupHoneypot() {
        const honeypot = this.form.querySelector('input[name="_gotcha"]');
        if (honeypot) {
            honeypot.setAttribute('tabindex', '-1');
            honeypot.setAttribute('autocomplete', 'off');
        }
    }

    /**
     * Check if email is blocked due to spam or rate limiting
     */
    isBlocked(email) {
        const blockInfo = blockedEmails.get(email);
        if (!blockInfo) return false;

        const now = Date.now();
        if (now < blockInfo.until) {
            const remainingMinutes = Math.ceil((blockInfo.until - now) / 60000);
            return { blocked: true, remainingMinutes };
        }

        // Unblock if time has passed
        blockedEmails.delete(email);
        return false;
    }

    /**
     * Check rate limiting for email
     */
    checkRateLimit(email) {
        const now = Date.now();
        const attempts = submissionAttempts.get(email) || [];

        // Remove attempts older than 1 hour
        const recentAttempts = attempts.filter(time => now - time < 3600000);

        // Check if exceeded max attempts
        if (recentAttempts.length >= RATE_LIMIT_CONFIG.maxAttemptsPerHour) {
            // Block user
            blockedEmails.set(email, {
                until: now + RATE_LIMIT_CONFIG.blockDuration,
                reason: 'Too many attempts'
            });
            return { 
                allowed: false, 
                reason: 'Demasiados intentos. Intenta nuevamente en 1 hora.' 
            };
        }

        // Check cooldown period
        if (recentAttempts.length > 0) {
            const lastAttempt = Math.max(...recentAttempts);
            const timeSinceLastAttempt = now - lastAttempt;

            if (timeSinceLastAttempt < RATE_LIMIT_CONFIG.cooldownPeriod) {
                const remainingSeconds = Math.ceil(
                    (RATE_LIMIT_CONFIG.cooldownPeriod - timeSinceLastAttempt) / 1000
                );
                return { 
                    allowed: false, 
                    reason: `Por favor espera ${remainingSeconds} segundos antes de enviar otro mensaje.` 
                };
            }
        }

        return { allowed: true };
    }

    /**
     * Record submission attempt
     */
    recordAttempt(email) {
        const attempts = submissionAttempts.get(email) || [];
        attempts.push(Date.now());
        submissionAttempts.set(email, attempts);
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = {
            nombre: formData.get('nombre')?.trim() || '',
            email: formData.get('email')?.trim() || '',
            telefono: formData.get('telefono')?.trim() || '',
            mensaje: formData.get('mensaje')?.trim() || '',
            servicio: formData.get('servicio') || ''
        };

        // 🍯 Check honeypot (spam detection)
        const honeypotValue = formData.get('_gotcha');
        if (honeypotValue) {
            console.warn('🚨 Spam detected via honeypot');
            // Silently fail for bots
            setTimeout(() => {
                showNotification('Mensaje enviado correctamente', 'success');
                this.form.reset();
            }, 1000);
            return;
        }

        // 🔒 Security validations with sanitizer
        clearAllFieldErrors();
        const securityErrors = [];

        // Validate nombre
        if (!data.nombre || data.nombre.length < 2) {
            securityErrors.push({ field: 'nombre', message: 'El nombre debe tener al menos 2 caracteres' });
        } else if (!isValidName(data.nombre)) {
            securityErrors.push({ field: 'nombre', message: 'El nombre contiene caracteres no permitidos' });
        } else if (containsDangerousContent(data.nombre)) {
            securityErrors.push({ field: 'nombre', message: 'El nombre contiene contenido peligroso' });
        }

        // Validate email
        if (!isValidEmail(data.email)) {
            securityErrors.push({ field: 'email', message: 'Por favor ingresa un email válido' });
        }

        // Validate telefono (optional)
        if (data.telefono && !isValidPhone(data.telefono)) {
            securityErrors.push({ field: 'telefono', message: 'Formato de teléfono inválido' });
        }

        // Validate mensaje
        const messageValidation = validateMessageLength(data.mensaje, 10, 5000);
        if (!messageValidation.valid) {
            securityErrors.push({ field: 'mensaje', message: messageValidation.error });
        } else if (containsDangerousContent(data.mensaje)) {
            securityErrors.push({ field: 'mensaje', message: 'El mensaje contiene contenido no permitido' });
        } else if (isSpam(data.mensaje)) {
            console.warn('🚨 Spam detected in message:', data.mensaje);
            securityErrors.push({ field: 'mensaje', message: 'El mensaje fue detectado como spam' });
        }

        // Check for sensitive data
        const sensitiveDataCheck = detectSensitiveData(data.mensaje);
        if (sensitiveDataCheck.hasSensitiveData) {
            console.warn('⚠️ Sensitive data detected:', sensitiveDataCheck.types);
            
            // Crear mensaje detallado con los tipos de datos detectados
            const dataTypes = sensitiveDataCheck.types.map(type => {
                const labels = {
                    'dni': 'DNI',
                    'cuit': 'CUIT',
                    'creditCard': 'Tarjeta de Crédito',
                    'password': 'Contraseña'
                };
                return labels[type] || type;
            }).join(', ');
            
            securityErrors.push({ 
                field: 'mensaje', 
                message: `⚠️ Tu mensaje contiene información sensible (${dataTypes}). Por seguridad, evita compartir estos datos.` 
            });
        }

        // Show validation errors
        if (securityErrors.length > 0) {
            showNotification(securityErrors[0].message, 'error');
            highlightErrorFields(securityErrors);
            return;
        }

        // 🚦 Rate limiting check
        const blockCheck = this.isBlocked(data.email);
        if (blockCheck && blockCheck.blocked) {
            showNotification(
                `Tu email está bloqueado temporalmente. Intenta nuevamente en ${blockCheck.remainingMinutes} minutos.`,
                'error'
            );
            return;
        }

        const rateLimitCheck = this.checkRateLimit(data.email);
        if (!rateLimitCheck.allowed) {
            showNotification(rateLimitCheck.reason, 'error');
            return;
        }

        // Old validation rules for compatibility
        const validationRules = {
            nombre: {
                required: true,
                minLength: 2,
                maxLength: 100,
                message: 'Nombre debe tener entre 2 y 100 caracteres'
            },
            email: {
                required: true,
                email: true,
                message: 'Email inválido'
            },
            telefono: {
                required: false,
                phone: true,
                message: 'Teléfono inválido (solo números, espacios y guiones)'
            },
            mensaje: {
                required: true,
                minLength: 10,
                maxLength: 5000,
                message: 'Mensaje debe tener entre 10 y 5000 caracteres'
            },
            servicio: {
                required: true,
                message: 'Selecciona un servicio'
            }
        };

        const validationErrors = validateFormData(data, validationRules);
        if (validationErrors.length > 0) {
            showNotification(validationErrors[0].message, 'error');
            highlightErrorFields(validationErrors);
            return;
        }

        clearAllFieldErrors();

        // 🧹 Sanitize data before sending
        const sanitizedFormData = new FormData();
        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string' && key !== '_gotcha') {
                const sanitized = sanitizeInput(truncate(value, 5000));
                sanitizedFormData.append(key, sanitized);
            } else if (key !== '_gotcha') {
                sanitizedFormData.append(key, value);
            }
        }

        // Show loading
        if (this.submitButton) {
            this.submitButton.textContent = 'Enviando...';
            this.submitButton.disabled = true;
        }

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: sanitizedFormData
            });

            if (response.ok) {
                // ✅ Record successful submission
                this.recordAttempt(data.email);

                showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                this.form.reset();
                clearAllFieldErrors();

                // Show WhatsApp option
                if (data.nombre && data.mensaje) {
                    const whatsappMessage = `Hola! Soy ${data.nombre}. ${data.mensaje}`;
                    setTimeout(() => {
                        this.showWhatsAppOption(whatsappMessage);
                    }, 2000);
                }

                console.log('✅ Form submitted successfully with security checks');
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error en el servidor');
            }
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            console.error('❌ Form submission error:', error);
        } finally {
            if (this.submitButton) {
                this.submitButton.textContent = this.originalButtonText;
                this.submitButton.disabled = false;
            }
        }
    }

    showWhatsAppOption(message) {
        showNotification(
            'Mensaje enviado correctamente. ¿También quieres enviarlo por WhatsApp?',
            'success',
            {
                action: {
                    text: 'Enviar por WhatsApp',
                    callback: () => openWhatsApp(message)
                },
                duration: 8000
            }
        );
    }

    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.setupFloatingLabel(input);
        });
    }

    setupFloatingLabel(input) {
        const wrapper = input.closest('.form-group');
        if (!wrapper) return;

        let label = wrapper.querySelector('label');
        if (!label) {
            label = this.createFloatingLabel(input, wrapper);
        }

        const updateLabel = () => {
            if (input.value.trim() !== '' || input === document.activeElement) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        };

        input.addEventListener('focus', updateLabel);
        input.addEventListener('blur', updateLabel);
        input.addEventListener('input', updateLabel);
        updateLabel();
    }

    createFloatingLabel(input, wrapper) {
        const label = document.createElement('label');
        label.textContent = input.placeholder || input.name;
        label.setAttribute('for', input.id);
        label.className = 'floating-label';
        wrapper.insertBefore(label, input);
        return label;
    }

    setupRealtimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('focus', function() {
                clearFieldError(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });

        // 🔒 Detección en tiempo real de datos sensibles en el mensaje
        const mensajeField = this.form.querySelector('#mensaje');
        if (mensajeField) {
            let sensitiveWarningTimeout = null;
            
            mensajeField.addEventListener('input', function() {
                // Debounce para no mostrar advertencia en cada tecla
                clearTimeout(sensitiveWarningTimeout);
                
                sensitiveWarningTimeout = setTimeout(() => {
                    const text = this.value.trim();
                    
                    if (text.length < 10) return; // No validar textos muy cortos
                    
                    const detection = detectSensitiveData(text);
                    
                    if (detection.hasSensitiveData) {
                        const dataTypes = detection.types.map(type => {
                            const labels = {
                                'dni': 'DNI',
                                'cuit': 'CUIT',
                                'creditCard': 'Tarjeta de Crédito',
                                'password': 'Contraseña'
                            };
                            return labels[type] || type;
                        }).join(', ');
                        
                        console.warn('⚠️ Sensitive data detected:', detection);
                        
                        // Crear elemento de advertencia si no existe
                        let warningElement = this.parentElement.querySelector('.sensitive-data-warning');
                        
                        if (!warningElement) {
                            warningElement = document.createElement('div');
                            warningElement.className = 'sensitive-data-warning';
                            warningElement.style.cssText = `
                                background: #fff3cd;
                                border: 2px solid #ffc107;
                                border-radius: 8px;
                                padding: 12px 15px;
                                margin-top: 10px;
                                display: flex;
                                align-items: start;
                                gap: 10px;
                                animation: slideDown 0.3s ease;
                            `;
                            this.parentElement.appendChild(warningElement);
                        }
                        
                        warningElement.innerHTML = `
                            <span style="font-size: 1.5rem;">⚠️</span>
                            <div style="flex: 1;">
                                <strong style="color: #856404;">Advertencia de Seguridad</strong>
                                <p style="margin: 5px 0 0 0; color: #856404; font-size: 0.9rem;">
                                    Tu mensaje contiene información sensible: <strong>${dataTypes}</strong>.<br>
                                    Por tu seguridad, evita compartir estos datos en formularios.
                                </p>
                            </div>
                        `;
                        
                        // Agregar estilos de animación si no existen
                        if (!document.getElementById('sensitive-data-animation-styles')) {
                            const style = document.createElement('style');
                            style.id = 'sensitive-data-animation-styles';
                            style.textContent = `
                                @keyframes slideDown {
                                    from {
                                        opacity: 0;
                                        transform: translateY(-10px);
                                    }
                                    to {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                    } else {
                        // Remover advertencia si ya no hay datos sensibles
                        const warningElement = this.parentElement.querySelector('.sensitive-data-warning');
                        if (warningElement) {
                            warningElement.remove();
                        }
                    }
                }, 500); // Esperar 500ms después de que el usuario deje de escribir
            });
        }
    }
}

/**
 * Initialize contact form
 */
export function initializeContactForm() {
    const contactForm = $('#contacto-form');
    if (contactForm) {
        return new ContactForm(contactForm);
    }
    return null;
}
