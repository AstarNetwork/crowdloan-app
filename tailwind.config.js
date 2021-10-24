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
        2: '#444a51',
        50: '#F8FAFC',
        100: '#DFE7EF',
        200: '#C6D3E1',
        300: '#AEC0D4',
        400: '#95ACC6',
        500: '#7C99B9',
        600: '#607894',
        700: '#435870',
        800: '#27374C',
        900: '#0A1627'
      },
      blue: {
        50: '#F5F8FB',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#80B8F1',
        400: '#4789CD',
        500: '#1B6DC1',
        600: '#1860AD',
        700: '#165398',
        800: '#144684',
        900: '#11396F'
      },
      darkGray: {
        50: '#F8F9FA',
        100: '#F1F4F6',
        200: '#E2E6EA',
        300: '#CFD5DB',
        400: '#98A3AF',
        500: '#687480',
        600: '#364453',
        700: '#323b4a',
        800: '#272E39',
        900: '#1E232B'
      },
      red: {
        50: '#FCF0F3',
        100: '#FCE3E8',
        200: '#FFCBD7',
        300: '#FAA6B9',
        400: '#F57894',
        500: '#EF466C',
        600: '#DE214C',
        700: '#BC163B',
        800: '#9C1937',
        900: '#871630'
      },
      green: {
        50: '#ECFCF8',
        100: '#CEFBF1',
        200: '#97F5E1',
        300: '#56ECCC',
        400: '#23D4AE',
        500: '#13B894',
        600: '#0A9678',
        700: '#067960',
        800: '#08604D',
        900: '#044D3D'
      },
      yellow: {
        50: '#FEFCE8',
        100: '#FEF9C3',
        200: '#FEF08A',
        300: '#FDE047',
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
        700: '#A16207',
        800: '#854D0E',
        900: '#713F12'
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
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      borderWidth: ['checked'],
    },
  },
  plugins: []
};
