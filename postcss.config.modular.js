// PostCSS Configuration para CSS Modular
// Procesa los archivos CSS con Autoprefixer y CSSnano

export default (ctx) => {
  // Detectar si es producción basado en el nombre del archivo de salida
  const isMinified = ctx.to && ctx.to.includes('min');
  
  return {
    plugins: {
      // Autoprefixer - Agrega prefijos de navegador automáticamente
      autoprefixer: {
        overrideBrowserslist: [
          '> 1%',
          'last 2 versions',
          'not dead',
          'iOS >= 10',
          'Android >= 5'
        ],
        grid: 'autoplace' // Soporte para CSS Grid
      },
      
      // CSSnano - Minificación y optimización
      // Se activa cuando el archivo de salida contiene "min" en el nombre
      ...(isMinified ? {
        cssnano: {
          preset: ['default', {
            discardComments: {
              removeAll: true // Elimina todos los comentarios
            },
            normalizeWhitespace: true, // Elimina espacios innecesarios
            colormin: true, // Minimiza colores (#ffffff -> #fff)
            calc: true, // Optimiza calc()
            convertValues: true, // Convierte valores (1000ms -> 1s)
            mergeRules: true, // Fusiona reglas duplicadas
            minifySelectors: true, // Minimiza selectores
            reduceTransforms: true // Optimiza transforms
          }]
        }
      } : {})
    }
  };
};
