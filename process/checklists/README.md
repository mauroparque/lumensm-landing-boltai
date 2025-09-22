# Checklists de calidad (funcional, accesibilidad, performance, seguridad, código)

Listas de verificación estandarizadas para aplicar en Plan y en Revisión (Gate 2 y Gate 3). Incluyen “qué chequear” y “qué evidencia adjuntar” para aprobación.

## Índice
- [Cómo usar](#cómo-usar)
- [Funcionalidad](#funcionalidad)
- [Accesibilidad (WCAG 2.1 AA)](#accesibilidad-wcag-21-aa)
- [Performance](#performance)
- [Seguridad](#seguridad)
- [Código](#código)
- [Criterios de rechazo automático](#criterios-de-rechazo-automático)

---

## Cómo usar
- En Plan (Gate 2): incluir qué items aplican y cómo se validarán (con herramientas y umbrales).  
- En Revisión (Gate 3): marcar CUMPLE/NO CUMPLE cada ítem y adjuntar evidencias (scores, outputs, capturas).  
- Si un ítem no aplica, justificar brevemente “N/A por X”.

---

## Funcionalidad
Chequear
- [ ] Flujo principal y alternos cumplen la especificación del Plan.  
- [ ] Responsive correcto (mobile/tablet/desktop).  
- [ ] Cross‑browser mínimo (Chrome, Firefox, Safari).  
- [ ] Sin errores visibles en consola.  
- [ ] Estados vacíos y de error manejados adecuadamente.  
- [ ] Formularios: validación por campo, mensajes claros, prevención de doble submit.

Evidencias
- Capturas de flujo principal y de error.  
- Registro de pruebas manuales (pasos y resultados).  
- Resumen de consola (si hubo errores, cómo se resolvieron).

---

## Accesibilidad (WCAG 2.1 AA)
Chequear
- [ ] Contraste: texto normal ≥ 4.5:1, UI grande ≥ 3:1.  
- [ ] Teclado: navegación completa y sin trampas de foco.  
- [ ] Foco visible en todos los interactivos (≥ 2px y contraste suficiente).  
- [ ] Imágenes: alt adecuado; decorativas con alt="".  
- [ ] Formularios: `label` asociado, `aria-describedby` para errores, `aria-invalid` cuando corresponda.  
- [ ] Estructura: un `<h1>` por página; jerarquía H2→H3 lógica; landmarks semánticos.  
- [ ] Estados y anuncios: feedback al usuario claro y programático.

Evidencias
- Resultados axe (violations 0 o listado con severidad y justificación).  
- Capturas de foco y contraste.  
- Notas de lector de pantalla (opcional pero recomendable).

---

## Performance
Chequear
- [ ] Lighthouse Performance ≥ 90 en mobile y desktop.  
- [ ] Best Practices ≥ 90.  
- [ ] Core Web Vitals en rangos verdes (LCP/CLS/INP).  
- [ ] Imágenes optimizadas (formato, tamaño), `loading="lazy"` y `decoding="async"`.  
- [ ] CSS/JS minificado; scripts no críticos con `defer/async`.  
- [ ] Fuentes con `font-display: swap`; limitar variantes.  
- [ ] Terceros minimizados y/o cargados de forma no bloqueante.

Evidencias
- Scores Lighthouse (mobile/desktop).  
- Anotaciones de tamaño de recursos agregados y optimizaciones aplicadas.

---

## Seguridad
Chequear
- [ ] Sin secretos en el repo (claves/tokens/passwords).  
- [ ] Validación de entradas y escape de salidas (evitar XSS).  
- [ ] No usar `innerHTML` con input de usuario; si es inevitable, sanitizar y justificar.  
- [ ] CSRF protegido (si aplica) y manejo correcto de tokens.  
- [ ] Headers de seguridad (CSP/X‑Frame/X‑Content‑Type/HSTS) en entorno de deploy.  
- [ ] Dependencias sin vulnerabilidades altas/críticas; versiones seguras.  
- [ ] CORS configurado al mínimo necesario.  
- [ ] Errores no exponen información sensible.

Evidencias
- `npm audit` (resumen), escaneo de secretos (resultado), revisión de puntos XSS/CSRF.  
- Diff o config donde se apliquen headers (si corresponde).  
- Justificación de “N/A” cuando no aplique (p.ej., sin backend propio).

---

## Código
Chequear
- [ ] HTML válido y semántico; `lang="es"`, metas correctas.  
- [ ] CSS válido, BEM, mobile‑first, sin selectores costosos.  
- [ ] JS/TS con módulos ES, sin errores de consola, sin globals innecesarias.  
- [ ] Estructura clara, nombres consistentes; comentarios en lógica compleja.  
- [ ] Commits atómicos y descriptivos; PR asociado a la TAREA.

Evidencias
- Salidas de linters/validators y breve resumen de cambios estructurales.  
- Enlace a PR/commit (si aplica).

---

## Criterios de rechazo automático
- Secretos en código o configuración.  
- Vulnerabilidades altas/críticas no resueltas.  
- A11y por debajo de mínimos (p.ej., foco invisible, contrastes insuficientes).  
- Performance muy por debajo del presupuesto (p.ej., Lighthouse < 70) sin mitigación.  
- Errores funcionales que impiden tareas principales.  
- Entrega sin diffs exactos o sin evidencias reproducibles.