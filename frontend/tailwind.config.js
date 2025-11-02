module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff7a00',
          light: '#ff9d3b',
          dark: '#cc6200',
        }
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(90deg, #ff7a00 0%, #ff9d3b 100%)'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}
