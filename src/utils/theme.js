import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ee5a1b",
    },
    secondary: {
      main: "#000",
    },
    background: {
      paper: "#000",
      default: "#000",
    },
    divider: {
      main: "#07930c",
    },
    info: {
      main: "#ffb101",
    },
  },
});

export default theme;
