/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        './functions.php',
        './parts/*.html',
        './patterns/*.php',
        './templates/*.html',
        './includes/**/*.{html,md,php}',
        './_src/**/*.{css,scss,js,jsx}',
        './safelist.txt',
        '../tailpress-theme/exported/**/*.txt',
        '../tailpress-theme/includes/**/*.php',
        '../../plugins/threejs-thingy/threejs-thingy.php',

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
            backgroundImage: {
                'search': 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjYgMjFMMTMuMyAxNC43QzEyLjggMTUuMSAxMi4yMjUgMTUuNDE2NyAxMS41NzUgMTUuNjVDMTAuOTI1IDE1Ljg4MzMgMTAuMjMzMyAxNiA5LjUgMTZDNy42ODMzMyAxNiA2LjE0NiAxNS4zNzA3IDQuODg4IDE0LjExMkMzLjYzIDEyLjg1MzMgMy4wMDA2NyAxMS4zMTYgMyA5LjVDMi45OTkzMyA3LjY4NCAzLjYyODY3IDYuMTQ2NjcgNC44ODggNC44ODhDNi4xNDczMyAzLjYyOTMzIDcuNjg0NjcgMyA5LjUgM0MxMS4zMTUzIDMgMTIuODUzIDMuNjI5MzMgMTQuMTEzIDQuODg4QzE1LjM3MyA2LjE0NjY3IDE2LjAwMiA3LjY4NCAxNiA5LjVDMTYgMTAuMjMzMyAxNS44ODMzIDEwLjkyNSAxNS42NSAxMS41NzVDMTUuNDE2NyAxMi4yMjUgMTUuMSAxMi44IDE0LjcgMTMuM0wyMSAxOS42TDE5LjYgMjFaTTkuNSAxNEMxMC43NSAxNCAxMS44MTI3IDEzLjU2MjcgMTIuNjg4IDEyLjY4OEMxMy41NjMzIDExLjgxMzMgMTQuMDAwNyAxMC43NTA3IDE0IDkuNUMxMy45OTkzIDguMjQ5MzMgMTMuNTYyIDcuMTg3IDEyLjY4OCA2LjMxM0MxMS44MTQgNS40MzkgMTAuNzUxMyA1LjAwMTMzIDkuNSA1QzguMjQ4NjcgNC45OTg2NyA3LjE4NjMzIDUuNDM2MzMgNi4zMTMgNi4zMTNDNS40Mzk2NyA3LjE4OTY3IDUuMDAyIDguMjUyIDUgOS41QzQuOTk4IDEwLjc0OCA1LjQzNTY3IDExLjgxMDcgNi4zMTMgMTIuNjg4QzcuMTkwMzMgMTMuNTY1MyA4LjI1MjY3IDE0LjAwMjcgOS41IDE0WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==")'
            },
            colors: {
                'primary': 'var(--wp--preset--color--primary)',
                'secondary': 'var(--wp--preset--color--secondary)',
                'grey': 'var(--wp--preset--color--grey)',
                'dark-grey': 'var(--wp--preset--color--darkgrey)'
            },
            gridTemplateColumns: {
                'timeline-mobile': '0 auto minmax(0, 1fr)',
                'timeline': 'minmax(0, 1fr) auto minmax(0, 1fr)'
            },
            gridTemplateRows: {
                'timeline': '0.5rem auto minmax(0, 1fr)'
            },
        },
        fontFamily: {
            sans: ['"Source Sans 3"', {
                fontFeatureSettings: '"cv11", "ss01"',
                fontVariationSettings: '"opsz" 32'
            }],
            'sans-italic': ["Source Sans 3 Italic"],
            serif: ['"Source Serif 4"', {
                fontFeatureSettings: '"cv11", "ss01"',
                fontVariationSettings: '"opsz" 32'
            }],
            'serif-italic': ["Source Serif 4 Italic"],
            mono: ['"Source Code Pro"', {
                fontFeatureSettings: '"cv11", "ss01"',
                fontVariationSettings: '"opsz" 32'
            }],
        },
        listStyleType: {
            square: 'square',
            roman: 'upper-roman',
            circle: 'circle',
            disc: 'disc',
            decimal: 'decimal',
            none: 'none',
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
