"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: {
      white: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      black: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      white: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      black: string;
    };
  }
}

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#047F9C",
        },
        secondary: {
          main: "#014260",
        },
        success: {
          main: "#61CE70",
          bg: "#61CE70",
          text: "#001C00",
        },
        warning: {
          main: "#EC7304",
          bg: "#EC7304",
          text: "#FFFFFF",
        },
        error: {
          main: "#DB241C",
          bg: "#DB241C",
          text: "#FFFFFF",
        },
        accent: {
          main: "#61CE70",
        },
        neutral: {
          white: "#FFFFFF",
          100: "#F6F6F6",
          200: "#E5E5E5",
          300: "#CCCCCC",
          400: "#B3B3B3",
          500: "#999999",
          600: "#8F8F8F",
          700: "#707070",
          800: "#363636",
          900: "#191919",
          black: "#000000",
        },
      },
    },
    dark: false,
  },
  components: {},
});

export default theme;
