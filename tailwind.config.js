// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ["'Segoe UI'", "'Roboto'", "'Helvetica Neue'", 'Arial', 'sans-serif'],
            serif: ["'Georgia'", "'Times New Roman'", 'serif'],
            mono: ["'Menlo'", "'Monaco'", "'Courier New'", 'monospace'],
        },
        borderRadius: {
            none: '0',
            xs: '0.25rem',
            sm: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
            '2xl': '1.5rem',
            '3xl': '2rem',
            full: '9999px',
        },
        extend: {
            colors: {
                primary: {
                    50: '#e6f3ff',
                    100: '#cce6ff',
                    200: '#99ceff',
                    300: '#66b5ff',
                    400: '#339dff',
                    500: '#0088cc',  // Основной синий Telegram
                    600: '#0077b3',
                    700: '#006699',
                    800: '#005580',
                    900: '#004466',
                    950: '#00334d'
                },
                surface: {
                    0: '#ffffff',
                    50: '#f8f9fa',
                    100: '#f1f3f4',
                    200: '#e8eaed',
                    300: '#dadce0',
                    400: '#bdc1c6',
                    500: '#9aa0a6',
                    600: '#80868b',
                    700: '#5f6368',
                    800: '#3c4043',
                    900: '#202124',
                    950: '#171717'
                }
            },
            backgroundColor: {
                light: {
                    ground: '#ffffff',
                    section: '#f8f9fa',
                    card: '#ffffff',
                    overlay: '#ffffff',
                    hover: '#f1f3f4'
                },
                dark: {
                    ground: '#0f0f0f',
                    section: '#1a1a1a',
                    card: '#232324',
                    overlay: '#2d2d2d',
                    hover: '#2a2a2a'
                }
            },
            borderColor: {
                light: {
                    DEFAULT: '#e8eaed'
                },
                dark: {
                    DEFAULT: '#3c3c3c'
                }
            },
            textColor: {
                light: {
                    primary: '#0088cc',
                    contrast: '#ffffff'
                },
                dark: {
                    primary: '#339dff',
                    contrast: '#ffffff'
                }
            }
        },
    },
    plugins: [],
}
