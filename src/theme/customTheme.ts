import { createTheme, ThemeOptions, Transitions, TransitionsOptions } from "@mui/material";
import { green, purple } from "@mui/material/colors";

export const theme: ThemeOptions = createTheme({
  status: {
    primary: "#151254",
    secondary: "#C53DAE",
    danger: "#EE2829",
  },
  width: {
    large: 800, 
    medium: 300,
    small: 200
  },
  size:{
    padding: {
      primary: 21, 
      secondary: 11
    },
    fontSize: {
      primary: 20,
      secondary: 18
    },
    margin: {
      primary: 20, 
      secondary: 18
    }
  },
  color: {
    primary: "#151254",
    secondary: "#C53DAE",
    danger: "#EE2829",
    grey: "#B2B3AB",
    color1: '#061422'
  },
  typography: {
    button: {
      fontSize: '.8rem',
      textTransform: 'none'
    },
  },
  palette: {
    mode: 'light',  // change the theme type
    primary: {
      main: '#151254',
    },
    secondary: {
      main: '#C53DAE',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
});

declare module '@mui/material/styles' {
  interface ThemeOptions {
    status?: {
      primary: string;
      secondary: string;
      danger: string;
    };
    width?: {
      large: number;
      medium: number;
      small: number;
    },
    size?: {
      padding: {
        primary: number;
        secondary: number;
      },
      fontSize: {
        primary: number;
        secondary: number;
      },
      margin: {
        primary: number;
        secondary: number;
      }
    },
    color?: {
      primary: string;
      secondary: string,
      danger: string;
      grey: string;
      color1: string;
    },
    overrides?: any 
  }
}
