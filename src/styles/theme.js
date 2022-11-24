import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsla(248, 41%, 38%, 1)",
      contrastText: "hsla(59, 100%, 60%, 1)",
    },
    secondary: {
      main: "hsla(8, 100%, 56%, 1)",
      contrastText: "hsla(0, 0%, 100%, 1)",
    },
    tertiary: {
      main: "hsla(0, 0%, 53%, 1)",
    },
    quaternary: {
      main: "hsla(320, 100%, 83%, 1)",
      contrastText: "hsla(270, 2%, 26%, 1)",
    },
    quinary: {
      main: "hsla(211, 78%, 95%, 1)",
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 600,
      md: 768,
      lg: 1000,
      xl: 1366,
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,
    fontSize: [10, 11, 12, 13, 14, 16, 17, 18, 20, 24, 32, 44],
  },
  spacing: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128],
});

export default theme;
