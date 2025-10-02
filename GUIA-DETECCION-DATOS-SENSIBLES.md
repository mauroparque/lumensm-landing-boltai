# 🔒 Guía: Cómo Ver la Detección de Datos Sensibles

## ✅ La detección YA está funcionando

Ahora la detección de datos sensibles tiene **2 niveles de protección**:

---

## 🎯 Nivel 1: Advertencia en Tiempo Real (NUEVO)

### ¿Cuándo aparece?
**Mientras escribes** en el campo "Mensaje" del formulario.

### ¿Cómo verla?

1. **Abre** `index.html` en tu navegador
2. **Ve al formulario** de contacto (sección "Contacto")
3. **Encuentra el campo** "Mensaje" o "Cuéntame brevemente..."
4. **Escribe** cualquiera de estos ejemplos:
   - `Mi DNI es 12345678`
   - `CUIT: 20-12345678-9`
   - `Tarjeta 4532 1234 5678 9010`
   - `Mi password: secreto123`

5. **Espera 0.5 segundos** (después de dejar de escribir)

### ¿Qué verás?

Aparecerá una **caja amarilla** debajo del campo con el mensaje:

```
⚠️ Advertencia de Seguridad
Tu mensaje contiene información sensible: DNI.
Por tu seguridad, evita compartir estos datos en formularios.
```

**Aspecto visual:**
- 🟨 Fondo amarillo (`#fff3cd`)
- 🟧 Borde naranja (`#ffc107`)
- ⚠️ Icono de advertencia
- 📝 Mensaje explicativo

**La advertencia:**
- ✅ Aparece automáticamente
- ✅ Se anima suavemente (slideDown)
- ✅ Desaparece si borras los datos sensibles
- ✅ No bloquea el campo (solo advierte)

---

## 🚫 Nivel 2: Bloqueo al Enviar (MEJORADO)

### ¿Cuándo aparece?
**Al hacer clic en "Enviar Mensaje"** si hay datos sensibles.

### ¿Qué verás?

1. **Campo resaltado en rojo** (el campo "Mensaje")
2. **Notificación de error** en la parte superior:
   ```
   ⚠️ Tu mensaje contiene información sensible (DNI). 
   Por seguridad, evita compartir estos datos.
   ```
3. **El formulario NO se envía** hasta que corrijas el mensaje

**Aspecto:**
- 🔴 Campo con borde rojo
- 🔔 Notificación modal/toast
- ❌ Envío bloqueado

---

## 📝 Ejemplo Paso a Paso

### Test 1: DNI en tiempo real

```
1. Abre index.html
2. Ve a la sección "Contacto"
3. Rellena:
   - Nombre: Juan Pérez
   - Email: juan@ejemplo.com
   - Mensaje: Mi DNI es 12345678
4. Espera medio segundo
5. 👀 VERÁS: Advertencia amarilla aparece
6. Presiona "Enviar Mensaje"
7. 👀 VERÁS: Error rojo + formulario no se envía
```

### Test 2: Múltiples datos sensibles

```
1. En el campo Mensaje escribe:
   "Mi DNI es 45678901 y mi tarjeta 4532123456789010"
2. Espera medio segundo
3. 👀 VERÁS: "DNI, Tarjeta de Crédito" en la advertencia
```

### Test 3: Mensaje seguro

```
1. En el campo Mensaje escribe:
   "Necesito ayuda con ansiedad y depresión"
2. Espera medio segundo
3. 👀 VERÁS: No hay advertencia (todo OK)
4. Presiona "Enviar"
5. 👀 VERÁS: Formulario se envía normalmente
```

---

## 🔍 Verificación en Consola

Además de la advertencia visual, puedes verificar en la consola:

1. **Abre DevTools** (F12)
2. **Ve a la pestaña Console**
3. **Escribe algo con DNI** en el formulario
4. **Verás en consola:**
   ```javascript
   ⚠️ Sensitive data detected: {
     hasSensitiveData: true,
     types: ['dni']
   }
   ```

---

## 📊 Tipos de Datos Detectados

| Tipo | Ejemplo | Mensaje en Advertencia |
|------|---------|------------------------|
| **DNI** | `12345678` | "DNI" |
| **CUIT** | `20-12345678-9` | "CUIT" |
| **Tarjeta** | `4532 1234 5678 9010` | "Tarjeta de Crédito" |
| **Contraseña** | `password: abc123` | "Contraseña" |

---

## 🎨 Aspecto Visual de la Advertencia

```
┌─────────────────────────────────────────────────┐
│ [Mensaje]                                        │
│ ┌─────────────────────────────────────────────┐ │
│ │ Mi DNI es 12345678                          │ │
│ │                                              │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ╔═══════════════════════════════════════════╗  │
│ ║ ⚠️  Advertencia de Seguridad               ║  │
│ ║                                            ║  │
│ ║ Tu mensaje contiene información sensible: ║  │
│ ║ DNI.                                       ║  │
│ ║                                            ║  │
│ ║ Por tu seguridad, evita compartir estos   ║  │
│ ║ datos en formularios.                      ║  │
│ ╚═══════════════════════════════════════════╝  │
└─────────────────────────────────────────────────┘
```

---

## ❓ Troubleshooting

### "No veo la advertencia"

**Posibles causas:**

1. ✅ **Verifica que escribiste al menos 10 caracteres**
   - La detección solo funciona con mensajes de 10+ caracteres
   - Ejemplo corto que NO funciona: `DNI 123`
   - Ejemplo que SÍ funciona: `Mi DNI es 12345678`

2. ✅ **Espera 0.5 segundos**
   - La advertencia tiene un "debounce" de 500ms
   - Deja de escribir y espera medio segundo

3. ✅ **Usa el formato correcto**
   - DNI: 7-8 dígitos (`12345678`)
   - CUIT: formato `XX-XXXXXXXX-X`
   - Tarjeta: 16 dígitos (`4532123456789010`)

4. ✅ **Abre la consola (F12)**
   - Verifica que no hay errores JavaScript
   - Busca el mensaje: `⚠️ Sensitive data detected`

5. ✅ **Verifica que los archivos existen**
   - `js/utils/sanitizer.js`
   - `js/modules/forms.js`

### "Aparece advertencia pero puedo enviar igual"

**Respuesta:** Esto es intencional en 2 escenarios:

1. **Advertencia en tiempo real (amarilla):**
   - ⚠️ Solo advierte, no bloquea
   - El usuario puede decidir enviar o no
   
2. **Bloqueo al enviar (roja):**
   - ❌ SÍ bloquea el envío
   - El formulario no se envía

**Si quieres bloquear completamente**, cambia el comportamiento (avísame).

---

## 🧪 Test Rápido

**Código para probar en consola:**

```javascript
// 1. Importar la función
import { detectSensitiveData } from './js/utils/sanitizer.js';

// 2. Probar detección
console.log('Test 1:', detectSensitiveData('Mi DNI es 12345678'));
console.log('Test 2:', detectSensitiveData('Necesito ayuda'));
console.log('Test 3:', detectSensitiveData('Tarjeta 4532123456789010'));
```

**Resultado esperado:**
```javascript
Test 1: {hasSensitiveData: true, types: ['dni']}
Test 2: {hasSensitiveData: false, types: []}
Test 3: {hasSensitiveData: true, types: ['creditCard']}
```

---

## ✨ Resumen

| Característica | Estado |
|----------------|--------|
| **Detección en tiempo real** | ✅ Implementado |
| **Advertencia visual amarilla** | ✅ Implementado |
| **Bloqueo al enviar** | ✅ Implementado |
| **Mensaje en consola** | ✅ Implementado |
| **Animación suave** | ✅ Implementado |
| **Múltiples tipos de datos** | ✅ Soportado |

---

## 📞 ¿Necesitas Ayuda?

Si después de seguir esta guía aún no ves la advertencia:

1. Abre una **issue** con:
   - Navegador usado (Chrome, Firefox, etc.)
   - Texto exacto que escribiste
   - Captura de pantalla de la consola (F12)

2. O prueba la **página de test**: `test-sensitive-data.html`

---

**Última actualización:** Octubre 2025
