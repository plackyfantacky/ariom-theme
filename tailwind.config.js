/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        './parts/*.html',
        './patterns/*.php',
        './templates/*.html',
        './includes/**/*.{html,md,php}',
        './_src/**/*.{css,scss,js,jsx}',
        './safelist.txt',
        '../tailpress-theme/exported/**/*.txt'

    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        container: {
            center: true,
            padding: '1.5rem',
        },
        extend: {

        },
        fontFamily: {
            sans: ['"Source Sans 3"', {
                fontFeatureSettings: '"cv11", "ss01"',
                fontVariationSettings: '"opsz" 32'
            }],
            'sans-italic': ["Source Sans 3 Italic"],
            serif: ["Source Serif Pro"],
        },
        screens: {
            'sm': '480px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        }
    },
    daisyui: {
        themes: ['light', 'dark'],
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/container-queries'),
        require('tailwindcss-debug-screens'),
        require('daisyui'),
    ]
};
