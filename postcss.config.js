export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Minificación solo en producción
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
};
