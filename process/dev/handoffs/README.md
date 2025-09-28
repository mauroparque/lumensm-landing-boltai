# Handoffs (Brief, Plan y Entrega)

Guía práctica para completar los tres handoffs del flujo multi‑agente: Brief (Estratega → Planificador), Plan operativo (Planificador → Implementador) y Entrega (Implementador → Revisor), con criterios de aceptación y ejemplos mínimos por etapa.

## Índice
- [Cómo usar este documento](#cómo-usar-este-documento)
- [Handoff 1: Brief (Estratega → Planificador)](#handoff-1-brief-estratega--planificador)
- [Handoff 2: Plan operativo (Planificador → Implementador)](#handoff-2-plan-operativo-planificador--implementador)
- [Handoff 3: Entrega (Implementador → Revisor)](#handoff-3-entrega-implementador--revisor)
- [Versionado y nombrado](#versionado-y-nombrado)
- [Consejos y errores comunes](#consejos-y-errores-comunes)

---

## Cómo usar este documento
- Cada handoff es un “formulario” con campos obligatorios; completarlo evita ambigüedades y acelera el trabajo asincrónico.  
- Al pasar de etapa, adjuntar el handoff completado en el hilo del agente siguiente y mover la tarjeta al gate correspondiente en el tablero.  
- No mezclar etapas: Brief define el “qué”, Plan define el “cómo”, Entrega demuestra “qué cambió y cómo se validó”.

---

## Handoff 1: Brief (Estratega → Planificador)

Cuándo se usa  
- Al iniciar una feature o cambio relevante; convierte una idea en un objetivo claro con “Éxito = …” medible y un alcance manejable.

Campos obligatorios  
- Objetivo (1–2 oraciones)  
- Éxito = (3–5 bullets medibles)  
- Audiencia y contexto  
- Alcance  
  - Incluye:  
  - No incluye:  
- Restricciones (tiempo, herramientas, dependencias, presupuesto si aplica)  
- Riesgos y supuestos (con mitigaciones)  
- Entregables esperados  
- Decisiones abiertas (qué falta decidir, quién decide, cuándo)  
- Próximas acciones (1–3 pasos para el Planificador)

Criterios de aceptación del Brief (Gate 1)  
- Objetivo comprensible y “Éxito = …” verificable.  
- Alcance acotado con “No incluye” explícito.  
- Restricciones y riesgos identificados con mitigaciones.  
- Entregables claros y decisiones abiertas listadas.

Ejemplo mínimo (resumen)  
- Objetivo: Mejorar el formulario de contacto para aumentar conversiones y cumplir accesibilidad.  
- Éxito =  
  - Tasa de envío ≥ 3% en 30 días.  
  - Errores accesibles con lector de pantalla y foco al primer error.  
  - 0 vulnerabilidades altas/ críticas en auditoría de dependencias.  
- Alcance: UI y validación cliente; no incluye back‑office.  
- Restricciones: stack actual; sin backend propio.  
- Riesgos: spam; mitigación: honeypot/captcha liviano.  
- Próximas acciones: Plan de validación accesible y controles de seguridad.

---

## Handoff 2: Plan operativo (Planificador → Implementador)

Cuándo se usa  
- Tras aprobar el Brief; define pasos concretos, archivos, criterios y sub‑prompts para implementar sin dudas.

Secciones obligatorias  
1) Resumen del Brief (2–3 oraciones)  
2) Pasos numerados (con rutas exactas y dependencias)  
3) Archivos a crear/modificar (tabla con acción y justificación)  
4) Criterios de aceptación (medibles)  
   - Funcional  
   - Accesibilidad (WCAG 2.1 AA concretas)  
   - Performance (Lighthouse ≥ 90 en mobile/desktop)  
   - Seguridad (controles y evidencias)  
   - Compatibilidad (browsers/targets)  
5) Sub‑prompts para Implementador (por sub‑tarea)  
   - Contexto (archivos, estado actual)  
   - Requisitos técnicos (qué producir exactamente)  
   - Controles de seguridad (validación/escape, CSRF/XSS, headers, secretos)  
   - Salida esperada (diffs + notas + evidencias mínimas)  
6) Controles de seguridad requeridos y cómo validarlos  
   - Validación de entradas y escape de salidas (evitar XSS)  
   - CSRF (si aplica), headers (CSP/X‑Frame/X‑Content‑Type), CORS mínimo necesario  
   - Gestión de secretos (nunca en código), dependencias sin vulns altas/críticas  
   - Evidencias: outputs de auditorías, revisión de uso de `innerHTML`, etc.  
7) Plan de validación (evidencias)  
   - Manual: casos de prueba paso a paso (teclado, foco, errores)  
   - Automatizada: Lighthouse/axe/linters/auditoría deps y resultados esperados  
8) Riesgos técnicos y mitigaciones (tabla)  
9) Supuestos técnicos (qué asumís y cuándo revisarlo)

Criterios de aceptación del Plan (Gate 2)  
- Pasos factibles, archivos correctos, criterios verificables y umbrales claros.  
- Controles de seguridad/a11y/perf incluidos con evidencias esperadas.  
- Sub‑prompts autónomos por sub‑tarea; sin necesidad de aclaraciones.  
- Sin código; solo instrucciones precisas.

Ejemplo mínimo (fragmento)  
- Paso 1: “Validar formulario en cliente”  
  - Archivos: `src/components/ContactForm.tsx`, `src/index.css`  
  - Criterios: email válido; foco al primer error; errores con `aria-describedby`  
  - Seguridad: sin `innerHTML`; escapado de salidas  
  - Performance: sin aumentar JS > +10 KB en ruta principal  
  - Evidencias: captura de foco y resultados axe = 0

---

## Handoff 3: Entrega (Implementador → Revisor)

Cuándo se usa  
- Tras aprobar el Plan; demuestra exactamente qué cambió y cómo se validó.

Secciones obligatorias  
1) Resumen ejecutivo (3–5 bullets)  
2) Cambios por archivo (diffs exactos)  
   - Notas: decisiones clave, controles de seguridad/a11y/perf aplicados  
3) Decisiones y dependencias  
   - Qué, por qué, alternativas descartadas; `paquete@versión` (motivo)  
4) Controles de seguridad aplicados  
   - Validación de entradas, escape de salidas; sin secretos; CSRF/XSS/headers/CORS si aplica; auditoría deps sin vulns altas/críticas  
5) Impacto en accesibilidad  
   - Foco visible, teclado completo, labels/roles/aria, alt, contraste ≥ 4.5:1  
6) Impacto en performance  
   - Recursos agregados (peso), optimización, score esperado Lighthouse  
7) Evidencias de validación  
   - Outputs: lint/format, auditoría deps, escaneo de secretos, Lighthouse (scores), axe (violations)  
   - Capturas: describir y adjuntar si el entorno lo permite  
8) Mapeo a criterios de aceptación  
   - Checkbox por criterio con referencia a diff/evidencia  
9) Notas y próximos pasos (si aplica)  
   - Deudas técnicas y sugerencias

Criterios de aceptación de la Entrega (Gate 3)  
- Diffs claros por archivo, sin placeholders, listos para pegar.  
- Evidencias completas y reproducibles; mapeo a criterios de aceptación.  
- Sin secretos ni vulnerabilidades altas/críticas; a11y y perf dentro de umbrales.  
- Veredicto del Revisor: OK / NO / OK con observaciones.

Ejemplo mínimo (fragmento)  
- Resumen: validación accesible aplicada; eliminación de `innerHTML`; contraste ajustado; +0 KB JS neto; Lighthouse 92/94.  
- Evidencias: npm audit sin altas/críticas; axe 0 violaciones; diffs en `ContactForm.tsx` y `index.css`.

---

## Versionado y nombrado
- Archivos: `FEAT-001-brief.md`, `FEAT-001-plan.md`, `FEAT-001-entrega.md`.  
- Versionar si cambian: `FEAT-001-plan-v2.md` (resumen de cambios en encabezado).  
- Cada handoff enlaza al anterior; la Entrega enlaza a PR/commits y resultados.

---

## Consejos y errores comunes
- No mezclar etapas: pensar en Brief, planificar en Plan, codificar en Entrega.  
- Mantener “Éxito = …” y criterios medibles; evitar vaguedades.  
- Seguridad por defecto: validar/escapar, sin secretos, headers/CORS, deps seguras.  
- Evidencias siempre: adjuntar resultados concretos (scores, outputs, capturas).  
- Si falta información, declarar supuestos y seguir; documentar para revisión.

---
