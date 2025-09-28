# WCAG_Checklist.md

Propósito
- Proveer una lista de verificación editorial/semántica para que los hilos A1–A4 incorporen accesibilidad desde el brief hasta la aprobación, y orientar cuándo requerir auditorías técnicas externas (Lighthouse/Axe) cuyos reportes se adjuntarán en /qa/.

Alcance
- Cobertura práctica de criterios AA más relevantes para contenido y estructura (WCAG 2.1/2.2), pensando en copy y marcación semántica básica, sin sustituir validaciones técnicas completas ni la Quick Reference oficial.

Uso recomendado
- A1: planifica estructura semántica y microcopys accesibles en el brief.  
- A2: aplica la jerarquía, alt‑text, enlaces significativos y lectura sencilla.  
- A3: optimiza sin sacrificar accesibilidad; revisa coherencia H1–H3.  
- A4: valida con esta checklist; si hay dudas técnicas, solicita/analiza reportes externos y documenta hallazgos.

---

## 1) Estructura semántica

- H1 único por página; H2/H3 con jerarquía coherente y descriptores claros.  
- Listas planas para pasos o elementos; tablas solo si aportan claridad, con encabezados marcados.  
- Evitar que contenido crítico dependa de hover/focus; si existe, debe ser descartable, persistente y accesible vía teclado (2.1 1.4.13).  

## 2) Texto y lenguaje

- Lenguaje claro y directo; evitar jerga o explicarla la primera vez.  
- Párrafos breves (2–4 líneas) y una idea por párrafo para lectura sencilla.  
- Idioma de la página definido; indicar cambios de idioma si aparecen (3.1).  

## 3) Enlaces y navegación

- Texto de enlace significativo; evitar “clic aquí” o “más info” sin contexto (2.4.4/2.4.9).  
- Consistencia de patrones y componentes en páginas relacionadas (2.4.5/3.2.4).  
- “Múltiples vías” para encontrar páginas clave (site nav, búsqueda interna, mapa si aplica) (2.4.5).  

## 4) Imágenes y multimedia

- Alt‑text descriptivo en imágenes informativas; decorativas marcadas como tales (1.1.1).  
- Evitar “imágenes de texto” salvo necesidad; preferir texto real (1.4.5).  
- Subtítulos para video en vivo (1.2.4 AA) y audio descripción para pregrabado (1.2.5 AA) cuando corresponda.  

## 5) Contraste y presentación (declarativo)

- Mantener contraste mínimo de 4.5:1 para texto normal y 3:1 para texto grande (1.4.3).  
- Reflow y responsividad sin pérdida de contenido/función (1.4.10).  
- Espaciado de texto tolerante (1.4.12) y contenido visible en hover/focus manejado correctamente (1.4.13).  

## 6) Formularios y ayudas (si aplica)

- Etiquetas/instrucciones claras (3.3.2) y mensajes de error identificables (3.3.1).  
- Sugerencias de corrección cuando sea posible (3.3.3 AA) y prevención de errores en procesos críticos (3.3.4 AA).  
- En 2.2 AA: soportar foco visible, tamaño de objetivo adecuado y evitar bloqueo por headers pegajosos (2.4.11, 2.5.8) cuando aplique en diseño/interacción.  

## 7) Compatibilidad y estados

- Nombre, rol y valor de componentes reconocibles por tecnologías de asistencia (4.1.2).  
- Mensajes de estado anunciados a lectores de pantalla cuando cambie información en la página (4.1.3 AA).  

---

## Procedimiento de validación

- Paso 1 (Editorial): A2/A3 aplican esta checklist durante redacción/optimización, marcando ítems cumplidos o pendientes.  
- Paso 2 (QA): A4 revisa con esta lista y compila hallazgos; si hay dudas técnicas, pide auditoría externa (Lighthouse/Axe).  
- Paso 3 (Evidencias): Adjuntar reportes y mapear issues a criterios WCAG (anotar criterio, severidad y recomendación).  

### Auditorías externas (fuera del Space)
- Ejecutar Lighthouse desde DevTools y exportar reporte; interpretar score de Accesibilidad y apartados fallidos/pasados.  
- Usar Axe u otra herramienta de evaluación y adjuntar JSON/HTML; priorizar issues por impacto en tareas críticas.  

---

## Registro de cumplimiento (plantilla)

- Página/Documento:  
- Fecha:  
- Revisor:  

Checklist resumida:
- [ ] H1 único; H2/H3 coherentes  
- [ ] Listas/tablas accesibles  
- [ ] Enlaces significativos  
- [ ] Alt‑text informativo / decorativo marcado  
- [ ] Contraste y reflow previstos  
- [ ] Formularios con etiquetas/errores claros  
- [ ] Estados anunciados a AT  
- [ ] Evidencias externas adjuntas (si aplican)

Observaciones:
-  
Acciones y responsables:
-  

