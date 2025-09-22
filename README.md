# Web Profesional — README (Raíz)

Proyecto web profesional con enfoque en calidad de entrega mediante un flujo de trabajo multi‑agente (Ideación → Planificación → Ejecución → Revisión), integrando accesibilidad, performance y seguridad como requisitos desde el inicio. Este documento es la fuente única de verdad para alineación rápida de personas y agentes.

## Índice
- [Objetivo y Éxito](#objetivo-y-éxito)
- [Estado del Proyecto](#estado-del-proyecto)
- [Flujo Multi‑Agente](#flujo-multi-agente)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Stack y Herramientas](#stack-y-herramientas)
- [Cómo Correr el Proyecto](#cómo-correr-el-proyecto)
- [Validaciones Rápidas](#validaciones-rápidas)
- [Estándares Mínimos](#estándares-mínimos)
- [Convenciones de Trabajo](#convenciones-de-trabajo)
- [Uso en Hilos/Agentes IA](#uso-en-hilosagentes-ia)
- [Roadmap](#roadmap)
- [Notas de Seguridad](#notas-de-seguridad)
- [Licencia](#licencia)

---

## Objetivo y Éxito
- Objetivo: mantener y evolucionar una web profesional, clara y eficaz, con entregas reproducibles y auditables.  
- Éxito =  
  - Entregables consistentes con criterios de aceptación aprobados.  
  - Accesibilidad nivel WCAG 2.1 AA verificada.  
  - Performance móvil y desktop con Lighthouse ≥ 90.  
  - Controles de seguridad básicos (OWASP ASVS L1) aplicados y evidenciados.  
  - Flujo multi‑agente operando con trazabilidad de handoffs.

## Estado del Proyecto
- Estado: activo.  
- En curso: consolidación de flujo multi‑agente y documentación base.  
- Próximo: migración progresiva a React + Vite + TailwindCSS conservando estándares.

## Flujo Multi‑Agente
- Roles: Estratega → Planificador → Implementador → Revisor.  
- Handoffs: Brief → Plan → Entrega (diff + evidencias).  
- Puntos de aprobación (gates): aprobar Brief, aprobar Plan, aprobar Entrega.  
- Documentación del flujo y plantillas: ver `process/README.md`, `process/handoffs/` y `process/prompts/`.

## Estructura de Carpetas
├─ README.md                     # Este documento
├─ process/                      # Manual operativo del flujo
│  ├─ README.md                  # Guía de roles, handoffs, gates y checklists
│  ├─ prompts/                   # Prompts oficiales: estratega/planificador/implementador/revisor
│  ├─ handoffs/                  # Plantillas: brief, plan, entrega
│  └─ checklists/                # Listas de verificación por área
├─ src/                          # Código fuente (HTML/CSS/JS o React)
│  ├─ README.md                  # Convenciones de desarrollo
│  ├─ assets/
│  │  └─ hero/                   # Imágenes optimizadas del hero
│  ├─ components.css             # Estilos de componentes existentes
│  ├─ pages/                     # Páginas adicionales
│  └─ components/                # Componentes reutilizables
├─ docs/                         # Documentación ampliada (opcional)
└─ deploy/                       # Guías de build/deploy (opcional)


## Stack y Herramientas
- Actual: HTML5, CSS3, JavaScript ES6+, Formspree (formularios).  
- Migración planificada: React 18, Vite, TailwindCSS, TypeScript (opcional).  
- Herramientas de soporte: Git, Lighthouse (CLI), axe, linters (HTML/CSS/JS), escáner de secretos.

## Cómo Correr el Proyecto
Opción simple (estático):
Desde la raíz del proyecto
python -m http.server 3000

Abrir en el navegador:
http://localhost:3000

Si existe tooling con Node:
Instalar dependencias
npm install
Servidor de desarrollo
npm run dev

## Validaciones Rápidas
Recomendado como pre‑entrega del Implementador y paso 1 del Revisor:

# Lint/format
npm run lint || true

# Auditoría de dependencias
npm audit --audit-level=moderate || true

# Escaneo de secretos
git-secrets --scan || true

# Accesibilidad y performance (con servidor local corriendo)
lighthouse --chrome-flags="--headless" http://localhost:3000 || true

# Validación HTML/CSS/JS (si hay scripts definidos)
npm run validate:html || true
npm run validate:css || true
npm run lint:js || true


## Estándares Mínimos
- Accesibilidad (WCAG 2.1 AA):  
  - Contraste mínimo 4.5:1 (texto normal) y 3:1 (texto grande).  
  - Navegación completa por teclado, foco visible, roles/labels correctos, alt en imágenes.  
  - Headings semánticos, sin depender solo del color para transmitir información.  
- Performance:  
  - Lighthouse Performance y Best Practices ≥ 90.  
  - Imágenes optimizadas (WebP/AVIF), lazy loading, CSS/JS minificado, carga no bloqueante.  
- Seguridad (baseline OWASP ASVS L1):  
  - Sin secretos hardcodeados; variables sensibles en entorno (.env).  
  - Validación y escape de entradas/salidas; mitigación XSS/CSRF; CORS/headers razonables.  
  - Dependencias sin vulnerabilidades críticas/altas.

Detalles extendidos en `process/checklists/`.

## Convenciones de Trabajo
- Ramas Git:  
  - `main` estable.  
  - `feat/nombre-feature`, `fix/descripcion-bug`, `chore/tarea`.  
- Commits:  
  - `feat(scope): descripción` / `fix(scope): descripción` / `docs/readme`: cambios de docs.  
- Trazabilidad por feature:  
  - Archivos de handoff: `FEAT-001-brief.md`, `FEAT-001-plan.md`, `FEAT-001-entrega.md`.  
  - Cada entrega mapea explícitamente a criterios de aceptación.

## Uso en Hilos/Agentes IA
Pegar este bloque al inicio de cada hilo del agente correspondiente:

PROYECTO: Web Profesional (flujo multi‑agente)
STACK: HTML/CSS/JS → Migración a React + Vite + TailwindCSS
ESTÁNDARES: WCAG 2.1 AA, Performance ≥ 90, Seguridad baseline (OWASP ASVS L1)
ROL: [Estratega | Planificador | Implementador | Revisor]
TAREA: [ID y título de la feature]
HANDOFF: [Enlace a brief/plan/entrega según etapa]
REQUISITOS EXTRA: Enfoque en no introducir fallas de seguridad; evidencias de validación.

Guías y plantillas: ver `process/README.md`, `process/handoffs/` y `process/prompts/`.

## Roadmap
- Fase 1: Consolidar flujo y checklists, asegurar trazabilidad.  
- Fase 2: Migración por módulos a React + Vite + TailwindCSS (incremental).  
- Fase 3: Automatizaciones de CI (lint, audit, lighthouse) y pre‑commit hooks.

## Notas de Seguridad
- Nunca incluir claves, tokens o contraseñas en el código ni en ejemplos.  
- Usar variables de entorno para configuración sensible (e.g., endpoints, claves).  
- Formularios: validar en cliente y servidor; escapar output; considerar CSRF en endpoints sensibles.  
- Revisar y actualizar dependencias periódicamente; bloquear versiones seguras.

## Licencia
Pendiente de definir según necesidades del proyecto (privado/propietario u OSS).

---