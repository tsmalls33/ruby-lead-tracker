/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      colors: {
        'devomart': {
          purple: '#582E39',
          'purple-muted': 'rgba(88, 46, 57, 0.7)',
          orange: '#EB4F1C',
        }
      }
    },
  },
  plugins: [],
}