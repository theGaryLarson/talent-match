import type { Config } from 'tailwindcss';
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
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
          text2: "#047F9C",
          trans: "#457996BF"
          

        },
        primary:{
          25:"#F2FAFC",
          50:"#E6F5F9",
          100:"#CDEBF3",
          200:"#9BD8E7",
          300:"#69C5DB",
          400:"#37B2CF",
          500:"#059FC3",
          600:"#047F9C",
          700:"#035F75",
          800:"#023F4E",
          900:"#011F27"
        },
        gray:{
          trans: "#18181875",
          background: "#F3F3F3",
          bg: "#F5F5F5"
        }
      },
      backgroundImage: {
        'services-hero': "url('/cfa_images/stock/people-using-digital-device-while-meeting 1.jpg')",
        'employer-hero-1': "url('/cfa_images/stock/AdobeStock_816883006_forweb 1.png')",
        'jobseeker-hero-1': "url('/cfa_images/stock/AdobeStock_224404447.png')",
        'blue-square': "url('/blue-bullet.png')",
        'quote': "url('/cfa_images/stock/quote-bg-1.jpg')"
      },
      listStyleType: {
        square: 'square'
      },
      listStyleImage:{
        'blue-square': "url('/blue-bullet.png')",
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    fontFamily: {
      'roboto': ['Roboto'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    flowbite.plugin(),
  ],
};
export default config;
