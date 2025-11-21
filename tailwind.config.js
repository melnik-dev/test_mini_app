// tailwind.config.js
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    darkMode: 'selector', // Важно для ручного переключения класса .dark
    theme: {
        extend: {
            colors: {
                // Теперь просто пишем bg-primary, и оно само меняется в теме
                primary: 'var(--color-primary)',
                'primary-text': 'var(--color-primary-text)',

                background: {
                    DEFAULT: 'var(--bg-primary)',
                    secondary: 'var(--bg-secondary)',
                },
                text: {
                    DEFAULT: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                }
            }
        },
    },
    plugins: [],
}
