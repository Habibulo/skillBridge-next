/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './libs/components/**/*.{js,ts,jsx,tsx}', 
    './styles/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2', 
        customGreen: '#46a358',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
