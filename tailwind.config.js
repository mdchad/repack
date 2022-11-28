module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'class',
    variants: {
        extend: {
            textOpacity: ['dark'],
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
    ]
};
