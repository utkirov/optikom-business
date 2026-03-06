import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Orbitron', 'sans-serif'],
            },
            colors: {
                indigo: {
                    950: '#060813',
                    900: '#0a0d1f',
                    800: '#141a38',
                    700: '#2c368a',
                    600: '#4554e6',
                    500: '#5463ff',
                    400: '#7a86ff',
                    300: '#a3abff',
                    200: '#cbd0ff',
                    100: '#e3e6ff',
                    50: '#f2f3f7',
                },
                accent: {
                    600: '#2563eb',
                },
            },
            backgroundImage: {
                'vertical-rays': 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 101px)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scroll-left': 'scroll-left 30s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '.5' },
                },
                'scroll-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    }
}
