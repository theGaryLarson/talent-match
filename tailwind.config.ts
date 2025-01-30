import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: "430px",
      "sm-tablet": "600px",
      tablet: "904px",
      laptop: "1240px",
      desktop: "1440px",
    },
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        button: {
          primary: {
            idle: { bg: "#047F9C", text: "white" },
            hover: { bg: "#4FA5BA", text: "white" },
            focus: { bg: "#3699B0", text: "white" },
            active: { bg: "#006682", text: "white" },
            disabled: { bg: "#E5E5E5", text: "#1919199A" },
          },
          secondary: {
            idle: { bg: "#F6F6F6", text: "#014260" },
            hover: { bg: "#E1F5F9", text: "#014260" },
            focus: { bg: "#D6F1F7", text: "#014260" },
            active: { bg: "#C4EBF3", text: "#014260" },
            disabled: { bg: "#F6F6F6", text: "#8F8F8F" },
          },
        },
        blue: {
          100: "#E1F5F9",
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
          background: "#457996",
          border: "#4C809D",
          text: "#457996",
          textdark: "#014361",
          textdark2: "#014260",
          text2: "#047F9C",
          trans: "#457996BF",
          link: "#1e88e5",
        },
        primary: {
          25: "#F2FAFC",
          50: "#E6F5F9",
          100: "#CDEBF3",
          200: "#9BD8E7",
          300: "#69C5DB",
          400: "#37B2CF",
          500: "#059FC3",
          600: "#047F9C",
          700: "#035F75",
          800: "#023F4E",
          900: "#011F27",
        },
        gray: {
          800: "#363636",
          trans: "#18181875",
          background: "#F3F3F3",
          bg: "#F5F5F5",
          background3: "#F6F6F6",
          text: "#151B26",
        },
      },
      fontSize: {
        "fluid-lg": "clamp(30px, 8vw, 66px)",
        "fluid-xl": "clamp(48px, 10vw, 88px)",
      },
      lineHeight: {
        "fluid-lg": "clamp(45px, 12vw, 79.2px)",
        "fluid-lg-snug": "clamp(30px, 8vw, 66px)",
        "fluid-xl": "clamp(60px, 16vw, 123.2px)",
      },
      backgroundImage: {
        "services-hero":
          "url('/images/stock/people-using-digital-device-while-meeting 1.jpg')",
        "employer-hero-1":
          "url('/images/stock/AdobeStock_816883006_forweb 1.png')",
        "jobseeker-hero-1":
          "linear-gradient(to left,#01161b00, #01161b88), url('/images/stock/Above Fold.png')",
        "jobseeker-bottom-1":
          "url('/images/stock/59dfec5cf3bb750f6868c1291599a4ed.jpeg')",
        "blue-square": "url('/blue-bullet.png')",
        quote: "url('/images/stock/quote-bg-1.jpg')",
      },
      listStyleType: {
        square: "square",
      },
      listStyleImage: {
        "blue-square": "url('/blue-bullet.png')",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
    fontFamily: {
      roboto: ["Roboto"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
