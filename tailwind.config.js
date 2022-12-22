module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  darkMode: 'class',
  variants: {
    extend: {
      textOpacity: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ts-ignore
    require('flowbite/plugin')
  ]
};
