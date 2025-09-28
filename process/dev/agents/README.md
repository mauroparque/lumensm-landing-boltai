# Uso de hilos con agentes IA

Guía para operar el flujo multi‑agente en hilos separados dentro del entorno IA: qué pegar al iniciar cada hilo, orden de agentes, qué adjuntar en cada etapa y cómo mantener trazabilidad cuando no hay acceso directo al repositorio.

## Índice
- [Principios](#principios)
- [Bloque de inicio para cada hilo](#bloque-de-inicio-para-cada-hilo)
- [Orden de agentes y entregables](#orden-de-agentes-y-entregables)
- [Qué adjuntar en cada etapa](#qué-adjuntar-en-cada-etapa)
- [Reglas de consistencia entre hilos](#reglas-de-consistencia-entre-hilos)
- [Ejemplos de inicio de hilo](#ejemplos-de-inicio-de-hilo)
- [Preguntas frecuentes](#preguntas-frecuentes)

---

## Principios
- Contexto mínimo común: cada hilo arranca con el mismo bloque de contexto para alinear objetivos, estándares y el handoff activo.  
- Un hilo, un rol, un objetivo: mantener foco por etapa del flujo (Estratega → Planificador → Implementador → Revisor).  
- Evidencia antes de aprobar: no avanzar de gate sin adjuntar handoff/entrega y evidencias.  
- Copiar/pegar como protocolo: si el agente no ve el repo, se pega texto relevante (brief, plan, diffs, resultados de validaciones).

---

## Bloque de inicio para cada hilo
Pegar y completar al abrir un nuevo hilo:

PROYECTO: Web Profesional (flujo multi‑agente)
ROL: [Estratega | Planificador | Implementador | Revisor]
TAREA: [ID y título de la feature]
HANDOFF ACTIVO: [brief | plan | entrega] (enlace o pegado textual abajo)
ESTÁNDARES: WCAG 2.1 AA, Lighthouse ≥ 90, Seguridad baseline (OWASP ASVS L1)
REQUISITOS: No introducir fallas de seguridad; aportar evidencias de validación.
DUDAS CLAVE (si aplica): [lista breve]

Consejo: mantener este bloque como snippet reutilizable para evitar omisiones.

---

## Orden de agentes y entregables
1) Estratega → Entrega: Brief  
2) Planificador → Entrega: Plan operativo  
3) Implementador → Entrega: Diffs por archivo + evidencias  
4) Revisor → Entrega: Veredicto (OK/NO) + acciones correctivas

No se avanza al siguiente rol sin gate aprobado.

---

## Qué adjuntar en cada etapa

Estratega (hilo de ideación)
- Pegar el bloque de inicio (ROL = Estratega).  
- Pegar la idea/necesidad original (máx. 10–15 líneas).  
- Adjuntar la plantilla de Brief (completada) con: Objetivo, Éxito =, Alcance, Restricciones, Riesgos, Entregables, Decisiones abiertas.  
- Salida esperada: Brief final para Gate 1.

Planificador (hilo de planificación)
- Pegar el bloque de inicio (ROL = Planificador).  
- Pegar el Brief aprobado (texto completo).  
- Adjuntar Plan operativo con: pasos numerados, archivos exactos, criterios de aceptación (funcional, a11y, perf, seguridad), prompts por sub‑tarea, plan de validación, riesgos/mitigaciones.  
- Salida esperada: Plan final para Gate 2.

Implementador (hilo de ejecución)
- Pegar el bloque de inicio (ROL = Implementador).  
- Pegar el Plan aprobado (texto completo).  
- Entregar:  
  - Diff por archivo (código exacto listo para pegar).  
  - Decisiones clave y dependencias usadas.  
  - Controles de seguridad aplicados (validación/escape, headers, CSRF/XSS, secretos).  
  - Impacto en accesibilidad y performance.  
  - Evidencias: resultados de validaciones (pegar outputs de comandos, capturas, métricas).  
  - Mapeo a criterios de aceptación (checkbox + referencia).  
- Salida esperada: Entrega para Gate 3.

Revisor (hilo de revisión)
- Pegar el bloque de inicio (ROL = Revisor).  
- Pegar la Entrega (diffs + evidencias).  
- Aplicar checklists: funcionalidad, accesibilidad, performance, seguridad, código.  
- Salida esperada: Veredicto (OK/NO), lista mínima de acciones para aprobar si es NO, evidencias revisadas.

---

## Reglas de consistencia entre hilos
- Título del hilo: prefijar con ID de la feature (ej. “FEAT-001 | Planificación”).  
- Siempre referenciar el handoff anterior: el Plan referencia el Brief, la Entrega referencia el Plan.  
- Mantener versiones: si se actualiza un Brief/Plan, indicar “v2” y el cambio clave.  
- Cerrar el hilo con un resumen de decisiones y enlaces a artefactos (hand-offs, PR/commits si aplica).

---

## Ejemplos de inicio de hilo  ### ¡Importantes como referencia! ###

Ejemplo — Hilo del Estratega  

PROYECTO: Web Profesional (flujo multi‑agente)
ROL: Estratega
TAREA: FEAT-002 — Mejorar formulario de contacto
HANDOFF ACTIVO: brief
ESTÁNDARES: WCAG 2.1 AA, Lighthouse ≥ 90, Seguridad baseline (OWASP ASVS L1)
REQUISITOS: No introducir fallas de seguridad; evidencias de validación.
DUDAS CLAVE: ¿Se requiere captcha? ¿Qué campo es obligatorio?
[Pegá aquí la idea original en 10–15 líneas]
[Pegá aquí la plantilla de Brief completada]

Ejemplo — Hilo del Implementador

PROYECTO: Web Profesional (flujo multi‑agente)
ROL: Implementador
TAREA: FEAT-002 — Mejorar formulario de contacto
HANDOFF ACTIVO: entrega
ESTÁNDARES: WCAG 2.1 AA, Lighthouse ≥ 90, Seguridad baseline (OWASP ASVS L1)
REQUISITOS: No introducir fallas de seguridad; evidencias de validación.
[Pegá aquí el Plan aprobado]
[Pegá aquí los diffs por archivo + evidencias de validación]
