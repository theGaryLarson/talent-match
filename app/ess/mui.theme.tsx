"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }

  interface PaletteColor {
    bg?: string;
    bgtext?: string;
    text?: string;
  }

  interface SimplePaletteColorOptions {
    bg?: string;
    bgtext?: string;
    text?: string;
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
          light: "#C1F2C8",
          bg: "#61CE70",
          text: "#001C00",
        },
        warning: {
          main: "#EC7304",
          light: "#FFFFFF",
          bg: "#EC7304",
          text: "#FFFFFF",
        },
        error: {
          main: "#DB241C",
          bg: "#F8D3D2",
          bgtext: "#DB241C",
          text: "#FFFFFF",
        },
        accent: {
          main: "#C4EBF3",
        },
      },
    },
    /*dark: {
            palette: {
                primary: {
                    main: '#047F9C',
                },
                secondary: {
                    main: '#014260',
                },
                success: {
                    main: '#61CE70',
                    light: '#C1F2C8',
                    bg: '#004d40',
                    text: '#C1F2C8'
                },
                warning: {
                    main: '#EC7304',
                    light: '#FFFFFF',
                    bg: '#8B4513',
                    text: '#FFFFFF'
                },
                error: {
                    main: '#DB241C',
                    bg: '#DB241C',
                    bgtext: '#FFFFFF',
                    text: '#FFFFFF'
                },
                accent: {
                    main: '#047F9C',
                }
            }
        },*/
  },
});

export default theme;
