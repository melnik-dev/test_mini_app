import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const Tgm = definePreset(Aura, {
    common: {
        fontFamily: {
            sans: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
            serif: "'Georgia', 'Times New Roman', serif",
            mono: "'Menlo', 'Monaco', 'Courier New', monospace",
        },
        borderRadius: {
            none: '0',
            xs: '0.25rem',
            sm: '0.375rem',
            md: '0.5rem',
            lg: '0.75rem',
            xl: '1rem',
        },
    },
    semantic: {
        primary: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#3390ec',
            600: '#2b7cd3',
            700: '#2368b9',
            800: '#1b549f',
            900: '#13407a',
            950: '#0d2f5c',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#3390ec',
                    contrastColor: '#ffffff',
                    hoverColor: '#2b7cd3',
                    activeColor: '#2368b9',
                },
                surface: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                },
                semantic: {
                    highlight: {
                        background: '#3390ec',
                        focusBackground: '#2b7cd3',
                        color: '#ffffff',
                        focusColor: '#ffffff',
                    },
                },
            },
            dark: {
                primary: {
                    color: '#64b5f6',
                    contrastColor: '#0d2f5c',
                    hoverColor: '#90caf9',
                    activeColor: '#bbdefb',
                },
                surface: {
                    0: '#0a0a0f',
                    50: '#16161f',
                    100: '#1e1e2e',
                    200: '#2a2a3a',
                    300: '#363647',
                    400: '#4a4a5e',
                    500: '#707089',
                    600: '#9090a8',
                    700: '#b0b0c3',
                    800: '#d0d0dd',
                    900: '#e8e8f0',
                    950: '#f5f5f8',
                },
                semantic: {
                    highlight: {
                        background: '#64b5f6',
                        focusBackground: '#90caf9',
                        color: '#0d2f5c',
                        focusColor: '#0d2f5c',
                    },
                },
            },
        },
    },
    components: {
        button: {
            borderRadius: '10px',
            paddingX: '1.25rem',
            paddingY: '0.75rem',
        },
        card: {
            borderRadius: '16px',
            shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        inputtext: {
            borderRadius: '10px',
            paddingX: '1rem',
            paddingY: '0.75rem',
        },
    },
})

export default Tgm
