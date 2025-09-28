// ================================
// LUMEN SALUD MENTAL - JAVASCRIPT CORREGIDO
// ================================

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cache DOM elements for better performance
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Mobile Navigation
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Optimized scroll handler with debouncing
const handleScroll = debounce(() => {
    const scrollY = window.scrollY;

    // Navbar scroll effect
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Show/hide scroll to top button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        if (scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
}, 16);

// Single scroll event listener with passive option for better performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to top functionality
function createScrollToTopButton() {
    if (document.querySelector('.scroll-to-top')) return;
    
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
}

// Enhanced Intersection Observer for animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .blog-card, .testimonial-card, .about-text, .contact-info').forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

// Image error handling
function setupImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            placeholder.textContent = 'Imagen no disponible';
            if (this.parentNode) {
                this.parentNode.insertBefore(placeholder, this);
            }
            console.warn('Failed to load image:', this.src);
        });
    });
}

// ===== FORMULARIO CORREGIDO - SOLO UNA VERSIÓN =====
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // ÚNICO addEventListener para submit con Formspree
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Validación antes del envío
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        const validationRules = {
            nombre: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                message: 'Nombre debe contener solo letras'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido'
            },
            telefono: {
                pattern: /^[\d\s\-\+\(\)]+$/,
                message: 'Teléfono inválido'
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

        // Mostrar loading
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });
            
            if (response.ok) {
                showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                this.reset();
                clearAllFieldErrors();
                
                // Opción WhatsApp después del éxito
                if (data.nombre && data.mensaje) {
                    const whatsappMessage = `Hola! Soy ${data.nombre}. ${data.mensaje}`;
                    setTimeout(() => {
                        showWhatsAppOption(whatsappMessage);
                    }, 2000);
                }
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            console.error('Error:', error);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Real-time validation setup
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        setupFloatingLabel(input);
        
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

// Floating labels functionality
function setupFloatingLabel(input) {
    const wrapper = input.closest('.form-group');
    if (!wrapper) return;
    
    const label = wrapper.querySelector('label') || createFloatingLabel(input, wrapper);
    
    function updateLabel() {
        if (input.value.trim() !== '' || input === document.activeElement) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    }
    
    input.addEventListener('focus', updateLabel);
    input.addEventListener('blur', updateLabel);
    input.addEventListener('input', updateLabel);
    updateLabel();
}

function createFloatingLabel(input, wrapper) {
    const label = document.createElement('label');
    label.textContent = input.placeholder || input.name;
    label.setAttribute('for', input.id);
    label.className = 'floating-label';
    wrapper.appendChild(label);
    return label;
}

// Advanced form validation
function validateFormData(data, rules) {
    const errors = [];
    for (const [field, fieldRules] of Object.entries(rules)) {
        const value = data[field]?.trim() || '';
        
        if (fieldRules.required && !value) {
            errors.push({
                field: field,
                message: `${field} es requerido`
            });
            continue;
        }
        
        if (value) {
            if (fieldRules.minLength && value.length < fieldRules.minLength) {
                errors.push({
                    field: field,
                    message: fieldRules.message || `${field} muy corto`
                });
            }
            if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
                errors.push({
                    field: field,
                    message: fieldRules.message || `${field} muy largo`
                });
            }
            if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
                errors.push({
                    field: field,
                    message: fieldRules.message || `${field} formato inválido`
                });
            }
        }
    }
    return errors;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    let error = null;
    switch(fieldName) {
        case 'nombre':
            if (!value || value.length < 2) {
                error = { field: fieldName, message: 'Nombre debe tener al menos 2 caracteres' };
            } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(value)) {
                error = { field: fieldName, message: 'Nombre solo puede contener letras' };
            }
            break;
        case 'email':
            if (!value) {
                error = { field: fieldName, message: 'Email es requerido' };
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = { field: fieldName, message: 'Email inválido' };
            }
            break;
        case 'telefono':
            if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                error = { field: fieldName, message: 'Teléfono inválido' };
            }
            break;
        case 'mensaje':
            if (!value || value.length < 10) {
                error = { field: fieldName, message: 'Mensaje debe tener al menos 10 caracteres' };
            } else if (value.length > 500) {
                error = { field: fieldName, message: 'Mensaje muy largo (máximo 500 caracteres)' };
            }
            break;
    }
    
    if (error) {
        showFieldError(field, error.message);
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearAllFieldErrors() {
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    document.querySelectorAll('.field-error').forEach(error => {
        error.remove();
    });
}

function highlightErrorFields(errors) {
    errors.forEach(error => {
        const field = document.querySelector(`[name="${error.field}"]`);
        if (field) {
            field.classList.add('error');
            showFieldError(field, error.message);
        }
    });
}

// WhatsApp Integration
function openWhatsApp(message = '') {
    const phoneNumber = '543547340673';
    const encodedMessage = encodeURIComponent(message || 'Hola! Me interesa obtener más información sobre los servicios de Lumen Salud Mental.');
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank', 'noopener');
}

function showWhatsAppOption(message) {
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

function setupWhatsAppIntegration() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    document.querySelectorAll('[href*="wa.me"], .whatsapp-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const customMessage = btn.dataset.message || '';
            openWhatsApp(customMessage);
        });
    });
}

// Enhanced notification system
function showNotification(message, type = 'info', options = {}) {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let notificationHTML = `
        <span class="notification-message">${message}</span>
    `;
    
    if (options.action) {
        notificationHTML += `
            <button class="notification-action" data-action="true">${options.action.text}</button>
        `;
    }
    
    notificationHTML += `
        <button class="notification-close" aria-label="Cerrar notificación">&times;</button>
    `;
    
    notification.innerHTML = notificationHTML;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    const actionBtn = notification.querySelector('.notification-action');
    if (actionBtn && options.action?.callback) {
        actionBtn.addEventListener('click', () => {
            options.action.callback();
            notification.remove();
        });
    }
    
    document.body.appendChild(notification);
    
    const duration = options.duration || 5000;
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

function showWelcomeMessage() {
    const styles = [
        'color: #178E79',
        'font-size: 20px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.1)'
    ].join(';');
    
    console.log('%c🌟 Lumen Salud Mental', styles);
    console.log('%cSitio web desarrollado con atención al detalle para ofrecer la mejor experiencia.', 'color: #6b7280; font-size: 14px;');
    console.log('%c💡 ¿Necesitas ayuda técnica? Contacta al desarrollador.', 'color: #3b82f6; font-size: 12px;');
    
    if ('performance' in window) {
        console.log(`%c⚡ Página cargada en ${Math.round(performance.now())} ms`, 'color: #10b981; font-size: 12px;');
    }
}

// Main initialization function
function initializePage() {
    console.log('🚀 Inicializando Lumen Salud Mental...');
    
    try {
        createObserver();
        setupLazyLoading();
        setupImageErrorHandling();
        setupFormHandling();
        setupWhatsAppIntegration();
        createScrollToTopButton();
        createSkipLink();
        showWelcomeMessage();
        
        // Add a small delay to ensure DOM is fully ready
        setTimeout(() => {
            initializeFAQ();
        }, 100);
        
        console.log('✅ Página inicializada correctamente');
        
        if ('performance' in window) {
            const initTime = performance.now();
            console.log(`📊 Inicialización completada en ${Math.round(initTime)} ms`);
        }
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
        showNotification('Error al cargar algunas funcionalidades del sitio', 'error');
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Initialize FAQ functionality
function initializeFAQ() {
    console.log('🔧 Inicializando funcionalidad FAQ...');
    
    const faqButtons = document.querySelectorAll('.faq-question');
    
    if (faqButtons.length === 0) {
        console.warn('⚠️ No se encontraron botones FAQ');
        return;
    }
    
    console.log(`📋 Encontrados ${faqButtons.length} botones FAQ`);
    
    faqButtons.forEach((button, index) => {
        // Remove any existing event listeners to avoid duplicates
        button.replaceWith(button.cloneNode(true));
        const newButton = document.querySelectorAll('.faq-question')[index];
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ FAQ clicked:', this.querySelector('span').textContent);
            toggleFaqItem(this);
        });
        
        // Add keyboard support
        newButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('⌨️ FAQ keyboard activated:', this.querySelector('span').textContent);
                toggleFaqItem(this);
            }
        });
    });
}

// Improved FAQ toggle function
function toggleFaqItem(button) {
    const faqItem = button.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = button.querySelector('.faq-icon');
    
    if (!faqItem || !faqAnswer || !faqIcon) {
        console.error('❌ FAQ elements not found');
        return;
    }
    
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items with staggered timing
    const otherActiveItems = document.querySelectorAll('.faq-item.active');
    otherActiveItems.forEach((item, index) => {
        if (item !== faqItem) {
            setTimeout(() => {
                item.classList.remove('active');
                const otherAnswer = item.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.classList.remove('active');
                }
            }, index * 50); // Stagger the closing by 50ms each
        }
    });
    
    // Toggle current FAQ item with slight delay if closing others
    const toggleDelay = otherActiveItems.length > 1 ? 100 : 0;
    
    setTimeout(() => {
        if (isActive) {
            // Closing animation
            faqAnswer.classList.remove('active');
            setTimeout(() => {
                faqItem.classList.remove('active');
            }, 50);
            console.log('📝 FAQ cerrada con animación fluida');
        } else {
            // Opening animation
            faqItem.classList.add('active');
            setTimeout(() => {
                faqAnswer.classList.add('active');
            }, 50);
            console.log('📝 FAQ abierta con animación fluida');
        }
    }, toggleDelay);
}

// Performance tracking
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`📈 Tiempo total de carga: ${Math.round(loadTime)} ms`);
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Error no manejado:', event.error);
});

// Service Worker placeholder
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Ready for PWA implementation
    });
}
