# README.md — Flujo multi‑agente creación de contenido

## Propósito
Implementar un flujo de creación y revisión de contenido web con cuatro agentes trabajando como hilos separados dentro de un único Space, aprovechando búsqueda web integrada, archivos adjuntos y directrices persistentes del Space, sin llamadas directas a APIs externas desde los hilos.

## Alcance
- Desde la ideación hasta la versión aprobada: A1 Estratega → A2 Redactor → A3 Optimizador SEO → A4 Revisor de calidad.  
- Auditorías externas (p. ej., Lighthouse/Axe) se ejecutan fuera y sus reportes se adjuntan en el hilo de A4 como evidencia.

## Estructura operativa
- Un solo Space con instrucciones persistentes comunes (tono, formato, convenciones).  
- Cuatro hilos, uno por agente: “A1 – Estratega”, “A2 – Redactor”, “A3 – SEO”, “A4 – QA”.  
- Los archivos subidos al Space son visibles para todos los hilos.  
- Los hilos no comparten memoria automáticamente: se debe traspasar el contexto pegando resúmenes y adjuntando entregables al pasar de un hilo a otro.

## Flujo paso a paso
1) Hilo A1 crea el Brief y entrega “Resumen para traspaso” a A2.  
2) Hilo A2 redacta el Borrador y entrega “Resumen para traspaso” a A3.  
3) Hilo A3 optimiza on‑page, produce Diff y Checklist, y entrega “Resumen para traspaso” a A4.  
4) Hilo A4 revisa, solicita/analiza evidencias externas si corresponde y emite QA_REPORT con decisión final.

## Convenciones de traspaso entre hilos
- Cada hilo termina con un bloque “Resumen para traspaso” que incluye: objetivo, cambios clave, pendientes, riesgos y enlaces/archivos relevantes.  
- Nombrar archivos con fecha y prefijo del agente para trazabilidad, y enlazarlos en el último mensaje del hilo.

## Criterios de aceptación
- Brief completo y accionable (A1).  
- Borrador fiel al brief, claro y escaneable (A2).  
- Optimización con justificación basada en resultados de búsqueda integrada y buenas prácticas de visibilidad en SERPs (A3).  
- QA con revisión de accesibilidad y evidencias externas adjuntas cuando aplique, sin issues críticos (A4).

## Limitaciones
- Sin ejecución directa de herramientas externas desde los hilos; lo externo se realiza fuera y se adjunta como evidencia.  
- La persistencia de contexto entre hilos depende del traspaso explícito de resúmenes y archivos.

## Estructura de archivos del Space
- /style/ Brand_Guide.md, Glossary.md, WCAG_Checklist.md  
- /templates/ brief_template.md, draft_template.md, qa_report_template.md    
- /seo/ SEO_Checklist.md

## Modelos (sugerencia)
- A1 y A3: modelo con razonamiento extendido para entrevistas, síntesis compleja e investigación.  
- A2: modelo balanceado para redacción larga con buena calidad/latencia.  
- A4: modelo con razonamiento paso a paso para revisión cuidadosa de criterios textuales y semánticos.

---

# DOCUMENTOS AUXILIARES

## style/Brand_Guide.md
- Voz y tono: rasgos, expresiones preferidas, términos a evitar.  
- Principios: claridad, empatía, lenguaje inclusivo y consistencia.  
- Ejemplos: 2–3 muestras de copy aprobado.

## style/Glossary.md
- Términos del dominio y definiciones breves.  
- Variantes aceptadas y abreviaturas.  
- Enlaces internos a materiales de referencia del Space.

## style/WCAG_Checklist.md
- Encabezados jerárquicos (un H1, H2/H3 lógicos).  
- Texto alternativo descriptivo en imágenes.  
- Enlaces con texto significativo.  
- Tablas simples con encabezados.  
- Contraste declarado y lenguaje claro.  
- Indicaciones de cuándo requerir auditoría externa y cómo adjuntar la evidencia.

## templates/BRIEF_TEMPLATE.md
Título:  
Fecha:  
Propósito de la página:  
Buyer persona (dolores, motivaciones, objeciones):  
Propuesta de valor:  
Diferenciales clave:  
Tono y estilo:  
Estructura (H1–H3):  
CTA principal y secundarias:  
FAQs:  
Keywords orientativas (con intención):  
Criterios de aceptación para A2:  
Resumen para traspaso (para A2):

## templates/DRAFT_TEMPLATE.md
Título interno:  
Fecha:  
Meta title (aprox. 50–60 visibles):  
Meta description (aprox. 120–155):  
H1:  
Secciones H2/H3:  
Listas y tablas:  
Alt‑text propuesto:  
Enlaces internos/externos sugeridos:  
FAQPage JSON‑LD (si corresponde):  
Dudas/pendientes:  
Resumen para traspaso (para A3):

## seo/SEO_CHECKLIST.md
- Meta title único, claro y dentro de rango visible.  
- Meta description orientada a intención y CTR dentro de rango visible.  
- H‑tags jerárquicos y coherentes con intención.  
- Densidad semántica natural; evitar keyword stuffing.  
- Enlaces internos a páginas relevantes existentes; externos con autoridad si aportan valor.  
- Validación/ajuste de FAQPage JSON‑LD cuando exista.  
- Evidencias de SERP: breve resumen de hallazgos y racional de cambios.  
- Resumen para traspaso (para A4).

## templates/QA_REPORT_TEMPLATE.md
Documento:  
Fecha:  
Revisor:  
Hallazgos  
- Accesibilidad (encabezados, alt‑text, enlaces, tablas, contraste declarado, lenguaje claro)  
- Legibilidad (lectura sencilla, frases claras, párrafos breves)  
- Consistencia (tono, glosario, enlaces internos)  
- Riesgos (afirmaciones no sustentadas, lenguaje sensible, HTML inseguro si aplica)  
Severidad (bloqueante/alta/media/baja)  
Acciones recomendadas  
Decisión (Aprobado / Aprobado con cambios / Rechazado)  
Evidencias adjuntas (enlaces a archivos del Space)

- Registro: mantener un pequeño “registro de cambios” al final de cada entregable con decisiones y justificaciones.
