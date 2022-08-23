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
  },
  breakpoints: {
    values: {
      xs: 320,
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
});

export default theme;
