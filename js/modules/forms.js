/**
 * Forms Module
 * Handles form validation, submission, and floating labels
 */

import { 
    validateFormData, 
    validateField,
    clearFieldError,
    clearAllFieldErrors,
    highlightErrorFields 
} from '../utils/validators.js';
import { showNotification } from './notifications.js';
import { openWhatsApp } from './whatsapp.js';
import { $ } from '../utils/dom.js';

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

        // Validation rules
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
                maxLength: 500,
                message: 'Mensaje debe tener entre 10 y 500 caracteres'
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
                body: formData
            });

            if (response.ok) {
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
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            console.error('Error:', error);
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
