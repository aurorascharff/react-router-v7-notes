import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => {
            return {
              textShadow: value,
            };
          },
        },
        { values: theme('textShadow') },
      );
    }),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(circle, rgba(41, 124, 191, 1) 0%, rgba(29, 88, 135, 1) 35%, rgba(20, 61, 94, 1) 100%)',
      },
      colors: {
        blue: {
          DEFAULT: '#143d5e',
          dark: '#0c2539',
          light: '#297cbf',
        },
        layer: '#ffffff1a',
        red: '#e74651be',
        teal: {
          DEFAULT: '#2dd4bf',
          dark: '#14b8a6',
        },
      },
      fontFamily: {
        display: ['Baloo', 'sans-serif'],
      },
      textShadow: {
        DEFAULT: '0 2px 0 #000000, 0 2px 40px #000000',
      },
    },
  },
};
export default config;
