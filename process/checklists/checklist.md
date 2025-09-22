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