import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        error: '#ff4d4f',
        primary: {
          DEFAULT: '#2457fa',
          dark: '#1d47cf',
        },
      },
    },
  },
};
export default config;
