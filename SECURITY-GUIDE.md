# 🔒 Guía de Seguridad para Desarrolladores

## Implementaciones Recientes (Oct 2025)

Este documento describe las medidas de seguridad implementadas y cómo usarlas correctamente.

---

## 🚀 Inicio Rápido

### 1. Módulo de Sanitización

```javascript
import { 
    sanitizeInput, 
    isValidEmail, 
    isSpam 
} from './js/utils/sanitizer.js';

// Ejemplo: Validar email
if (!isValidEmail(userEmail)) {
    showError('Email inválido');
}

// Ejemplo: Sanitizar input
const cleanInput = sanitizeInput(userInput);

// Ejemplo: Detectar spam
if (isSpam(message)) {
    console.warn('Spam detected');
}
```

### 2. Configuración de Contactos

```javascript
import { 
    generateWhatsAppURL, 
    CONTACTS 
} from './js/config/contacts.js';

// Ejemplo: Generar link de WhatsApp
const waLink = generateWhatsAppURL('Hola, necesito ayuda');

// Ejemplo: Obtener número de teléfono
const phone = CONTACTS.whatsapp.displayNumber;
```

### 3. Formulario con Seguridad

El formulario de contacto ya incluye:
- ✅ Sanitización automática
- ✅ Rate limiting (1 min entre envíos)
- ✅ Detección de spam
- ✅ Honeypot anti-bot
- ✅ Validación robusta

No requiere configuración adicional, funciona automáticamente.

---

## 📋 Checklist Pre-Deploy

Antes de hacer deploy a producción:

- [ ] Ejecutar `npm audit`
- [ ] Verificar que CSP no bloquee recursos necesarios
- [ ] Probar formulario de contacto
- [ ] Verificar que honeypot esté oculto
- [ ] Confirmar que rate limiting funciona
- [ ] Revisar logs en consola (no debe haber errores)

---

## 🛠️ Testing

### Test del Módulo de Sanitización

```bash
# Abrir index.html en navegador
# Abrir consola de desarrollador
# Importar tests
import('./js/utils/sanitizer.test.js');
```

### Test Manual del Formulario

1. Llenar formulario con datos válidos → Debe enviar
2. Llenar formulario 2 veces en <1 minuto → Debe bloquear
3. Intentar enviar con `<script>` en nombre → Debe rechazar
4. Intentar enviar spam → Debe detectar

---

## 🔧 Configuración del Servidor

### Nginx

```nginx
# /etc/nginx/sites-available/lumensaludmental

add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://formspree.io; frame-ancestors 'none';" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Apache

```apache
# .htaccess

<IfModule mod_headers.c>
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://formspree.io; frame-ancestors 'none';"
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

---

## 🚨 Manejo de Incidentes

### Si se detecta actividad sospechosa:

1. **Verificar logs en consola del navegador**
   - Buscar mensajes de `🚨 Spam detected`
   - Verificar bloqueos por rate limiting

2. **Revisar Formspree**
   - Acceder a dashboard de Formspree
   - Verificar submissions sospechosas

3. **Actualizar whitelist**
   - Editar `js/config/contacts.js`
   - Agregar/remover dominios permitidos

---

## 📊 Monitoreo

### Métricas a monitorear:

1. **Intentos de spam bloqueados**
   - Ver consola: `🚨 Spam detected`

2. **Bloqueos por rate limiting**
   - Ver consola: `Rate limit exceeded`

3. **Errores CSP**
   - Ver consola: `Content Security Policy violation`

4. **Honeypot activado**
   - Ver consola: `🚨 Spam detected via honeypot`

---

## 🔑 Secrets y Configuración

### Variables a configurar:

```javascript
// js/config/contacts.js
export const CONTACTS = {
    whatsapp: {
        number: '543547340673', // ← Actualizar si cambia
    },
    email: {
        main: 'contacto@lumensaludmental.com' // ← Actualizar si cambia
    }
};

export const FORMSPREE = {
    endpoint: 'https://formspree.io/f/xnngadeq' // ← Actualizar si cambia
};
```

**IMPORTANTE:** Estos valores están en el código porque no son secretos críticos. El endpoint de Formspree es público por diseño.

---

## 🎯 Mejores Prácticas

### DO ✅

- Usar `sanitizeInput()` antes de mostrar datos de usuario
- Validar emails con `isValidEmail()`
- Usar `generateWhatsAppURL()` para links de WhatsApp
- Probar el formulario después de cada cambio
- Revisar la consola durante desarrollo

### DON'T ❌

- No usar `innerHTML` con datos de usuario
- No deshabilitar CSP sin revisar alternativas
- No remover el honeypot field
- No modificar rate limiting sin considerar UX
- No ignorar advertencias en consola

---

## 📖 Recursos Adicionales

- [SECURITY.md](./SECURITY.md) - Informe completo de seguridad
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Reference](https://content-security-policy.com/)
- [Formspree Docs](https://help.formspree.io/)

---

## 🤝 Contribuir

Si encuentras un problema de seguridad:

1. **NO** crear issue público en GitHub
2. Enviar email a: security@lumensaludmental.com
3. Describir el problema detalladamente
4. Incluir pasos para reproducir

Responderemos en 24 horas hábiles.

---

**Última actualización:** 1 de Octubre, 2025
