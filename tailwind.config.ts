import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        layer: '#ffffff1a',
        primary: {
          DEFAULT: '#2457fa',
          dark: '#1d47cf',
        },
        red: '#e74651be',
      },
    },
  },
};
export default config;
