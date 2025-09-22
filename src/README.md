# Convenciones de Desarrollo — src/

Estándares prácticos para trabajar en el código fuente. Contiene pautas para el estado actual (HTML/CSS/JS) y para la migración a React + Vite + TailwindCSS, con foco en seguridad, accesibilidad y performance.

## Índice
- [Estructura de src/](#estructura-de-src)
- [Normas comunes](#normas-comunes)
- [HTML/CSS/JS (estado actual)](#htmlcssjs-estado-actual)
- [React + Vite + Tailwind (migración)](#react--vite--tailwind-migración)
- [Accesibilidad (WCAG 2.1 AA)](#accesibilidad-wcag-21-aa)
- [Performance](#performance)
- [Seguridad de código](#seguridad-de-código)
- [Comandos útiles](#comandos-útiles)
- [Checklist pre‑commit](#checklist-pre-commit)

---

## Estructura de src/
src/
├─ index.html
├─ assets/
│ ├─ hero/ # Imágenes optimizadas del hero
│ ├─ img/ # Otras imágenes (webp/avif preferido)
│ ├─ css/
│ │ ├─ components.css # Estilos de componentes (actual)
│ │ ├─ utils.css # Utilidades: helpers, variables
│ │ └─ main.css # Estilos globales
│ └─ js/
│ ├─ components/ # Módulos por componente
│ ├─ utils/ # Utilidades compartidas
│ └─ main.js # Entry point
├─ pages/ # Páginas adicionales
└─ components/ # Snippets/partials (si aplica)

---

## Normas comunes
- Idioma de documento: `<html lang="es">`.  
- Semántica primero: headings jerárquicos, landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`).  
- Mobile‑first: estilos base móviles y media queries ascendentes.  
- Nombres consistentes: BEM en CSS, PascalCase para componentes React, camelCase para funciones/variables.  
- Nada de secretos en el código (tokens, contraseñas).  
- Siempre validar entradas y escapar salidas antes de renderizar contenido dinámico.  

---

## HTML/CSS/JS (estado actual)

### HTML
- Metas mínimas en `<head>`: charset, viewport, description, título único por página.  
- Imágenes:
  - Usar `<picture>` con WebP/AVIF y fallback.
  - `loading="lazy"` y `decoding="async"`.
  - `alt` descriptivo (vacío si decorativa).  
- Formularios:
  - `label` asociado a `input` por `for`/`id`.
  - Validar en cliente y servidor.
  - Evitar mensajes de error genéricos; indicar el campo y la causa.
- Evitar `innerHTML` con entradas de usuario; preferir `textContent`.

Ejemplo de imagen responsiva
<picture> <source srcset="/src/assets/hero/hero.avif" type="image/avif"> <source srcset="/src/assets/hero/hero.webp" type="image/webp"> <img src="/src/assets/hero/hero.jpg" alt="Equipo de trabajo en sala de reuniones" loading="lazy" decoding="async"> </picture> ```

### CSS
- BEM y utilidades:

/* Bloque */
.card { }

/* Elemento */
.card__title { }
.card__content { }

/* Modificador */
.card--featured { }
.card__title--large { }

- Variables de color con contraste verificado:

:root {
  --primary: #2563eb; /* >=4.5:1 sobre blanco */
  --text: #0f172a;
  --muted: #64748b;
}

- Animaciones con transform/opacity y prefers-reduced-motion:

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

### JavaScript

- Módulos ES6, manejo de errores y sanitización:

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export async function postJson(url, data) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

### React + Vite + Tailwind (migración)

- Estructura sugerida:

src/
├─ app/
│  ├─ App.tsx
│  └─ routes/ (si aplica)
├─ components/
│  ├─ ui/        # piezas reutilizables
│  └─ layout/    # shells/page layouts
├─ lib/          # utilidades
├─ styles/
│  └─ globals.css
└─ main.tsx

- Convenciones React

Componentes en PascalCase (uno por archivo), props tipadas (TypeScript recomendable).
Evitar lógica compleja en JSX; extraer a funciones/hooks.
Estado local con useState/useReducer, efectos bien acotados con useEffect.
Accesibilidad en JSX: roles/labels/aria‑* cuando haga falta; preferir elementos nativos.

Ejemplo de componente accesible:

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const kind = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600'
    : 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-600';
  return (
    <button type="button" className={`${base} ${kind} px-4 py-2`} onClick={onClick}>
      {children}
    </button>
  );
}

- Tailwind

Usar clases utilitarias para layout y espaciado; extraer patrones repetidos a componentes/@apply con moderación.
Paleta accesible (contraste ≥ 4.5:1); verificar variantes hover/focus.
Dark mode si aplica: class strategy y tokens consistentes.

globals.css ejemplo:

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light dark;
}

.prose a { @apply underline underline-offset-2 decoration-slate-400 hover:decoration-slate-600; }

- Vite

Alias de rutas en tsconfig.json/vite.config.ts para imports limpios (@/components, @/lib).
Split de código automático; evitar imports pesados en rutas críticas.
Variables de entorno vía .env con prefijo VITE_ para exponer solo lo necesario.

- Accesibilidad (WCAG 2.1 AA)

Contraste: ≥ 4.5:1 texto normal, ≥ 3:1 texto grande.
Teclado: navegación completa, foco visible, orden lógico de tabulación.
Estructura: un <h1> por página, jerarquía H2→H3 correcta, landmarks definidos.
Formularios: label explícito, mensajes de error claros, aria-invalid/aria-describedby cuando corresponda.
Multimedia: alternativas textuales; evitar autoplay sin control.
Estado/ARIA: solo cuando HTML semántico no alcanza; testear con lector de pantalla.

- Performance

Imágenes: WebP/AVIF, tamaños responsivos (srcset/sizes), loading="lazy".
CSS/JS: minificado, crítico inline cuando corresponda, defer/async en scripts no críticos.
Fuentes: font-display: swap, subset si es posible.
Terceros: cargar solo lo necesario, async/defer, medir impacto.
Medición continua: Lighthouse (mobile/desktop), Core Web Vitals, Perf Budget por página.

- Seguridad de código

No exponer secretos en el repo ni en ejemplos; usar variables de entorno.
Validar entradas y escapar salidas; nunca interpolar HTML sin sanitizar.
Formularios sensibles: protección CSRF del lado servidor; del lado cliente, enviar token si aplica.
Headers (en deploy): CSP, X‑Frame‑Options, X‑Content‑Type‑Options, HSTS.
Dependencias: revisar vulnerabilidades y fijar versiones seguras.
CORS: el mínimo necesario; evitar comodines en producción.

Ejemplo de escape seguro en React

// Correcto: React escapa por defecto el contenido
<div>{userInput}</div>

// Evitar: solo usar dangerouslySetInnerHTML con contenido sanitizado

# Comandos útiles

## Servir estático (estado actual)
python -m http.server 3000

## Lint y validaciones (si hay scripts en package.json)
npm run lint
npm run validate:html
npm run validate:css
npm run lint:js

## Lighthouse CLI (con servidor corriendo)
lighthouse --chrome-flags="--headless" http://localhost:3000

## Auditoría de dependencias
npm audit --audit-level=moderate

# Checklist pre‑commit
 HTML válido y semántico; lang="es", títulos y metas correctas.

 Contraste verificado; navegación por teclado y foco visible.

 Imágenes optimizadas y lazy; tamaños responsivos.

 JS sin errores en consola; sin innerHTML con input de usuario.

 Sin secretos; variables sensibles via entorno.

 Lighthouse ≥ 90 (Performance/Best Practices) y accesibilidad ≥ 90.

 Nombres BEM (CSS), camelCase/PascalCase (JS/TS/React).

 Commits atómicos con mensaje claro y branch por feature.