# QA_REPORT_TEMPLATE.md

Meta:
- Documento: CONT-xxx-qa_report.md
- Fecha:
- Revisor:
- Versión:
- URL (si aplica):

## 1) Resumen ejecutivo
- Estado: Aprobado / Aprobado con cambios / Rechazado
- Principales hallazgos (3–5 puntos)
- Acciones críticas y responsables

## 2) Alcance de la revisión
- Entregable evaluado (archivo/versión)
- Fuentes usadas (archivos del Space, búsqueda integrada)
- Auditorías externas adjuntas (Lighthouse/Axe) y su fecha

## 3) Accesibilidad (enfoque de contenido/semántica)
- Estructura: H1 único, jerarquía H2/H3 coherente, listas planas, tablas con encabezados.
- Texto alternativo: alt‑text descriptivo en imágenes informativas.
- Enlaces: texto significativo; evitar “clic aquí”.
- Legibilidad declarativa: frases claras, lenguaje inclusivo, evitar jerga no explicada.
- Contraste (declarado): combinación prevista legible; si hay duda, marcar para verificación técnica externa.
- Formularios (si aplica): etiquetas claras e instrucciones breves.

Notas:
- Esta sección aplica checklist de contenido/semántica basada en WCAG 2.1/2.2 AA; para validaciones técnicas, adjuntar reportes de herramientas especializadas y analizarlos en la sección 6 (Evidencias) [Referencias: W3C WCAG, WebAIM, Accessible.org].

## 4) Consistencia editorial
- Voz y tono alineados a /style/Brand_Guide.md
- Terminología conforme a /style/Glossary.md
- Coherencia entre meta title/description, H1 y contenido
- CTA claros y medibles

## 5) SEO on‑page (verificación editorial)
- Meta title (~50–60 visibles) y description (~120–155) con intención clara.
- Encabezados jerárquicos y semántica coherente.
- Enlazado interno/externo con propósito (sin sobrecargar).
- FAQPage JSON‑LD (si corresponde) consistente con las preguntas del texto.

## 6) Evidencias y auditorías externas (adjuntas)
- Lighthouse (HTML/JSON): resumen de hallazgos relevantes para accesibilidad (contraste, roles/ARIA, navegabilidad) y SEO [Adjuntar archivo].
- Axe u otra herramienta: issues detectados y severidad [Adjuntar archivo].
- Observaciones del revisor sobre alcance y límites de los reportes (qué cubren y qué requiere verificación manual).

Guías de interpretación:
- Lighthouse: comprender score de Accesibilidad y agrupación de auditorías aprobadas/fallidas; revisar “Additional items to manually check” para aspectos no automatizables.
- Validaciones técnicas: mapear issues a criterios WCAG y proponer correcciones priorizadas.

## 7) Hallazgos detallados (con severidad)
- Accesibilidad:
  - [Severidad] Ítem — Descripción — Evidencia/Ubicación — Recomendación.
- Legibilidad:
  - [Severidad] Ítem — Descripción — Evidencia/Ubicación — Recomendación.
- Consistencia:
  - [Severidad] Ítem — Descripción — Evidencia/Ubicación — Recomendación.
- SEO editorial:
  - [Severidad] Ítem — Descripción — Evidencia/Ubicación — Recomendación.

Escala de severidad:
- Bloqueante: impide aprobación/publicación.
- Alta: impacto notable; resolver antes de publicar.
- Media: recomendable resolver pronto.
- Baja: mejora incremental.

## 8) Acciones recomendadas y responsables
- [Prioridad] Acción — Responsable — Entregable — Fecha objetivo.
- Dependencias y notas (si aplica).

## 9) Decisión final
- Aprobado / Aprobado con cambios / Rechazado
- Condiciones para avanzar (si aplica)
- Próximos pasos y handoff (al CMS o a iteración A2/A3)

## 10) Registro de cambios del QA
- YYYY-MM-DD — Cambio / Decisión — Revisor

## Anexos
- Enlaces a archivos del Space (borrador, versión SEO, Brand_Guide, Glossary).
- Reportes subidos (Lighthouse/Axe) y capturas relevantes.

---
Referencias útiles para la interpretación y el checklist:
- W3C WCAG 2.1/2.2 AA (criterios y alcance; usar para mapear issues a estándares).  
- WebAIM WCAG Checklist (resumen práctico de verificación).  
- Guías para leer informes de Lighthouse y diferenciar lo automatizable de lo manual.
