module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {},
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '991px',
      // => @media (min-width: 991px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      primary: '#1b6dc1',
      white: '#fff',
      dark: '#001f40',
      gray: {
        1: '#9cabba',
        2: '#444a51'
      },
      footer: {
        link: '#e0e0e0'
      },
      danger: '#e6007a',
      label: '#001f40',
      input: {
        border: {
          normal: '#b6c7d8',
          focus: '#b6c7d8'
        },
        disabled: '#e9eef7',
        bg: '#fff'
      }
    }
    // fontSize: {
    //   medium: "5.5rem",
    //   large: "6.75rem",
    // },
  },
  variants: {
    extend: {}
  },
  plugins: []
};
