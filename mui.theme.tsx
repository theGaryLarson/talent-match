"use client";
import { createTheme } from "@mui/material/styles";

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
          main: "#8F8F8F",
          light: "#FFFFFF",
          dark: "#000000",
        },
      },
    },
    dark: false,
  },
  components: {},
});

export default theme;
