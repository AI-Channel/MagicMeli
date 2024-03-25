/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '4k': '2560px'
      },
      scale: {
        200: 2
      },
      fontFamily: {
        Dinkie: ['Dinkie', 'sans-serif'],
        Yahei:['Microsoft Yahei','微软雅黑','sans-serif']
      }
    }
  },
  plugins: []
}
