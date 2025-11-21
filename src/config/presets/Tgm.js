import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const Tgm = definePreset(Aura, {
    common: {
        fontFamily: {
            // Используем системные шрифты для максимальной нативности (San Francisco на iOS, Roboto на Android)
            sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        },
    },
    semantic: {
        primary: {
            // Так как мы используем CSS переменные, мы не можем генерировать палитру (50-950).
            // Мы мапим основной оттенок (500) на цвет кнопки Telegram.
            // Остальные оттенки можно оставить дефолтными или замапить на тот же цвет, если они мешают.
            50: 'var(--tg-theme-button-color, #3390ec)',
            100: 'var(--tg-theme-button-color, #3390ec)',
            200: 'var(--tg-theme-button-color, #3390ec)',
            300: 'var(--tg-theme-button-color, #3390ec)',
            400: 'var(--tg-theme-button-color, #3390ec)',
            500: 'var(--tg-theme-button-color, #3390ec)',
            600: 'var(--tg-theme-button-color, #3390ec)',
            700: 'var(--tg-theme-button-color, #3390ec)',
            800: 'var(--tg-theme-button-color, #3390ec)',
            900: 'var(--tg-theme-button-color, #3390ec)',
            950: 'var(--tg-theme-button-color, #3390ec)',
        },
        colorScheme: {
            light: {
                primary: {
                    // Основной цвет кнопок, чекбоксов и акцентов
                    color: 'var(--tg-theme-button-color, #3390ec)',
                    // Цвет текста на кнопках (обычно белый)
                    contrastColor: 'var(--tg-theme-button-text-color, #ffffff)',
                    // Telegram обычно не меняет цвет при наведении на тач-устройствах, оставляем тот же
                    hoverColor: 'var(--tg-theme-button-color, #3390ec)',
                    activeColor: 'var(--tg-theme-button-color, #3390ec)',
                },
                surface: {
                    // 0 - это основной фон контента (карточек, инпутов)
                    0: 'var(--tg-theme-bg-color, #ffffff)',
                    // 50-100 - вторичный фон (обычно фон самой страницы в iOS стиле)
                    50: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
                    100: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
                    // 200 - используется для границ (borders)
                    200: 'var(--tg-theme-hint-color, #dfe1e5)',
                    // Остальные оттенки серых можно оставить от Aura или тоже замапить
                    300: 'var(--tg-theme-hint-color, #dfe1e5)',
                    400: 'var(--tg-theme-hint-color, #999999)',
                    500: 'var(--tg-theme-hint-color, #999999)',
                    600: 'var(--tg-theme-hint-color, #999999)',
                    700: 'var(--tg-theme-text-color, #000000)',
                    800: 'var(--tg-theme-text-color, #000000)',
                    900: 'var(--tg-theme-text-color, #000000)',
                    950: 'var(--tg-theme-text-color, #000000)',
                },
                text: {
                    // Основной текст
                    color: 'var(--tg-theme-text-color, #000000)',
                    // Вторичный текст (плейсхолдеры, подписи)
                    mutedColor: 'var(--tg-theme-hint-color, #999999)',
                    // При наведении текст остается тем же
                    hoverColor: 'var(--tg-theme-text-color, #000000)',
                }
            },
            dark: {
                primary: {
                    color: 'var(--tg-theme-button-color, #3390ec)',
                    contrastColor: 'var(--tg-theme-button-text-color, #ffffff)',
                    hoverColor: 'var(--tg-theme-button-color, #3390ec)',
                    activeColor: 'var(--tg-theme-button-color, #3390ec)',
                },
                surface: {
                    // В темной теме TG, bg-color - это почти черный
                    0: 'var(--tg-theme-bg-color, #17212b)',
                    50: 'var(--tg-theme-secondary-bg-color, #232e3c)',
                    100: 'var(--tg-theme-secondary-bg-color, #232e3c)',
                    // Границы в темной теме должны быть едва заметны
                    200: 'rgba(255, 255, 255, 0.1)', // Hack: полупрозрачный белый для границ
                    300: 'rgba(255, 255, 255, 0.1)',
                    400: 'var(--tg-theme-hint-color, #6c7883)',
                    500: 'var(--tg-theme-hint-color, #6c7883)',
                    600: 'var(--tg-theme-hint-color, #6c7883)',
                    700: 'var(--tg-theme-text-color, #f5f5f5)',
                    800: 'var(--tg-theme-text-color, #f5f5f5)',
                    900: 'var(--tg-theme-text-color, #f5f5f5)',
                    950: 'var(--tg-theme-text-color, #f5f5f5)',
                },
                text: {
                    color: 'var(--tg-theme-text-color, #ffffff)',
                    mutedColor: 'var(--tg-theme-hint-color, #6c7883)',
                    hoverColor: 'var(--tg-theme-text-color, #ffffff)',
                }
            }
        }
    },
    components: {
        // Пример глобального переопределения для кнопок, если нужно убрать скругления
        // button: {
        //     borderRadius: '8px' // Или 'var(--tg-theme-button-radius)' если бы такое было
        // }
    }
});

export default Tgm;
