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
        './exported/**/*.txt',
        './assets/**/*.svg',
    ],
    corePlugins: {
        preflight: false,
    },
    theme: {
        container: {
            center: true,
        },
        extend: {
            backgroundImage: {
                'search': 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjYgMjFMMTMuMyAxNC43QzEyLjggMTUuMSAxMi4yMjUgMTUuNDE2NyAxMS41NzUgMTUuNjVDMTAuOTI1IDE1Ljg4MzMgMTAuMjMzMyAxNiA5LjUgMTZDNy42ODMzMyAxNiA2LjE0NiAxNS4zNzA3IDQuODg4IDE0LjExMkMzLjYzIDEyLjg1MzMgMy4wMDA2NyAxMS4zMTYgMyA5LjVDMi45OTkzMyA3LjY4NCAzLjYyODY3IDYuMTQ2NjcgNC44ODggNC44ODhDNi4xNDczMyAzLjYyOTMzIDcuNjg0NjcgMyA5LjUgM0MxMS4zMTUzIDMgMTIuODUzIDMuNjI5MzMgMTQuMTEzIDQuODg4QzE1LjM3MyA2LjE0NjY3IDE2LjAwMiA3LjY4NCAxNiA5LjVDMTYgMTAuMjMzMyAxNS44ODMzIDEwLjkyNSAxNS42NSAxMS41NzVDMTUuNDE2NyAxMi4yMjUgMTUuMSAxMi44IDE0LjcgMTMuM0wyMSAxOS42TDE5LjYgMjFaTTkuNSAxNEMxMC43NSAxNCAxMS44MTI3IDEzLjU2MjcgMTIuNjg4IDEyLjY4OEMxMy41NjMzIDExLjgxMzMgMTQuMDAwNyAxMC43NTA3IDE0IDkuNUMxMy45OTkzIDguMjQ5MzMgMTMuNTYyIDcuMTg3IDEyLjY4OCA2LjMxM0MxMS44MTQgNS40MzkgMTAuNzUxMyA1LjAwMTMzIDkuNSA1QzguMjQ4NjcgNC45OTg2NyA3LjE4NjMzIDUuNDM2MzMgNi4zMTMgNi4zMTNDNS40Mzk2NyA3LjE4OTY3IDUuMDAyIDguMjUyIDUgOS41QzQuOTk4IDEwLjc0OCA1LjQzNTY3IDExLjgxMDcgNi4zMTMgMTIuNjg4QzcuMTkwMzMgMTMuNTY1MyA4LjI1MjY3IDE0LjAwMjcgOS41IDE0WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==")',
                'grey-fade': 'linear-gradient(180deg, #B9B9B9 0%, #D9D9D9 49.5%, #D9D9D9 100%)',
                'orange-fade': 'linear-gradient(180deg, rgba(249, 157, 42, 0.50) 48.5%, rgba(102, 102, 102, 0.00) 100%)',
                'white-fade': 'linear-gradient(90deg, rgba(255, 255, 255, 0.70) 48.5%, rgba(255, 255, 255, 0.00) 100%)',
                'blueprint': 'linear-gradient(180deg, #030552 0%, #08338C 100%)',
            },
            colors: {
                'primary': 'var(--wp--preset--color--primary)',
                'carona': 'var(--wp--preset--color--primary)',
                'corona': 'var(--wp--preset--color--primary)',
                'hamtaro-brown': 'var(--wp--preset--secondary)',
                'torchlight': 'var(--wp--preset--color--torchlight)',
                'blanched-almond': 'var(--wp--preset--color--blanched-almond)',
                'tuscan': 'var(--wp--preset--color--tuscan)',
                'ash': 'var(--wp--preset--color--ash)',
                'copious-caramel': 'var(--wp--preset--color--copious-caramel)',
                'chocolate-castle': 'var(--wp--preset--color--chocolate-castle)',
                'peach-beach': 'var(--wp--preset--color--peach-beach)',
                'black-mana': 'var(--wp--preset--color--black-mana)',
                'vulcanised': 'var(--wp--preset--color--vulcanised)',
                'inkwell-inception': 'var(--wp--preset--color--inkwell-inception)'
            },
            dropShadow: {
                'text': '0.125rem 0.125rem 0.75rem rgba(0, 0, 0, 1)',
            },
            fontSize: {
                'clamp-nav': 'clamp(1rem, 0.9167rem + 0.1736vw, 1.125rem)',
                'clamp-hero': 'clamp(1.875rem, 0.625rem + 2.6042vw, 3.75rem)'
            },
            gridTemplateColumns: {
                'timeline-mobile': '0 auto minmax(0, 1fr)',
                'timeline': 'minmax(0, 1fr) auto minmax(0, 1fr)'
            },
            gridTemplateRows: {
                'timeline': '0.5rem auto minmax(0, 1fr)',
                'auto': 'auto'
            },
            padding: {
                'offset-sm': 'calc(calc(100% - 480px) / 2)',
                'offset-md': 'calc(calc(100% - 768px) / 2)',
                'offset-lg': 'calc(calc(100% - 1024px) / 2)',
                'offset-xl': 'calc(calc(100% - 1280px) / 2)',
                'offset-2xl': 'calc(calc(100% - 1536px) / 2)',
            },
            spacing: {
                'offset': 'calc(100%+1rem)'
            }
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
        lineHeight: {       
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '7': '1.75rem',
            '8': '2rem',
            '9': '2.25rem',
            '10': '2.5rem',
            '11': '2.75rem',
            '12': '3rem',
            'tight': '90%',
            'none': '100%',
            'snug': '110%',
            'normal': '120%',
            'relaxed': '140%',
            'loose': '160%'
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
