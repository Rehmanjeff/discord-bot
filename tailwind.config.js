/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      width: {
        '40': '40%'
      },
      maxWidth:{
        '50': '50px'
      },
      colors: {
        'discord-dark': '#2c2f33',
        'discord-gray': '#36393f',
        'discord-gray-text': '#dddddd',
        'error': '#fc064c'
      },
      fontSize: {
        'xxs': '0.7rem',
      },
    },
  },
  plugins: [],
}

