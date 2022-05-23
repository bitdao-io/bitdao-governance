const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brandblue: {
          DEFAULT: '#2D82B7',
          light: '#ECF8FF',
          dark: '#04639f',
        },
        brandpink: {
          DEFAULT: '#E84F7D',
          light: '#FFF6F8',
          dark: '#e71554',
        },
        brandgreen: {
          DEFAULT: '#adff00',
        },
        skyBlue: {
          DEFAULT: '#5CC7F2',

        }
      },
      fontFamily: {
        serif: [
          'SpaceGroteskRegular',
          ...defaultTheme.fontFamily.serif,
        ]
      },
      width:{
        '11rem':'11rem',
        '650px': '650px'
      },
      gradientColorStops:{
        'pageStart' : '#ECF8FF',
        'pageEnd' : '#FFF6F8'
      },
      backgroundColor:{
        'connectedButton' : '#000000',
        'unconnectedButton' : '#ADFF00',
      },
      minWidth:{
        '490px':'490px'
      },
      maxWidth:{
        '720px': '720px'
      },
      spacing:{
        '10%' : '10%'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor:['disabled']
    },
  },
  plugins: [],
}