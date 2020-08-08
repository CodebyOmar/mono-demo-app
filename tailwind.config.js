// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    "./src/**/*.js",
    "./src/**/*.tsx",
    "./src/**/*.jsx", 
    "./src/**/*.ts"
  ],
  theme: {
    fontFamily: {
      display: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      headline: ['Alata', 'sans-serif']
    },
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '100': '28rem',
      },
      colors: {
        opaque: "rgba(0, 0, 0, 0.7)",
        "white-opaque": "rgba(255,255,255,0.2)",
        neutral: {
          "100": "#f6f6f6"
        }
      },
    },
  },
  variants:{
    borderWidth: ['last', 'first'],
    opacity: ['disabled'],
    hidden: ['last'],
    block: ['last'],
    cursor: ['disabled']
  },
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
