/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'];
export const theme = {
  extend: {
    colors: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#3b82f6',
      light: '#ffffff',
      dark: '#0f172a',
      gradientStart: '#0f172a',
      gradientEnd: '#1e293b',
    },
    backgroundImage: {
      'gradient-bg': 'linear-gradient(45deg, #0f172a, #1e293b)',
    },
  }, 
  safelist: [
    'from-blue-400',
    'to-blue-600',
    'from-purple-400',
    'to-purple-600',
    'from-indigo-400',
    'to-indigo-600',
  ]
};
export const plugins = [];
