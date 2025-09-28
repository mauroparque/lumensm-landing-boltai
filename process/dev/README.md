# Manual Operativo — Flujo Multi‑Agente

Guía práctica para operar el flujo de 4 etapas (Ideación → Planificación → Ejecución → Revisión) con roles, handoffs, gates de aprobación, checklists y trazabilidad. Este documento estandariza cómo trabajamos personas y agentes, y cómo dejamos evidencia.

## Índice
- [Roles y responsabilidades](#roles-y-responsabilidades)
- [Handoffs (plantillas y campos)](#handoffs-plantillas-y-campos)
- [Gates de aprobación](#gates-de-aprobación)
- [Checklists de calidad](#checklists-de-calidad)
- [Trazabilidad y nombrado](#trazabilidad-y-nombrado)
- [Uso con hilos/agentes IA](#uso-con-hilosagentes-ia)
- [Buenas prácticas](#buenas-prácticas)

---

## Roles y responsabilidades

1) Estratega (Ideación)
- Conversa necesidades, delimita alcance y define “Éxito =”.  
- Entrega: Brief claro y accionable.  
- Criterio de salida: objetivo comprensible, éxito medible, riesgos identificados.

2) Planificador / Prompt‑Engineer (Planificación)
- Convierte el Brief en un Plan operativo con pasos, archivos, criterios y prompts.  
- Añade controles de seguridad, accesibilidad y performance a nivel de plan.  
- Criterio de salida: plan específico, verificable y sin ambigüedades.

3) Implementador (Ejecución)
- Genera/edita código siguiendo el Plan, entrega diffs y evidencias.  
- Aplica controles de seguridad y considera accesibilidad/performance.  
- Criterio de salida: entrega reproducible y mapeada a criterios de aceptación.

4) Revisor (Calidad)
- Verifica funcionalidad, accesibilidad, performance, seguridad y código.  
- Da veredicto OK/NO y acciones correctivas mínimas para aprobar.  
- Criterio de salida: checklist completa y criterios de aceptación cumplidos.

Nota: En equipos pequeños, una persona puede tomar varios roles, manteniendo los puntos de aprobación.

---

## Handoffs (plantillas y campos)

Ubicación de plantillas: process/handoffs/

1) Brief (Estratega → Planificador)
- Objetivo (1–2 oraciones)  
- Éxito = (3–5 bullets medibles)  
- Audiencia y contexto  
- Alcance (Incluye / No incluye)  
- Restricciones (tiempo, herramientas, dependencias)  
- Riesgos y supuestos (+ mitigaciones)  
- Entregables esperados  
- Decisiones abiertas  
Archivo sugerido: process/handoffs/brief-template.md

2) Plan operativo (Planificador → Implementador)
- Resumen del Brief (2–3 oraciones)  
- Pasos numerados (con rutas de archivos exactas)  
- Archivos a crear/modificar (tabla con acción y justificación)  
- Criterios de aceptación (funcional, a11y, perf, seguridad, compatibilidad)  
- Prompts por sub‑tarea para el Implementador  
- Controles de seguridad requeridos (validación/escape, CSRF/XSS, headers, secretos)  
- Plan de validación (manual/automatizada y herramientas)  
- Riesgos técnicos y mitigaciones, supuestos técnicos  
Archivo sugerido: process/handoffs/plan-template.md

3) Entrega (Implementador → Revisor)
- Resumen de cambios (bullets)  
- Diff por archivo (código exacto listo para pegar)  
- Decisiones clave (rationale y alternativas)  
- Evidencias: capturas, mediciones (Lighthouse/axe), logs de comandos  
- Mapeo a criterios de aceptación (checkbox con evidencia)  
- Notas de seguridad (controles aplicados) y impacto a11y/perf  
Archivo sugerido: process/handoffs/entrega-template.md

---

## Gates de aprobación

Gate 1 — Aprobar Brief
- Revisor: Estratega o líder.  
- Revisa: objetivo claro, éxito medible, alcance definido, riesgos y restricciones.  
- Resultado: OK → Plan | NO → iterar Brief con feedback breve y accionable.

Gate 2 — Aprobar Plan
- Revisor: Planificador/líder.  
- Revisa: pasos factibles, archivos correctos, criterios verificables, controles de seguridad/a11y/perf incluidos.  
- Resultado: OK → Implementar | NO → ajustar Plan (dejar supuestos explícitos).

Gate 3 — Aprobar Entrega
- Revisor: Revisor de Calidad.  
- Revisa: checklist completa, criterios cumplidos, sin regresiones ni secretos.  
- Resultado: OK → Listo | NO → devolver con acciones correctivas priorizadas.

---

## Checklists de calidad

Ubicación ampliada: process/checklists/

Funcionalidad
- [ ] Cumple todos los criterios de aceptación  
- [ ] Sin errores visibles en consola  
- [ ] Responsive (mobile/tablet/desktop)  
- [ ] Cross‑browser (Chrome/Firefox/Safari)  
- [ ] Estados de error y vacíos manejados correctamente  
- [ ] Formularios validan y envían correctamente

Accesibilidad (WCAG 2.1 AA)
- [ ] Contraste: 4.5:1 (texto), 3:1 (UI grande)  
- [ ] Navegación por teclado completa, sin trampas de foco  
- [ ] Foco visible en elementos interactivos  
- [ ] Alt text en imágenes informativas; decorativas con alt=""  
- [ ] Labels/roles correctos en formularios e interactivos  
- [ ] Headings semánticos con jerarquía lógica  
- [ ] Sin dependencia exclusiva del color

Performance
- [ ] Lighthouse Performance ≥ 90 (mobile y desktop)  
- [ ] Best Practices ≥ 90  
- [ ] Core Web Vitals en rangos verdes  
- [ ] Imágenes optimizadas y lazy loading  
- [ ] CSS/JS minificado y carga no bloqueante  
- [ ] Caching/headers razonables; fuentes con font-display: swap  
- [ ] Terceros minimizados y async/defer

Seguridad (baseline)
- [ ] Sin secretos hardcodeados (claves/tokens/passwords)  
- [ ] Validación de entradas y escape de salidas (prevención de XSS)  
- [ ] CSRF protegido en formularios sensibles  
- [ ] Content‑Security‑Policy y security headers razonables  
- [ ] HTTPS y redirecciones forzadas (si aplica)  
- [ ] Dependencias sin vulnerabilidades críticas/altas  
- [ ] CORS restrictivo según necesidad  
- [ ] Errores no exponen información sensible

Código
- [ ] HTML válido, semántico y con lang correcto  
- [ ] CSS válido, BEM y mobile‑first  
- [ ] JS ES6+ sin errores en consola y sin globals innecesarias  
- [ ] Estructura clara, comentarios en lógica compleja  
- [ ] Commits atómicos y descriptivos

Comandos sugeridos (para evidencias)
- Lint/format: npm run lint  
- Auditoría deps: npm audit --audit-level=moderate  
- Secretos: git-secrets --scan  
- Perf/A11y: lighthouse (CLI), axe  
- Validadores: html-validate, stylelint, eslint

---

## Trazabilidad y nombrado

Estructura de nombres
- Tarjetas/Hilos: FEAT-001: Título claro  
- Branches: feat/xxx, fix/xxx, chore/xxx  
- Handoffs: FEAT-001-brief.md, FEAT-001-plan.md, FEAT-001-entrega.md

Reglas de enlace
- Cada handoff enlaza al anterior (Brief → Plan → Entrega).  
- La Entrega incluye enlaces a PR/commits y a mediciones/evidencias.  
- La tarjeta del tablero enlaza a los handoffs y al PR correspondiente.

Registro mínimo por feature
- Estado (Ideación/Plan/En curso/Revisión/Listo)  
- Responsable actual (rol)  
- Fecha de cada gate (con veredicto y quién aprueba)  
- Notas de decisiones clave y supuestos

---

## Uso con hilos/agentes IA

Bloque de inicio (pegar en cada hilo)

PROYECTO: Web Profesional (flujo multi‑agente)
ROL: [Estratega | Planificador | Implementador | Revisor]
TAREA: [ID y título de la feature]
HANDOFF: [Enlace a brief/plan/entrega según etapa]
ESTÁNDARES: WCAG 2.1 AA, Lighthouse ≥ 90, Seguridad baseline (ASVS L1)
REQUISITOS: No introducir fallas de seguridad; aportar evidencias de validación.

Por etapa
- Hilo del Estratega: pegar y completar la plantilla de Brief; cerrar con “Éxito = …”.  
- Hilo del Planificador: pegar Brief aprobado y generar Plan con prompts por sub‑tarea + controles de seguridad.  
- Hilo del Implementador: pegar Plan; entregar diff por archivo, notas, evidencias y mapeo a criterios.  
- Hilo del Revisor: pegar Entrega; correr checklist, veredicto y acciones correctivas (si aplica).

Nota: Si la herramienta IA no accede al repo, se copia/pega el contenido necesario (brief/plan/diff/evidencias) en el hilo correspondiente.

---

## Buenas prácticas

- Claridad antes de velocidad: no avanzar sin “Éxito = …” medible.  
- Un cambio, una tarjeta: facilita revisión y revert.  
- Evidencias siempre: capturas, mediciones y logs de comandos.  
- Seguridad por defecto: sin secretos, validar entradas, escape de salidas, headers.  
- Mantener las plantillas: evitar texto suelto sin campos obligatorios.  
- Retrospectiva breve por feature: qué mejorar del flujo en 3 bullets.

---
