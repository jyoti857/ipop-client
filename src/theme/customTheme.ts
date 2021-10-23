import { createTheme, ThemeOptions } from "@mui/material";

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
  }
});

declare module '@mui/material/styles' {
  // interface Theme {
  //   status: {
  //     danger: string;
  //   };
  // }
  // allow configuration using `createTheme`
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
    }
  }
}