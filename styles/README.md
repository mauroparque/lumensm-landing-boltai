# 📐 Arquitectura CSS Modular - Lumen Salud Mental

## 🎯 Visión General

Este proyecto implementa una **arquitectura CSS modular** basada en principios ITCSS (Inverted Triangle CSS) y BEM, dividiendo los ~2000 líneas de CSS monolítico en **24 archivos organizados** por función y responsabilidad.

---

## 📁 Estructura de Carpetas

```
styles/
├── main.css                    # 🎯 Archivo principal (imports)
├── main-monolithic.css         # 📦 Backup del CSS original
├── components.css              # ⚠️  Deprecated (migrado a /components/)
│
├── base/                       # 🏗️  FUNDAMENTOS
│   ├── variables.css           # Design tokens y variables CSS
│   ├── reset.css               # Normalización de estilos
│   └── typography.css          # Tipografía base
│
├── layout/                     # 🗂️  ESTRUCTURAS PRINCIPALES
│   ├── navbar.css              # Barra de navegación
│   ├── footer.css              # Pie de página
│   └── carousel.css            # Sistema de carrusel
│
├── components/                 # 🧩 COMPONENTES REUTILIZABLES
│   ├── buttons.css             # Botones y CTAs
│   ├── cards.css               # Tarjetas (service, blog, process, etc)
│   ├── forms.css               # Formularios y campos
│   ├── faq.css                 # Acordeón FAQ
│   ├── badges.css              # Badges y avisos
│   └── animations.css          # Animaciones y transiciones
│
├── sections/                   # 📄 SECCIONES ESPECÍFICAS
│   ├── section-header.css      # Headers de secciones
│   ├── hero.css                # Sección Hero
│   ├── services.css            # Servicios
│   ├── about.css               # Quiénes somos
│   ├── testimonials.css        # Testimonios
│   ├── blog.css                # Blog/Noticias
│   ├── contact.css             # Contacto
│   └── faq.css                 # FAQ section
│
└── utilities/                  # 🛠️  UTILIDADES
    ├── accessibility.css       # Accesibilidad (a11y)
    └── responsive.css          # Media queries globales
```

---

## 🔄 Orden de Carga (Cascada Intencional)

El archivo `main.css` importa los módulos en un orden específico siguiendo el principio **ITCSS**:

```css
/* 1. BASE - Fundamentos (mayor alcance, menor especificidad) */
@import 'base/variables.css';      /* Design tokens */
@import 'base/reset.css';           /* Normalización */
@import 'base/typography.css';      /* Tipografía base */

/* 2. LAYOUT - Estructura principal */
@import 'layout/navbar.css';
@import 'layout/footer.css';
@import 'layout/carousel.css';

/* 3. COMPONENTS - Reutilizables */
@import 'components/buttons.css';
@import 'components/cards.css';
@import 'components/forms.css';
@import 'components/faq.css';
@import 'components/badges.css';
@import 'components/animations.css';

/* 4. SECTIONS - Específicas */
@import 'sections/section-header.css';
@import 'sections/hero.css';
@import 'sections/services.css';
@import 'sections/about.css';
@import 'sections/testimonials.css';
@import 'sections/blog.css';
@import 'sections/contact.css';
@import 'sections/faq.css';

/* 5. UTILITIES - Overrides (menor alcance, mayor especificidad) */
@import 'utilities/accessibility.css';
@import 'utilities/responsive.css';
```

### ¿Por qué este orden?

1. **Variables primero**: Tokens disponibles para todos
2. **Reset después**: Normaliza navegadores
3. **Layout**: Define estructura antes que contenido
4. **Components**: Reutilizables en cualquier sección
5. **Sections**: Estilos específicos por página
6. **Utilities al final**: Pueden sobrescribir todo

---

## 🎨 Sistema de Variables (Design Tokens)

Todas las variables CSS están centralizadas en `base/variables.css`:

```css
:root {
    /* Colores primarios */
    --primary-color: #178E79;
    --primary-light: #20A085;
    --primary-dark: #0F6B5C;
    
    /* Espaciado */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    
    /* Sombras */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    
    /* Transiciones */
    --transition-fast: 0.15s ease;
    --transition-base: 0.3s ease;
    
    /* Z-Index Scale */
    --z-navbar: 1000;
    --z-whatsapp: 1001;
}
```

### Beneficios:
- ✅ Cambio global en un solo lugar
- ✅ Consistencia visual garantizada
- ✅ Fácil implementación de temas (dark mode)
- ✅ Mejor mantenibilidad

---

## 🧩 Convenciones de Nomenclatura

### BEM (Block Element Modifier)

```css
/* Block */
.service-card { }

/* Element */
.service-card__icon { }

/* Modifier */
.service-card--featured { }
```

### Clases Utilitarias

```css
.fade-in-up { }
.is-active { }
.visible { }
```

---

## 📊 Métricas de Mejora

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Archivos CSS** | 2 (main.css + components.css) | 24 módulos | +1100% |
| **Líneas por archivo** | 1732 (main.css) | ~50-150 por módulo | -90% |
| **Mantenibilidad** | Difícil | Excelente | ✅ |
| **Reutilización** | Baja | Alta | ✅ |
| **Debugging** | Complejo | Simple | ✅ |
| **Carga selectiva** | Imposible | Posible | ✅ |

---

## 🛠️ Guía de Uso

### Agregar un nuevo componente

1. Crear archivo en `components/`:
```bash
# PowerShell
New-Item styles/components/mi-componente.css
```

2. Agregar estilos:
```css
/* components/mi-componente.css */
.mi-componente {
    padding: var(--spacing-md);
    background-color: var(--white);
}
```

3. Importar en `main.css`:
```css
@import 'components/mi-componente.css';
```

### Modificar variables globales

Editar `base/variables.css`:
```css
:root {
    --primary-color: #nuevo-color;
}
```

Todos los componentes se actualizarán automáticamente.

### Crear una nueva sección

```bash
New-Item styles/sections/mi-seccion.css
```

```css
/* sections/mi-seccion.css */
.mi-seccion {
    padding: 100px 0;
    background: var(--gray-50);
}
```

---

## 🚀 Optimizaciones Futuras

### 1. **PostCSS** para procesamiento

```bash
npm install -D postcss autoprefixer cssnano
```

**Beneficios:**
- Autoprefixer para compatibilidad
- Minificación automática
- Custom properties fallbacks

### 2. **CSS Modules** con Vite

```javascript
// vite.config.js
export default {
    css: {
        modules: {
            scopeBehaviour: 'local'
        }
    }
}
```

### 3. **Migración a Tailwind CSS**

La arquitectura modular actual facilita la migración:

```javascript
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                primary: '#178E79',
                // Importar desde variables.css
            }
        }
    }
}
```

### 4. **Critical CSS**

Extraer CSS crítico para above-the-fold:

```bash
npm install -D critical
```

---

## 🔍 Troubleshooting

### Problema: Estilos no se aplican

**Solución 1**: Verificar orden de imports en `main.css`
```css
/* Variables DEBEN ir primero */
@import 'base/variables.css';
```

**Solución 2**: Limpiar caché del navegador
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### Problema: Variable CSS no funciona

**Verificar:**
1. Variable definida en `:root` en `variables.css`
2. Sintaxis correcta: `var(--nombre-variable)`
3. Archivo de variables importado primero

### Problema: Conflicto de especificidad

**Solución**: Usar selectores menos específicos o `!important` solo en utilities

```css
/* ❌ Evitar */
.section .container .card .button { }

/* ✅ Mejor */
.button { }
.button--primary { }
```

---

## 📈 Comparación Antes/Después

### Antes (Monolítico)

```
styles/
├── main.css (1732 líneas)
└── components.css (327 líneas)
```

**Problemas:**
- ❌ Difícil encontrar estilos específicos
- ❌ Conflictos de especificidad
- ❌ No reutilizable
- ❌ Git diffs extensos
- ❌ Imposible lazy loading

### Después (Modular)

```
styles/
├── main.css (36 líneas - solo imports)
├── base/ (3 archivos)
├── layout/ (3 archivos)
├── components/ (6 archivos)
├── sections/ (8 archivos)
└── utilities/ (2 archivos)
```

**Beneficios:**
- ✅ Búsqueda intuitiva por nombre
- ✅ Baja especificidad
- ✅ Alta reutilización
- ✅ Git diffs claros
- ✅ Carga selectiva posible

---

## 🎓 Recursos y Referencias

### Metodologías CSS

- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [BEM](http://getbem.com/)
- [SMACSS](http://smacss.com/)

### Herramientas

- [PostCSS](https://postcss.org/)
- [Stylelint](https://stylelint.io/)
- [PurgeCSS](https://purgecss.com/)

### Librerías CSS

- [Tailwind CSS](https://tailwindcss.com/)
- [Open Props](https://open-props.style/)
- [UnoCSS](https://unocss.dev/)

---

## 📝 Changelog

### v2.0.0 - Modularización CSS (Octubre 2025)

**Added:**
- ✅ 24 archivos CSS modulares organizados
- ✅ Sistema de variables CSS centralizado
- ✅ Arquitectura ITCSS implementada
- ✅ Documentación completa

**Changed:**
- 🔄 main.css ahora solo imports (36 líneas)
- 🔄 components.css migrado a carpeta components/

**Backup:**
- 📦 main-monolithic.css (CSS original preservado)

---

## 🤝 Contribuir

### Para agregar nuevos estilos:

1. Identificar la categoría (base/layout/component/section/utility)
2. Crear archivo en la carpeta correspondiente
3. Usar variables CSS en lugar de valores hardcodeados
4. Agregar import a `main.css` en el orden correcto
5. Documentar cambios en este README

### Ejemplo de Pull Request:

```markdown
## Agregar componente Modal

- Creado `components/modal.css`
- Usa variables de `base/variables.css`
- Responsive con breakpoints estándar
- Accesible con ARIA y focus trap
```

---

**Proyecto**: Lumen Salud Mental  
**Versión CSS**: 2.0 - Arquitectura Modular  
**Última actualización**: Octubre 2025  
**Mantenedor**: [@mauroparque](https://github.com/mauroparque)

---

## ⭐ Próximos Pasos

1. [ ] Implementar PostCSS para minificación
2. [ ] Agregar CSS linting con Stylelint
3. [ ] Extraer Critical CSS
4. [ ] Implementar dark mode con variables
5. [ ] Migrar a CSS Modules o Tailwind
6. [ ] Agregar tests visuales con Chromatic

**¿Preguntas?** Abre un issue en el repositorio. 🚀
