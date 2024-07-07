/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import dracula from 'tailwind-dracula'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        themeViolet: '#4D23CF',
        themeFuchsia: '#f7e1fb',
        activeFuchsia: '#EAA0E8',
        themeCyan: '#90f4e4',
        windowFuchsia: '#fff8ff',
        darkViolet: '#6F2ADD',
        darkThemeFuchsia: '#FAE8FF',
        darkWindowFuchsia: '#E8D2E9'
      },
      backgroundImage: {
        synth: "url('/src/assets/graphs/Synth.webp')",
        dreamcore: "url('/src/assets/graphs/Dreamcore.webp')",
        login: "url('/src/assets/graphs/LoginBackground.png')"
      },
      screens: {
        '4k': '2560px'
      },
      scale: {
        200: 2
      },
      spacing: {
        112: '28rem',
        128: '32rem'
      },
      fontFamily: {
        Dinkie: ['Dinkie', 'sans-serif'],
        Yahei: ['Microsoft Yahei', '微软雅黑', 'sans-serif'],
        Fusion: ['FusionPixel', 'sans-serif']
      }
    }
  },
  plugins: [forms({ strategy: 'class' }), dracula]
}
