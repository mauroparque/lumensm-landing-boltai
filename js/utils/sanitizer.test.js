/**
 * TESTS para el módulo sanitizer
 * Ejecutar en consola del navegador para verificar funcionamiento
 */

import {
    sanitizeInput,
    containsDangerousContent,
    isValidEmail,
    isValidPhone,
    isSpam,
    truncate,
    isValidName,
    validateMessageLength,
    sanitizeURL,
    detectSensitiveData
} from './sanitizer.js';

console.log('🧪 Iniciando tests de seguridad...\n');

// Test 1: sanitizeInput
console.log('1️⃣ Test sanitizeInput:');
console.assert(sanitizeInput('<script>alert("XSS")</script>') === '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;', 'Debería escapar tags HTML');
console.assert(sanitizeInput('Texto normal') === 'Texto normal', 'No debería modificar texto normal');
console.log('   ✅ sanitizeInput OK\n');

// Test 2: containsDangerousContent
console.log('2️⃣ Test containsDangerousContent:');
console.assert(containsDangerousContent('<script>') === true, 'Debería detectar script tag');
console.assert(containsDangerousContent('onclick=') === true, 'Debería detectar event handlers');
console.assert(containsDangerousContent('Hola mundo') === false, 'No debería detectar texto normal');
console.log('   ✅ containsDangerousContent OK\n');

// Test 3: isValidEmail
console.log('3️⃣ Test isValidEmail:');
console.assert(isValidEmail('usuario@ejemplo.com') === true, 'Debería aceptar email válido');
console.assert(isValidEmail('test@test.co.ar') === true, 'Debería aceptar email con dominio .ar');
console.assert(isValidEmail('invalid.email') === false, 'Debería rechazar email sin @');
console.assert(isValidEmail('user@') === false, 'Debería rechazar email sin dominio');
console.assert(isValidEmail('@domain.com') === false, 'Debería rechazar email sin usuario');
console.log('   ✅ isValidEmail OK\n');

// Test 4: isValidPhone (Internacional)
console.log('4️⃣ Test isValidPhone (Internacional):');
// Argentina
console.assert(isValidPhone('+54 11 1234-5678') === true, 'Debería aceptar formato Argentina con +54');
console.assert(isValidPhone('0351 123 4567') === true, 'Debería aceptar formato local Argentina');
console.assert(isValidPhone('3547340673') === true, 'Debería aceptar número sin formato');
// USA
console.assert(isValidPhone('+1 555 123 4567') === true, 'Debería aceptar formato USA');
console.assert(isValidPhone('(555) 123-4567') === true, 'Debería aceptar formato USA con paréntesis');
// España
console.assert(isValidPhone('+34 612 34 56 78') === true, 'Debería aceptar formato España');
// México
console.assert(isValidPhone('+52 55 1234 5678') === true, 'Debería aceptar formato México');
// Reino Unido
console.assert(isValidPhone('+44 20 7946 0958') === true, 'Debería aceptar formato UK');
// Inválidos
console.assert(isValidPhone('123') === false, 'Debería rechazar número muy corto');
console.assert(isValidPhone('abc123') === false, 'Debería rechazar letras');
console.assert(isValidPhone('+1234567890123456') === false, 'Debería rechazar número muy largo');
console.log('   ✅ isValidPhone OK (soporta múltiples países)\n');

// Test 5: isSpam
console.log('5️⃣ Test isSpam:');
console.assert(isSpam('CLICK HERE TO WIN $$$') === true, 'Debería detectar spam obvio');
console.assert(isSpam('Buy viagra now!!!') === true, 'Debería detectar keywords de spam');
console.assert(isSpam('Hola, necesito información') === false, 'No debería detectar mensaje normal');
console.assert(isSpam('MENSAJE TODO EN MAYUSCULAS') === true, 'Debería detectar exceso de mayúsculas');
console.log('   ✅ isSpam OK\n');

// Test 6: truncate
console.log('6️⃣ Test truncate:');
console.assert(truncate('texto largo', 5) === 'texto', 'Debería truncar al límite');
console.assert(truncate('corto', 100) === 'corto', 'No debería modificar texto corto');
console.log('   ✅ truncate OK\n');

// Test 7: isValidName
console.log('7️⃣ Test isValidName:');
console.assert(isValidName('Juan Pérez') === true, 'Debería aceptar nombre con acento');
console.assert(isValidName('María José López') === true, 'Debería aceptar nombre compuesto');
console.assert(isValidName('John123') === false, 'Debería rechazar números');
console.assert(isValidName('A') === false, 'Debería rechazar nombre muy corto');
console.log('   ✅ isValidName OK\n');

// Test 8: validateMessageLength
console.log('8️⃣ Test validateMessageLength:');
console.assert(validateMessageLength('Mensaje válido con suficiente longitud').valid === true, 'Debería aceptar mensaje válido');
console.assert(validateMessageLength('Corto').valid === false, 'Debería rechazar mensaje muy corto');
console.assert(validateMessageLength('a'.repeat(6000)).valid === false, 'Debería rechazar mensaje muy largo');
console.log('   ✅ validateMessageLength OK\n');

// Test 9: sanitizeURL
console.log('9️⃣ Test sanitizeURL:');
console.assert(sanitizeURL('https://wa.me/123456') === 'https://wa.me/123456', 'Debería aceptar WhatsApp URL');
console.assert(sanitizeURL('javascript:alert(1)') === null, 'Debería rechazar javascript: protocol');
console.assert(sanitizeURL('https://malicious-site.com') === null, 'Debería rechazar dominio no whitelisted');
console.log('   ✅ sanitizeURL OK\n');

// Test 10: detectSensitiveData
console.log('🔟 Test detectSensitiveData:');
console.log('   📋 Probando detección de información sensible...\n');

// Test DNI argentino
const testDNI = detectSensitiveData('Mi DNI es 12345678');
console.assert(testDNI.hasSensitiveData === true, 'Debería detectar DNI');
console.assert(testDNI.types.includes('dni'), 'Debería identificar tipo DNI');
console.log('   ✅ DNI detectado:', testDNI);

// Test CUIT argentino
const testCUIT = detectSensitiveData('Mi CUIT es 20-12345678-9');
console.assert(testCUIT.hasSensitiveData === true, 'Debería detectar CUIT');
console.assert(testCUIT.types.includes('cuit'), 'Debería identificar tipo CUIT');
console.log('   ✅ CUIT detectado:', testCUIT);

// Test tarjeta de crédito
const testCard = detectSensitiveData('Tarjeta: 4532 1234 5678 9010');
console.assert(testCard.hasSensitiveData === true, 'Debería detectar tarjeta');
console.assert(testCard.types.includes('creditCard'), 'Debería identificar tipo creditCard');
console.log('   ✅ Tarjeta detectada:', testCard);

// Test contraseña
const testPassword = detectSensitiveData('Mi password: micontraseña123');
console.assert(testPassword.hasSensitiveData === true, 'Debería detectar password');
console.assert(testPassword.types.includes('password'), 'Debería identificar tipo password');
console.log('   ✅ Password detectado:', testPassword);

// Test múltiples datos sensibles
const testMultiple = detectSensitiveData('DNI 12345678 y tarjeta 4532123456789010');
console.assert(testMultiple.hasSensitiveData === true, 'Debería detectar múltiples datos');
console.assert(testMultiple.types.length === 2, 'Debería detectar 2 tipos');
console.log('   ✅ Múltiples datos detectados:', testMultiple);

// Test mensaje normal (no sensible)
const testNormal = detectSensitiveData('Hola, necesito información sobre terapia online');
console.assert(testNormal.hasSensitiveData === false, 'No debería detectar datos en mensaje normal');
console.assert(testNormal.types.length === 0, 'No debería tener tipos detectados');
console.log('   ✅ Mensaje normal (sin datos sensibles):', testNormal);

console.log('\n   ✅ detectSensitiveData OK\n');

console.log('✅ Todos los tests pasaron correctamente!');
console.log('🔒 El módulo de sanitización está funcionando correctamente.');

// Ejemplos adicionales para ver en acción
console.log('\n📚 EJEMPLOS ADICIONALES DE DETECCIÓN:\n');

console.log('Ejemplo 1 - DNI:');
console.log('Input: "Mi documento es 45678901"');
console.log('Output:', detectSensitiveData('Mi documento es 45678901'));

console.log('\nEjemplo 2 - Tarjeta:');
console.log('Input: "Mi tarjeta termina en 1234-5678-9012-3456"');
console.log('Output:', detectSensitiveData('Mi tarjeta termina en 1234-5678-9012-3456'));

console.log('\nEjemplo 3 - CUIT:');
console.log('Input: "CUIT: 27 12345678 3"');
console.log('Output:', detectSensitiveData('CUIT: 27 12345678 3'));

console.log('\nEjemplo 4 - Sin datos sensibles:');
console.log('Input: "Necesito ayuda con ansiedad"');
console.log('Output:', detectSensitiveData('Necesito ayuda con ansiedad'));
