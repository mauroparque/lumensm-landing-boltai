# JavaScript Modular Architecture

## 📁 Estructura de Archivos

```
js/
├── main.js                    # Entry point principal
├── main.backup.js             # Backup del archivo original
│
├── utils/                     # Utilidades reutilizables
│   ├── debounce.js           # Función debounce
│   ├── validators.js          # Validaciones de formulario
│   └── dom.js                 # Utilidades DOM
│
├── modules/                   # Módulos funcionales
│   ├── navigation.js         # Navegación y menú móvil
│   ├── animations.js         # Scroll animations (IntersectionObserver)
│   ├── carousel.js           # Sistema de carousel
│   ├── forms.js              # Formularios y validación
│   ├── notifications.js      # Sistema de notificaciones
│   ├── faq.js                # Acordeón FAQ
│   └── whatsapp.js           # Integración WhatsApp
│
└── config/                    # Configuración (futuro)
    └── constants.js           # Constantes globales
```

## 🎯 Ventajas de la Nueva Arquitectura

### 1. **Modularidad**
- Código organizado en módulos independientes
- Fácil de mantener y actualizar
- Cada módulo tiene una responsabilidad única

### 2. **Reutilización**
- Componentes pueden reutilizarse en diferentes partes
- Fácil de exportar a otros proyectos

### 3. **Testabilidad**
- Módulos pequeños son más fáciles de testear
- Preparado para implementar tests unitarios

### 4. **Preparado para React**
- Estructura similar a componentes React
- Migración más sencilla en el futuro
- Ya usa imports/exports ES6

### 5. **Mejor Performance**
- Módulos se cargan según necesidad
- Tree-shaking automático con bundlers
- Código más limpio = menos bytes

## 📦 Módulos Disponibles

### **Navigation Module** (`navigation.js`)
```javascript
import { initNavigation } from './modules/navigation.js';

// Inicializar
const nav = initNavigation();

// Métodos disponibles:
// - toggleMobileMenu()
// - closeMobileMenu()
```

**Funcionalidades:**
- ✅ Menú móvil responsive
- ✅ Smooth scrolling
- ✅ Navbar con efecto scroll
- ✅ Botón "volver arriba"

---

### **Carousel Module** (`carousel.js`)
```javascript
import { Carousel, initializeCarousels } from './modules/carousel.js';

// Inicializar todos los carousels
initializeCarousels();

// O crear uno específico
const carousel = new Carousel(element, {
    autoplay: true,
    interval: 8000
});
```

**Funcionalidades:**
- ✅ Navegación con flechas
- ✅ Indicadores (dots)
- ✅ Autoplay configurable
- ✅ Touch/swipe support
- ✅ Keyboard navigation
- ✅ Accesibilidad completa

---

### **Forms Module** (`forms.js`)
```javascript
import { ContactForm, initializeContactForm } from './modules/forms.js';

// Inicializar formulario de contacto
const form = initializeContactForm();
```

**Funcionalidades:**
- ✅ Validación en tiempo real
- ✅ Floating labels
- ✅ Mensajes de error personalizados
- ✅ Integración con Formspree
- ✅ Opción de WhatsApp post-envío

---

### **Notifications Module** (`notifications.js`)
```javascript
import { showNotification } from './modules/notifications.js';

// Mostrar notificación
showNotification('Mensaje enviado!', 'success', {
    duration: 5000,
    action: {
        text: 'Deshacer',
        callback: () => console.log('Acción ejecutada')
    }
});
```

**Tipos disponibles:**
- `success` - Verde ✅
- `error` - Rojo ❌
- `info` - Azul ℹ️
- `warning` - Amarillo ⚠️

---

### **FAQ Module** (`faq.js`)
```javascript
import { initializeFAQ } from './modules/faq.js';

// Inicializar FAQ
const faq = initializeFAQ();
```

**Funcionalidades:**
- ✅ Acordeón animado
- ✅ Solo una pregunta abierta a la vez
- ✅ Soporte de teclado
- ✅ Atributos ARIA

---

### **WhatsApp Module** (`whatsapp.js`)
```javascript
import { openWhatsApp, setupWhatsAppIntegration } from './modules/whatsapp.js';

// Abrir WhatsApp con mensaje personalizado
openWhatsApp('Hola! Quiero más información');

// Configurar todos los botones
setupWhatsAppIntegration();
```

---

## 🛠️ Utilidades

### **Debounce** (`utils/debounce.js`)
```javascript
import { debounce } from './utils/debounce.js';

const handleScroll = debounce(() => {
    console.log('Scroll event');
}, 100);

window.addEventListener('scroll', handleScroll);
```

### **Validators** (`utils/validators.js`)
```javascript
import { 
    validateFormData, 
    validateField,
    showFieldError,
    clearFieldError 
} from './utils/validators.js';

// Validar datos
const errors = validateFormData(data, rules);

// Validar campo individual
validateField(inputElement);
```

### **DOM Helpers** (`utils/dom.js`)
```javascript
import { $, $$, smoothScrollTo, prefersReducedMotion } from './utils/dom.js';

// Selectors más cortos
const element = $('#mi-id');
const elements = $$('.mi-clase');

// Smooth scroll
smoothScrollTo('#seccion', 70);

// Check reduced motion preference
if (prefersReducedMotion()) {
    // Desactivar animaciones
}
```

---

## 🔄 Migración desde el Código Original

### **Antes** (942 líneas monolíticas)
```javascript
// main.js - Todo en un archivo
function debounce() { }
function initNavigation() { }
function initCarousel() { }
function validateForm() { }
// ... 900+ líneas más
```

### **Después** (Modular)
```javascript
// main.js - Solo 70 líneas
import { initNavigation } from './modules/navigation.js';
import { initializeCarousels } from './modules/carousel.js';
// ...

initializeApp();
```

---

## 🧪 Testing (Futuro)

Con esta estructura, es fácil agregar tests:

```javascript
// tests/carousel.test.js
import { Carousel } from '../modules/carousel.js';
import { describe, it, expect } from 'vitest';

describe('Carousel', () => {
    it('should initialize correctly', () => {
        const carousel = new Carousel(element);
        expect(carousel.currentIndex).toBe(0);
    });
});
```

---

## 📊 Comparación de Tamaños

| Archivo | Líneas | Peso |
|---------|--------|------|
| **main.js (original)** | 942 | ~35 KB |
| **main.js (nuevo)** | 70 | ~3 KB |
| **Total modular** | ~800 | ~28 KB |

**Ventaja**: Reducción del 20% + mejor organización

---

## 🚀 Próximos Pasos

1. **Implementar Tests Unitarios**
   - Vitest o Jest
   - Coverage reports

2. **Agregar Build Process**
   - Webpack o Vite
   - Minificación automática
   - Tree-shaking

3. **TypeScript** (opcional)
   - Type safety
   - Better IDE support

4. **Migración a React**
   - Estructura ya compatible
   - Componentes listos para convertir

---

## 📝 Notas de Migración

- ✅ Backup creado en `main.backup.js`
- ✅ Todos los módulos usan ES6 imports/exports
- ✅ Compatibilidad con navegadores modernos
- ⚠️ Requiere servidor local para funcionar (CORS)
- ⚠️ No funciona con `file://` protocol

---

## 🔧 Configuración del HTML

El HTML debe cargar el script como módulo:

```html
<!-- Antes -->
<script src="js/main.js" defer></script>

<!-- Después -->
<script type="module" src="js/main.js" defer></script>
```

El atributo `type="module"` es **obligatorio** para usar imports/exports.

---

## 💡 Tips de Desarrollo

1. **Usar Live Server** para desarrollo local
2. **Chrome DevTools** para debugging de módulos
3. **Console.log** incluidos para tracking
4. **Error boundaries** implementados

---

## 🆘 Troubleshooting

### Error: "Cannot use import statement outside a module"
**Solución**: Agregar `type="module"` al script tag en HTML

### Error: "CORS policy blocked"
**Solución**: Usar servidor local (Live Server, http-server, etc.)

### Módulos no se cargan
**Solución**: Verificar rutas de imports (usar `.js` extension)

---

## 📞 Soporte

Para dudas sobre la arquitectura modular, consultar:
- [MDN - JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ES6 Modules Guide](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

---

**Última actualización**: Octubre 2025
**Versión**: 2.0 - Arquitectura Modular
