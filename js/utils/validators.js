/**
 * Form validation utilities
 */

/**
 * Validates form data against provided rules
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules
 * @returns {Array} - Array of validation errors
 */
export function validateFormData(data, rules) {
    const errors = [];

    for (const [field, value] of Object.entries(data)) {
        const rule = rules[field];
        if (!rule) continue;

        // Required field validation
        if (rule.required && !value.trim()) {
            errors.push({
                field,
                message: rule.message || `${field} es requerido`
            });
            continue;
        }

        // Email validation
        if (rule.email && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors.push({
                    field,
                    message: rule.message || 'Email inválido'
                });
            }
        }

        // Phone validation
        if (rule.phone && value) {
            const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                errors.push({
                    field,
                    message: rule.message || 'Teléfono inválido'
                });
            }
        }

        // Length validation
        if (rule.minLength || rule.maxLength) {
            const length = value.trim().length;
            if (rule.minLength && length < rule.minLength) {
                errors.push({
                    field,
                    message: rule.message || `Mínimo ${rule.minLength} caracteres`
                });
            }
            if (rule.maxLength && length > rule.maxLength) {
                errors.push({
                    field,
                    message: rule.message || `Máximo ${rule.maxLength} caracteres`
                });
            }
        }

        // Custom validator
        if (rule.validator && typeof rule.validator === 'function') {
            const customError = rule.validator(value);
            if (customError) {
                errors.push({
                    field,
                    message: customError
                });
            }
        }
    }

    return errors;
}

/**
 * Validates a single field
 * @param {HTMLElement} field - The field element to validate
 * @returns {boolean} - True if valid
 */
export function validateField(field) {
    if (!field) return false;

    const value = field.value.trim();
    const type = field.type;
    const required = field.required;

    // Clear previous error
    clearFieldError(field);

    // Required validation
    if (required && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }

    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, ingresa un email válido');
            return false;
        }
    }

    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Por favor, ingresa un teléfono válido');
            return false;
        }
    }

    field.classList.remove('error');
    return true;
}

/**
 * Shows error message for a field
 * @param {HTMLElement} field - The field element
 * @param {string} message - Error message
 */
export function showFieldError(field, message) {
    if (!field) return;

    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);
}

/**
 * Clears error message for a field
 * @param {HTMLElement} field - The field element
 */
export function clearFieldError(field) {
    if (!field) return;

    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Clears all field errors in the form
 */
export function clearAllFieldErrors() {
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

/**
 * Highlights fields with errors
 * @param {Array} errors - Array of error objects
 */
export function highlightErrorFields(errors) {
    errors.forEach(error => {
        const field = document.querySelector(`[name="${error.field}"]`);
        if (field) {
            field.classList.add('error');
            showFieldError(field, error.message);
        }
    });
}
