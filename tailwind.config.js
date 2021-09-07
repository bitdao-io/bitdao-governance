module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens:{
      'iphone':'425px',
      'ipad':'770px'
    },
    extend: {
      width:{
        '11rem':'11rem',
        '650px': '650px'
      },
      gradientColorStops:{
        'pageStart' : '#ECF8FF',
        'pageEnd' : '#FFF6F8'
      },
      backgroundColor:{
        'connectedButton' : '#EEF6FF',
        'unconnectedButton' : '#57A2D1',
        'red' : '#E84F7D',
        'gray' : '#BCC5CF'
      },
      textColor:{
        'blue' : '#2D82B7',
        'lightBlue' : '#0E47EF',
        'gray' : '#919191',
        'black' : '#121212',
        'red' : '#E84F7D',
        'skyBlue' : '#5CC7F2'
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
