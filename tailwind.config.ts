import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
          'background': '#457996',
          'border': '#4C809D',
          text: "#457996",
          textdark: "#014361",
          trans: "#457996BF"
          

        },
        gray:{
          trans: "#18181875",
          background: "#F3F3F3"
        }
      },
      backgroundImage: {
        'services-hero': "url('/cfa_images/stock/people-using-digital-device-while-meeting 1.png')",
        'employer-hero-1': "url('/cfa_images/stock/desola-lanre-ologun-IgUR1iX0mqM-unsplash 2.png')"
      },
      listStyleType: {
        square: 'square',
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
