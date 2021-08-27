module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        '11rem':'11rem'
      },
      gradientColorStops:{
        'pageStart' : '#ECF8FF',
        'pageEnd' : '#FFF6F8'
      },
      backgroundColor:{
        'connectButton' : '#EEF6FF',
        'red' : '#D96183'
      },
      textColor:{
        'blue' : '#2D82B7',
        'lightBlue' : '#0E47EF',
        'gray' : '#919191',
        'black' : '#121212',
        'red' : '#D96183',
        'skyBlue' : '#5CC7F2'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
