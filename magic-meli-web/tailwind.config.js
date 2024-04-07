/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode:'selector',
  theme: {
    extend: {
      colors: {
        themeViolet: '#4D23CF',
        themeFuchsia: '#f7e1fb',
        activeFuchsia: '#EAA0E8',
        themeCyan: '#90f4e4',
        windowFuchsia: '#fff8ff',
        darkViolet:'#6F2ADD',
        darkThemeFuchsia:'#FAE8FF',
        darkWindowFuchsia:'#E8D2E9'
      },
      backgroundImage: {
        synth: "url('/src/assets/graphs/Synth.png')",
        cho: "url('/src/assets/graphs/Yamikawa.png')"
      },
      screens: {
        '4k': '2560px'
      },
      scale: {
        200: 2
      },
      fontFamily: {
        Dinkie: ['Dinkie', 'sans-serif'],
        Yahei: ['Microsoft Yahei', '微软雅黑', 'sans-serif'],
        zpix: ['zpix', 'sans-serif'],
        Fusion: ['FusionPixel']
      }
    }
  },
  plugins: []
}
